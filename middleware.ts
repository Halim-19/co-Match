// proxy.ts
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

// Protect these routes
const PROTECTED_PATHS = [
  "/dashboard",
  "/profile",
  "/matches",
  "/settings",
];

// Public routes that should redirect to dashboard if user is logged in
const PUBLIC_PATHS = ["/login", "/signup", "/register"];

export default async function proxy(req: NextRequest) {
  const { nextUrl } = req;

  // Create supabase middleware client
  const { supabase, response } = createClient(req);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isProtected = PROTECTED_PATHS.some((path) =>
      nextUrl.pathname.startsWith(path)
    );

    const isPublic = PUBLIC_PATHS.some((path) =>
      nextUrl.pathname.startsWith(path)
    );

    // If route is protected and user is not logged in → redirect to login
    if (isProtected && !user) {
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("redirectedFrom", nextUrl.pathname);
      return Response.redirect(redirectUrl);
    }

    // If user is logged in and tries to access public routes → redirect to dashboard
    if (user && isPublic) {
      return Response.redirect(new URL("/dashboard", req.url));
    }

    // Continue normally
    return response;
  } catch (e) {
    console.error("Auth error:", e);
    // For protected routes, redirect to login on error
    if (PROTECTED_PATHS.some(path => nextUrl.pathname.startsWith(path))) {
      return Response.redirect(new URL("/login", req.url));
    }
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};