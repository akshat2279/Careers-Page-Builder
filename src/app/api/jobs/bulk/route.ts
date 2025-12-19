import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/lib/models/Jobs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const jobs = body.jobs || body;


    await connectDB();

    // Use insertMany for bulk insert
    const insertedJobs = await Job.insertMany(jobs, { 
      ordered: false // Continue inserting even if some fail
    });

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${insertedJobs.length} jobs`,
      data: {
        insertedCount: insertedJobs.length,
        jobs: insertedJobs
      }
    });

  } catch (err: unknown) {
    const error = err as { code?: number; name?: string; message?: string };
    console.error("Bulk job insert error:", error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          error: "Duplicate job_slug found. Each job must have a unique slug.",
          details: error.message 
        },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { 
          error: "Validation failed",
          details: error.message 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
