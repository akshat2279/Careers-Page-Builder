"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES, isPublicRoute, isAuthenticated } from "@/config/routes";

interface RouteGuardProps {
  children: React.ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublic = isPublicRoute(pathname);
  const loggedIn = isAuthenticated();
  const isCareersPage = pathname.startsWith("/careers/");

  useEffect(() => {
    // Careers pages are accessible to everyone
    if (isCareersPage) {
      return;
    }

    // Redirect logged-in users from login/signup to home
    if (isPublic && loggedIn) {
      router.push(ROUTES.HOME);
    } else if (!isPublic && !loggedIn) {
      router.push(ROUTES.LOGIN);
    }
  }, [pathname, router, isPublic, loggedIn, isCareersPage]);

  // Allow careers pages for everyone
  if (isCareersPage) {
    return <>{children}</>;
  }

  if ((isPublic && loggedIn) || (!isPublic && !loggedIn)) {
    return null;
  }

  return <>{children}</>;
}
