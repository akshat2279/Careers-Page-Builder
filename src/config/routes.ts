import { getAuthToken as getSecureAuthToken } from "@/utils/auth";

export const ROUTES = {
  HOME: "/home",
  LOGIN: "/login",
  SIGNUP: "/signup",
} as const;

const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];

export function isPublicRoute(pathname: string): boolean {
  if (pathname.startsWith("/careers/")) {
    return true;
  }
  return PUBLIC_ROUTES.includes(pathname as typeof PUBLIC_ROUTES[number]);
}

export function getAuthToken(): string | null {
  return getSecureAuthToken();
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
