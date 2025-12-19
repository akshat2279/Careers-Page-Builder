import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { generateToken } from "@/lib/jwt";
import { ERROR_MESSAGES } from "@/constants/messages";

/**
 * Authenticates user and returns JWT token
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_CREDENTIALS },
        { status: 400 }
      );
    }

    await connectDB();

    // Normalize email to lowercase for case-insensitive comparison
    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_CREDENTIALS },
        { status: 401 }
      );
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_CREDENTIALS },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      companyId: user.companyId.toString(),
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: user.email,
        companyId: user.companyId,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG },
      { status: 500 }
    );
  }
}
