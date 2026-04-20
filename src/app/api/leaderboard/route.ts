import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import EventRegistrationModel from "@/models/eventRegistrationModel";
import UserModel from "@/models/userModel";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    // Fetch all registrations that have winner positions
    const winnerRegistrations = await EventRegistrationModel.find({
      position: { $exists: true, $ne: null },
    }).sort({ eventName: 1, position: 1 });

    // Group by event
    const eventMap = new Map<string, any[]>();

    for (const reg of winnerRegistrations) {
      if (!eventMap.has(reg.eventName)) {
        eventMap.set(reg.eventName, []);
      }

      // Fetch member details
      const memberDetails = await UserModel.find(
        { userID: { $in: reg.members } },
        { fullName: 1, userID: 1, collegeName: 1, _id: 0 }
      );

      eventMap.get(reg.eventName)!.push({
        teamName: reg.teamName,
        position: reg.position,
        members: memberDetails,
      });
    }

    // Convert to array format
    const events = Array.from(eventMap.entries()).map(([eventName, winners]) => ({
      eventName,
      winners: winners.sort((a, b) => a.position - b.position),
    }));

    return NextResponse.json({ success: true, events });
  } catch (error: any) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
