// app/api/admin/batch-stats/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getBatchStrength } from "@/lib/batchStrength";
import Existing from "@/models/existingModel";
import { connectDB } from "@/dbConfig/dbConfig";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const batch = searchParams.get("batch")?.toLowerCase().trim();
    const paid  = searchParams.get("paid"); // "paid" | "unpaid"

    if (!batch || !paid) {
      return NextResponse.json({ error: "Missing batch or paid param" }, { status: 400 });
    }
    if (paid !== "paid" && paid !== "unpaid") {
      return NextResponse.json({ error: "paid must be 'paid' or 'unpaid'" }, { status: 400 });
    }

    const isRS = batch.includes("rs");

    // ── RS BATCH ────────────────────────────────────────────────────────────
    if (isRS) {
      if (paid === "paid") {
        // Return all docs whose regNumber contains "rs"
        const docs = await Existing.find({
          regNumber: { $regex: "rs", $options: "i" }
        }).lean();

        return NextResponse.json({
          batch,
          paid,
          count: docs.length,
          regNumbers: docs.map((d: any) => d.regNumber),
        });
      } else {
        // unpaid: batch strength is 0 for RS — no data
        return NextResponse.json({
          batch,
          paid,
          batchStrength: 0,
          count: 0,
          regNumbers: [],
        });
      }
    }

    // ── NORMAL BATCH ─────────────────────────────────────────────────────────
    if (paid === "paid") {
      // All existing docs whose regNumber includes this batch string
      const docs = await Existing.find({
        regNumber: { $regex: batch, $options: "i" }
      }).lean();

      return NextResponse.json({
        batch,
        paid,
        count: docs.length,
        regNumbers: docs.map((d: any) => d.regNumber),
      });

    } else {
      // unpaid:
      // 1. Get total strength for this batch
      const strength = getBatchStrength(batch);

      if (strength === 0) {
        return NextResponse.json({
          batch,
          paid,
          batchStrength: 0,
          count: 0,
          regNumbers: [],
        });
      }

      // 2. Generate all registration numbers: {batch}001, {batch}002, ... {batch}{strength}
      const allGenerated: string[] = [];
      for (let i = 1; i <= strength; i++) {
        const padded = String(i).padStart(3, "0"); // e.g. 039
        allGenerated.push(`${batch}${padded}`);
      }

      // 3. Find all existing regNumbers that contain this batch
      const existingDocs = await Existing.find({
        regNumber: { $regex: batch, $options: "i" }
      }).lean();

      const existingSet = new Set(
        existingDocs.map((d: any) => d.regNumber.toLowerCase())
      );

      // 4. Subtract: unpaid = generated - existing
      const unpaidRegNumbers = allGenerated.filter(
        r => !existingSet.has(r.toLowerCase())
      );

      return NextResponse.json({
        batch,
        paid,
        batchStrength: strength,
        paidCount: existingSet.size,
        unpaidCount: unpaidRegNumbers.length,
        count: unpaidRegNumbers.length,
        regNumbers: unpaidRegNumbers,
      });
    }

  } catch (err: any) {
    console.error("[batch-stats]", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}