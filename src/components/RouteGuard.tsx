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

  useEffect(() => {
    if (isPublic && loggedIn) {
      router.push(ROUTES.HOME);
    } else if (!isPublic && !loggedIn) {
      router.push(ROUTES.LOGIN);
    }
  }, [pathname, router, isPublic, loggedIn]);

  if ((isPublic && loggedIn) || (!isPublic && !loggedIn)) {
    return null;
  }

  return <>{children}</>;
}
