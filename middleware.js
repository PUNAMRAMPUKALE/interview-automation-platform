// middleware.js
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/cover-letter(.*)",
  "/onboarding(.*)",
]);
export default clerkMiddleware((auth, req) => {
  const { userId, redirectToSignIn } = auth();

  // If the route is public:
  if (isPublicRoute(req)) {
    // Already signed in? Keep them out of auth pages.
    const p = req.nextUrl.pathname;
    if (
      userId &&
      (p.startsWith("/sign-in") || p.startsWith("/sign-up"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Protected route: require auth
  if (!userId) {
    // Send user to sign-in and then back to where they were going
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  return NextResponse.next();
});

// Don’t run middleware on Next internals or static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};