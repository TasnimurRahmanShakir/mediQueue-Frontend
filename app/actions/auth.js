"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ONLY use this in development. Remove in production!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch("https://localhost:7232/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      let errorMessage = "Invalid credentials";

      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        errorMessage = await res.text();
      }

      return { error: errorMessage };
    }

    const data = await res.json();
    const loginData = data;

    const cookieStore = await cookies();

    cookieStore.set("session_token", data.token, {
      httpOnly: true,
      secure: false, // Set true in production
      maxAge: 60 * 30,
      path: "/",
      sameSite: "lax",
    });

    cookieStore.set("refresh_token", data.refreshToken, {
      httpOnly: true,
      secure: false, // Set true in production
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    cookieStore.set("user_info", JSON.stringify(loginData.result), {
      httpOnly: true,
      secure: false, // Set true in production
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    const role = loginData.result.role;
    if (role === "Admin") {
      redirect("/dashboard/admin");
    } else if (role === "Doctor") {
      redirect("/dashboard/doctor");
    } else if (role === "Reception") {
      redirect("/dashboard/reception");
    } else {
      redirect("/dashboard");
    }
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    console.error("Login failed:", error);
    return { error: "Connection to server failed. Please try again." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
  cookieStore.delete("user_info");
  cookieStore.delete("refresh_token");
  redirect("/");
}
