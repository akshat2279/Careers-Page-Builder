import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

interface JWTPayload {
  userId: string;
  email: string;
  companyId: string;
}

/**
 * Generates a JWT token with user payload
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verifies and decodes a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    return decoded as JWTPayload;
  } catch {
    return null;
  }
}
