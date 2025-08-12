// middleware.js
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public (unprotected) routes only
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const { pathname } = req.nextUrl;

  // Public routes: let them through
  if (isPublicRoute(req)) {
    // If already signed-in, keep users out of auth pages
    if (userId && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return; // allow
  }

  // Everything else requires auth
  auth().protect();
});

export const config = {
  matcher: [
    // Run on all app routes, skip static files and _next
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Also run on API routes
    "/(api|trpc)(.*)",
  ],
};
