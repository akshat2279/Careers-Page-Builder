import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import Company from "@/lib/models/Company";

export async function POST(req: Request) {
  try {
    const { companyName, email, password } = await req.json();

    if (!companyName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const slug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existingCompany = await Company.findOne({ slug });
    if (existingCompany) {
      return NextResponse.json(
        { error: "Company with this name already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await Company.create({
      name: companyName,
      slug: slug,
    });

    await User.create({
      email,
      password: hashedPassword,
      companyId: company._id,
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
