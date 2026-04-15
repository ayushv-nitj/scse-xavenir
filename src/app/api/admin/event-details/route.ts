import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import EventRegistration from "@/models/eventRegistrationModel";
import PendingEventRegistrations from "@/models/pendingEventPaymentModel";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventName = searchParams.get("eventName");

    if (!eventName) {
      return NextResponse.json({ error: "Event name is required" }, { status: 400 });
    }

    await connectDB();

    // Get confirmed registrations
    const confirmedRegs = await EventRegistration.find({ eventName }).lean();
    
    // Get pending registrations
    const pendingRegs = await PendingEventRegistrations.find({ 
      eventName,
      status: { $in: ["pending", "verified"] }
    }).lean();

    // Create a map to track unique teams and avoid duplicates
    const teamMap = new Map();
    
    // First, add confirmed registrations (these take priority)
    confirmedRegs.forEach(reg => {
      const teamKey = `${reg.teamName}-${reg.members.sort().join(',')}`;
      teamMap.set(teamKey, { ...reg, registrationStatus: "confirmed" });
    });
    
    // Then add pending registrations only if they don't already exist as confirmed
    pendingRegs.forEach(reg => {
      const teamKey = `${reg.teamName}-${reg.members.sort().join(',')}`;
      if (!teamMap.has(teamKey)) {
        teamMap.set(teamKey, { ...reg, registrationStatus: reg.status || "pending" });
      }
    });
    
    // Convert map back to array
    const allRegistrations = Array.from(teamMap.values());

    // Remove duplicates based on team name and members
    // Priority: confirmed > verified > pending
    const uniqueRegistrations = new Map();
    
    allRegistrations.forEach(reg => {
      const key = `${reg.teamName}-${reg.members.sort().join(',')}`;
      const existing = uniqueRegistrations.get(key);
      
      if (!existing) {
        uniqueRegistrations.set(key, reg);
      } else {
        // Keep the registration with higher priority
        const priority = { confirmed: 3, verified: 2, pending: 1 };
        const currentPriority = priority[reg.registrationStatus as keyof typeof priority] || 0;
        const existingPriority = priority[existing.registrationStatus as keyof typeof priority] || 0;
        
        if (currentPriority > existingPriority) {
          uniqueRegistrations.set(key, reg);
        }
      }
    });

    const deduplicatedRegistrations = Array.from(uniqueRegistrations.values());

    // Get all unique member IDs
    const allMemberIds = [...new Set(allRegistrations.flatMap(reg => reg.members))];

    // Fetch user details for all members
    const users = await User.find({ userID: { $in: allMemberIds } })
      .select("userID fullName email collegeName isPrime isNitian isFromCse phone gender")
      .lean();

    // Create a map for quick user lookup
    const userMap = new Map(users.map(user => [user.userID, user]));

    // Process registrations with user details
    const detailedRegistrations = allRegistrations.map(reg => {
      const membersWithDetails = reg.members.map((memberId: string) => {
        const user = userMap.get(memberId);
        if (!user) {
          return {
            userID: memberId,
            fullName: "User Not Found",
            email: "N/A",
            collegeName: "N/A",
            isPrime: false,
            isNitian: false,
            isFromCse: false,
            registrationNumber: "N/A"
          };
        }

        // Generate registration number based on user ID pattern
        const registrationNumber = user.userID.replace("XAV-", "");
        
        return {
          userID: user.userID,
          fullName: user.fullName,
          email: user.email,
          collegeName: user.collegeName,
          isPrime: user.isPrime,
          isNitian: user.isNitian,
          isFromCse: user.isFromCse,
          phone: user.phone || "N/A",
          gender: user.gender || "N/A",
          registrationNumber
        };
      });

      return {
        _id: reg._id,
        eventName: reg.eventName,
        teamName: reg.teamName,
        registrationStatus: reg.registrationStatus,
        createdAt: (reg as any).createdAt || new Date(),
        members: membersWithDetails,
        memberCount: membersWithDetails.length,
        primeMembers: membersWithDetails.filter((m: any) => m.isPrime).length,
        nitianMembers: membersWithDetails.filter((m: any) => m.isNitian).length,
        cseMembers: membersWithDetails.filter((m: any) => m.isFromCse).length
      };
    });

    // Calculate summary statistics
    const summary = {
      totalTeams: detailedRegistrations.length,
      totalParticipants: detailedRegistrations.reduce((sum, reg) => sum + reg.memberCount, 0),
      confirmedTeams: detailedRegistrations.filter(reg => reg.registrationStatus === "confirmed").length,
      pendingTeams: detailedRegistrations.filter(reg => reg.registrationStatus === "pending").length,
      verifiedTeams: detailedRegistrations.filter(reg => reg.registrationStatus === "verified").length,
      totalPrimeMembers: detailedRegistrations.reduce((sum, reg) => sum + reg.primeMembers, 0),
      totalNitianMembers: detailedRegistrations.reduce((sum, reg) => sum + reg.nitianMembers, 0),
      totalCseMembers: detailedRegistrations.reduce((sum, reg) => sum + reg.cseMembers, 0)
    };

    return NextResponse.json({
      success: true,
      eventName,
      summary,
      registrations: detailedRegistrations
    });

  } catch (error) {
    console.error("Error fetching event details:", error);
    return NextResponse.json(
      { error: "Failed to fetch event details" },
      { status: 500 }
    );
  }
}