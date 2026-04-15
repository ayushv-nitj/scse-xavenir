import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Existing from "@/models/existingModel";

export async function POST() {
  try {
    await connectDB();

    const regNumbers = [
"2023rscs042", //
"2025rscs019",
"2025rscs024",
"2022rscs005", //
"2025pgcsds12",
"2025rscs033",
"2025rscs010",
"2025rscs015",
"2025rscs021",
"2025pgcsds01",
"2025pgcsds08",
"2025pgcsds13",
"2025pgcsca053",
"2025pgcsca105",
"2025pgcsds15",
"2025pgcsds06",
"2025pgcsds03",
"2025pgcsds02",
"2025pgcsds04",
"2025rscs008",
"2025pgcsds10",
"2025pgcsds17",
"2025pgcsds07",
"2025pgcsds05",
"2024rscs008", //
"2025pgcsca006",
"2025rscs035",
"2025pgcsds019",
"2025pgcsca074",
"2025pgcsca046",
"2025pgcsds20",
"2025rscs006"
]
  

    // remove duplicates
    const unique = [...new Set(regNumbers)];
    const docs = unique.map((r) => ({ regNumber: r }));
    const result = await Existing.insertMany(docs, {
      ordered: false // skip duplicates
    });

    return NextResponse.json({
      message: "Seeding completed",
      inserted: result.length
    });

  } catch (err: any) {
    console.log("Error");
    return NextResponse.json(
      { message: "Error", error: err.message },
      { status: 500 }
    );
  }
}