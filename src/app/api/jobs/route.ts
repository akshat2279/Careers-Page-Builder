import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/lib/models/Jobs";
import { PipelineStage } from "mongoose";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const jobType = searchParams.get("jobType") || "";
    const sortBy = searchParams.get("sortBy") || "true";

    await connectDB();

    const getAllJobs: PipelineStage[] = [
      {
        $sort: {
          posted_days_ago: sortBy === "true" ? 1 : -1,
        },
      },
      {
        $project: {
          title: 1,
          work_policy: 1,
          location: 1,
          department: 1,
          employment_type: 1,
          experience_level: 1,
          job_type: 1,
          salary_range: 1,
          job_slug: 1,
          posted_days_ago: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    if (search) {
      const searchRegex = new RegExp(search, "i");
      getAllJobs.push({
        $match: {
          $or: [
            { title: { $regex: searchRegex } },
            { department: { $regex: searchRegex } },
          ],
        },
      });
    }

    if (location && location !== "All Locations") {
      const locationRegex = new RegExp(location, "i");
      getAllJobs.push({
        $match: {
          location: { $regex: locationRegex },
        },
      });
    }

    if (jobType && jobType !== "All Job Types") {
      getAllJobs.push({
        $match: {
          job_type: jobType,
        },
      });
    }

    getAllJobs.push(
      {
        $skip: Number(limit) * Number(offset),
      },
      {
        $limit: Number(limit),
      }
    );

    const jobs = await Job.aggregate(getAllJobs);

    return NextResponse.json({
      success: true,
      data: jobs,
    });
  } catch (err: unknown) {
    const error = err as { message?: string };
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch jobs",
        message: error.message 
      },
      { status: 500 }
    );
  }
}
