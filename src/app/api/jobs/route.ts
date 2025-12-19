import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/lib/models/Jobs";
import { PipelineStage } from "mongoose";
import { escapeRegex, validateInputLength } from "@/lib/regexUtils";

/**
 * Retrieves paginated job listings with filters
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const jobType = searchParams.get("jobType") || "";
    const sortBy = searchParams.get("sortBy") || "true";

    // Validate input lengths to prevent ReDoS attacks
    if (!validateInputLength(search, 100) || !validateInputLength(location, 100)) {
      return NextResponse.json(
        { 
          success: false,
          error: "Search query too long"
        },
        { status: 400 }
      );
    }

    await connectDB();

    const getAllJobs: PipelineStage[] = [];

    // Apply $match filters BEFORE $sort for better performance
    const matchConditions: Record<string, unknown>[] = [];

    if (search) {
      // Escape special regex characters to prevent ReDoS attacks
      const escapedSearch = escapeRegex(search.trim());
      matchConditions.push({
        $or: [
          { title: { $regex: escapedSearch, $options: "i" } },
          { department: { $regex: escapedSearch, $options: "i" } },
        ],
      });
    }

    if (location && location !== "All Locations") {
      // Escape special regex characters
      const escapedLocation = escapeRegex(location.trim());
      matchConditions.push({
        location: { $regex: escapedLocation, $options: "i" },
      });
    }

    if (jobType && jobType !== "All Job Types") {
      matchConditions.push({
        job_type: jobType,
      });
    }

    // Add $match stage if there are any conditions
    if (matchConditions.length > 0) {
      getAllJobs.push({
        $match: matchConditions.length === 1 
          ? matchConditions[0] 
          : { $and: matchConditions },
      });
    }

    // Sort AFTER filtering to reduce documents processed
    getAllJobs.push({
      $sort: {
        posted_days_ago: sortBy === "true" ? 1 : -1,
      },
    });

    // Project only needed fields
    getAllJobs.push({
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
    });

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
    console.error("Jobs fetch error:", error);
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
