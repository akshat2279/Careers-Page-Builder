/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Company from "@/lib/models/Company";
import { authenticateRequest } from "@/lib/authMiddleware";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";

/**
 * Updates company settings (requires authentication)
 */
export async function POST(req: Request) {
  try {
    const auth = authenticateRequest(req);
    if (!auth.success) {
      return auth.error;
    }

    const {
      name,
      tagline,
      logoUrl,
      bannerUrl,
      primaryColor,
      secondaryColor,
      cultureVideoUrl,
      contentSections,
      benefitCards,
    } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.COMPANY_NAME_REQUIRED },
        { status: 400 }
      );
    }

    await connectDB();

    const sectionsWithOrder = contentSections?.map((section: any, index: number) => ({
      title: section.title,
      content: section.content,
      imageUrl: section.imageUrl,
      order: index,
    })) || [];

    const benefitCardsData = benefitCards?.map((card: any) => ({
      title: card.title,
      description: card.description,
    })) || [];

    const company = await Company.findByIdAndUpdate(
      auth.companyId,
      {
        name,
        tagline,
        logoUrl,
        bannerUrl,
        primaryColor,
        secondaryColor,
        cultureVideoUrl,
        contentSections: sectionsWithOrder,
        benefitCards: benefitCardsData,
      },
      { new: true, runValidators: true }
    );

    if (!company) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.COMPANY_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: SUCCESS_MESSAGES.SETTINGS_UPDATED,
      data: company,
    });
  } catch (err) {
    console.error("Company settings update error:", err);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG },
      { status: 500 }
    );
  }
}

/**
 * Retrieves company settings (requires authentication)
 */
export async function GET(req: Request) {
  try {
    const auth = authenticateRequest(req);
    if (!auth.success) {
      return auth.error;
    }

    await connectDB();

    const company = await Company.findById(auth.companyId);

    if (!company) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.COMPANY_NOT_FOUND },
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
      { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG },
      { status: 500 }
    );
  }
}
