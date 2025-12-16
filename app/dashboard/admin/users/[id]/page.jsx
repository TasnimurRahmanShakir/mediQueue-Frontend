// app/dashboard/admin/users/[id]/page.js
import { getUserById } from "@/app/actions/userAction";
import UserDetailsClient from "./UserDetailsClient"; 

export default async function UserDetailsPage({ params }) {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    return <div className="p-8 text-center text-red-500">User not found.</div>;
  }
  console.log("User", user);
  return <UserDetailsClient initialUser={user} id={id} />;
}
