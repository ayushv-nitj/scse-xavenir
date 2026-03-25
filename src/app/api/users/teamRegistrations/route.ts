import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Team from "@/models/teamModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userID } = await req.json();

    const data = await Team.find({ "members.userID": userID });

    return NextResponse.json(
      { message: "Here are the teams", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Error while getting the list of teams" },
      { status: 500 }
    );
  }
}