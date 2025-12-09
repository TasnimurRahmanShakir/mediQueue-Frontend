import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  // Mock Database
  const users = [
    { email: "admin@hospital.com", password: "123", role: "admin" },
    { email: "doc@hospital.com", password: "123", role: "doctor" },
    { email: "desk@hospital.com", password: "123", role: "receptionist" },
  ];

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const response = NextResponse.json({ success: true, role: user.role });

    // Set Auth Cookie
    response.cookies.set("session_token", "mock-jwt-token", {
      httpOnly: true,
      path: "/",
      maxAge: 86400,
    });
    // Set Role Cookie (for Middleware)
    response.cookies.set("user_role", user.role, {
      httpOnly: true,
      path: "/",
      maxAge: 86400,
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
