import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("session_token")?.value;
  const role = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  // 1. Protect Dashboard Routes
  if (
    !token &&
    (pathname.startsWith("/admin") ||
      pathname.startsWith("/doctor") ||
      pathname.startsWith("/receptionist"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Redirect logged-in users away from Login
  if (token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL(`/${role}`, request.url));
  }

  // 3. Role-Based Access Control
  if (token && role) {
    if (pathname.startsWith("/admin") && role !== "admin")
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    if (pathname.startsWith("/doctor") && role !== "doctor")
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    if (pathname.startsWith("/receptionist") && role !== "receptionist")
      return NextResponse.redirect(new URL(`/${role}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
