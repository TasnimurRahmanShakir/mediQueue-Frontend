import { NextResponse } from "next/server";

export async function middleware(request) {
  const accessToken = request.cookies.get("session_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const currentPath = request.nextUrl.pathname;

  let response = NextResponse.next();
  let finalAccessToken = accessToken;

  // ----------------------------------------------------------------
  // 1. REFRESH LOGIC
  // ----------------------------------------------------------------
  if (!accessToken && refreshToken) {
    try {
      // FIX 1: Use HTTP (not HTTPS) to bypass "Self-Signed Cert" error in Edge
      // CHECK YOUR LAUNCHSETTINGS.JSON FOR THE CORRECT HTTP PORT (e.g., 5258)
      const refreshRes = await fetch("http://localhost:7232/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        const newAccessToken = data.token;
        const newRefreshToken = data.refreshToken; // If your API rotates it

        finalAccessToken = newAccessToken;

        // Reset cookies on response
        response.cookies.set("session_token", newAccessToken, {
          httpOnly: true,
          secure: false,
          maxAge: 60 * 30,
          path: "/",
          sameSite: "lax",
        });

        if (newRefreshToken) {
          response.cookies.set("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            sameSite: "lax",
          });
        }

        // Apply to current request so the rest of the middleware sees it
        request.cookies.set("session_token", newAccessToken);
      } else {
        // Refresh failed -> clear cookies and redirect
        const resp = NextResponse.redirect(new URL("/", request.url));
        resp.cookies.delete("session_token");
        resp.cookies.delete("refresh_token");
        resp.cookies.delete("user_info");
        return resp;
      }
    } catch (error) {
      console.error("Token refresh error", error);
      const resp = NextResponse.redirect(new URL("/", request.url));
      resp.cookies.delete("session_token");
      resp.cookies.delete("refresh_token");
      return resp;
    }
  }

  // ----------------------------------------------------------------
  // 2. ROLE EXTRACTION
  // ----------------------------------------------------------------
  let userRole = "";

  if (finalAccessToken) {
    try {
      const userInfo = request.cookies.get("user_info")?.value;

      const userInfoObj = JSON.parse(userInfo);

      userRole = (userInfoObj.role || userInfoObj.Role || "").toLowerCase();
    } catch (e) {
      console.error("Failed to parse user info in middleware", e);
    }
  }

  // ----------------------------------------------------------------
  // 3. PROTECTION RULES
  // ----------------------------------------------------------------
  console.log(request.url)
  console.log(currentPath)
  console.log(userRole)
  // A. Protect Dashboard
  if (currentPath.startsWith("/dashboard") && !finalAccessToken) {
    
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // B. Protect Login
  if (currentPath === "/login" && finalAccessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // C. Role Redirects
  if (currentPath.startsWith("/dashboard") && userRole) {
    // Redirect Root /dashboard -> /dashboard/[role]
    if (currentPath === "/dashboard") {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url)
      );
    }

    // Prevent Role Hopping
    // Ensure the path starts with the user's specific role
    // e.g., if role is "doctor", path must start with "/dashboard/doctor"
    const allowedPath = `/dashboard/${userRole}`;

    if (!currentPath.startsWith(allowedPath)) {
      // If they are in the wrong folder, bounce them to their correct folder
      return NextResponse.redirect(new URL(allowedPath, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
