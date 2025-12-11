import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  const userInfoStr = cookieStore.get("user_info")?.value;

  if (!token || !userInfoStr) return null;

  try {
    const user = JSON.parse(userInfoStr);
    return { token, user };
  } catch {
    return null;
  }
}