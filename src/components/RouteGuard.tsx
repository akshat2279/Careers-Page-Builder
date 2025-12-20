"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES, isPublicRoute, isAuthenticated } from "@/config/routes";
import { getAuthToken, removeAuthToken } from "@/utils/auth";
import { isTokenExpired } from "@/utils/jwtClient";

interface RouteGuardProps {
  children: React.ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublic = isPublicRoute(pathname);
  const isCareersPage = pathname.startsWith("/careers/");

  useEffect(() => {
    // Careers pages are accessible to everyone
    if (isCareersPage) {
      return;
    }

    // Check if token exists and is valid
    const token = getAuthToken();
    const loggedIn = isAuthenticated();
    
    // If token exists, check if it's expired
    if (token && isTokenExpired(token)) {
      removeAuthToken();
      router.push(ROUTES.LOGIN);
      return;
    }

    // Redirect logged-in users from login/signup to home
    if (isPublic && loggedIn) {
      router.push(ROUTES.HOME);
    } else if (!isPublic && !loggedIn) {
      router.push(ROUTES.LOGIN);
    }
  }, [pathname, router, isPublic, isCareersPage]);

  // Allow careers pages for everyone
  if (isCareersPage) {
    return <>{children}</>;
  }

  // Check token expiration before rendering
  const token = getAuthToken();
  if (token && isTokenExpired(token)) {
    return null;
  }

  const loggedIn = isAuthenticated();
  if ((isPublic && loggedIn) || (!isPublic && !loggedIn)) {
    return null;
  }

  return <>{children}</>;
}
