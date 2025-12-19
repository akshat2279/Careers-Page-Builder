import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Company from "@/lib/models/Company";
import { verifyToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const {
      name,
      logoUrl,
      bannerUrl,
      primaryColor,
      secondaryColor,
      cultureVideoUrl,
      contentSections,
    } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const sectionsWithOrder = contentSections?.map((section: any, index: number) => ({
      title: section.title,
      content: section.content,
      order: index,
    })) || [];

    const company = await Company.findByIdAndUpdate(
      decoded.companyId,
      {
        name,
        logoUrl,
        bannerUrl,
        primaryColor,
        secondaryColor,
        cultureVideoUrl,
        contentSections: sectionsWithOrder,
      },
      { new: true, runValidators: true }
    );

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Company settings updated successfully",
      data: company,
    });
  } catch (err) {
    console.error("Company settings update error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    await connectDB();

    const company = await Company.findById(decoded.companyId);

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: company,
    });
  } catch (err) {
    console.error("Company settings fetch error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
