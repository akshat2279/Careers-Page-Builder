import { NextResponse } from "next/server";
import { verifyToken } from "./jwt";
import { ERROR_MESSAGES } from "@/constants/messages";

export interface AuthResult {
  success: boolean;
  userId?: string;
  companyId?: string;
  error?: NextResponse;
}

/**
 * Authenticates request by verifying JWT token from Authorization header
 */
export function authenticateRequest(req: Request): AuthResult {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return {
      success: false,
      error: NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 401 }
      ),
    };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      success: false,
      error: NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_TOKEN },
        { status: 401 }
      ),
    };
  }

  return {
    success: true,
    userId: decoded.userId,
    companyId: decoded.companyId,
  };
}
