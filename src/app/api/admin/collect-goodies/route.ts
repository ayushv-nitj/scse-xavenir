import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { requireAdmin } from "@/lib/requireAdmin";
import User from "@/models/userModel";

// GET: look up user without modifying anything
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth.error) return auth.error;

  try {
    await connectDB();
    const userID = req.nextUrl.searchParams.get("userID");
    if (!userID) return NextResponse.json({ error: "userID is required" }, { status: 400 });

    const user = await User.findOne({ userID }).select("userID fullName email paidForTshirt isCollectedTshirt").lean();
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ data: user }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: mark goodies as collected (isCollectedTshirt = true)
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth.error) return auth.error;

  try {
    await connectDB();
    const { userID } = await req.json();
    if (!userID) return NextResponse.json({ error: "userID is required" }, { status: 400 });

    const user = await User.findOne({userID});
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if(user.paidForTshirt == "unpaid"){
      return NextResponse.json({ error: "User not paid for Tshirt" }, { status: 400 });
    }
    else if(user.paidForTshirt == "paid"){
      return NextResponse.json({ error: "User payment status for Tshirt is not verified" }, { status: 400 });
    }
    else if(user.paidForTshirt == "rejected"){
      return NextResponse.json({error: "Admin has rejected the payment for Tshirt"}, {status:400});
    }
    user.isCollectedTshirt = true;
    await user.save();
    const data = { 
      userID: user.userID, 
      fullName: user.fullName, 
      email: user.email, 
      paidForTshirt: user.paidForTshirt, 
      isCollectedTshirt: user.isCollectedTshirt, 
    }; 
    return NextResponse.json({ message: "Goodies marked as collected", data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
