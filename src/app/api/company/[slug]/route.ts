import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Company from "@/lib/models/Company";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    
    const { slug } = await params;
    const company = await Company.findOne({ slug });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      name: company.name,
      logoUrl: company.logoUrl,
      bannerUrl: company.bannerUrl,
      primaryColor: company.primaryColor,
      cultureVideoUrl: company.cultureVideoUrl,
      contentSections: company.contentSections,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: "Failed to fetch company data" },
      { status: 500 }
    );
  }
}
