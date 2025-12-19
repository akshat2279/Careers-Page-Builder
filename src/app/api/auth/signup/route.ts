import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import Company from "@/lib/models/Company";
import { generateSlug } from "@/lib/helpers";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";

/**
 * Creates new user account and company
 */
export async function POST(req: Request) {
  try {
    const { companyName, email, password } = await req.json();

    // Validate required fields
    if (!companyName || !email || !password) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS },
        { status: 400 }
      );
    }

    await connectDB();

    // Normalize email to lowercase for case-insensitive comparison
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_ALREADY_EXISTS },
        { status: 409 }
      );
    }

    // Normalize company name
    const normalizedCompanyName = companyName.trim();

    // Check if company name already exists (case-insensitive using collation)
    const existingCompanyByName = await Company.findOne({ 
      name: normalizedCompanyName
    }).collation({ locale: 'en', strength: 2 });
    if (existingCompanyByName) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.COMPANY_ALREADY_EXISTS },
        { status: 409 }
      );
    }

    // Generate URL-friendly slug from company name
    const slug = generateSlug(normalizedCompanyName);

    // Check if company slug already exists
    const existingCompanyBySlug = await Company.findOne({ slug });
    if (existingCompanyBySlug) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.COMPANY_ALREADY_EXISTS },
        { status: 409 }
      );
    }

    // Hash password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create company record
    const company = await Company.create({
      name: normalizedCompanyName,
      slug: slug,
    });

    // Create user record linked to company
    await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      companyId: company._id,
    });

    return NextResponse.json({
      success: true,
      message: SUCCESS_MESSAGES.SIGNUP_SUCCESS,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG },
      { status: 500 }
    );
  }
}
