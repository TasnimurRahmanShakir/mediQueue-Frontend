"use client";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { SidebarLink } from "@/components/dashboard/SidebarLink";
import { Header } from "@/components/dashboard/Header";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, hit an API route to clear cookies
    document.cookie = "session_token=; path=/; max-age=0";
    document.cookie = "user_role=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <ShieldCheck className="text-blue-400" size={28} />
          <div>
            <h1 className="font-bold text-lg">Admin Panel</h1>
            <p className="text-xs text-slate-400">Super User</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarLink href="/admin" icon={LayoutDashboard} label="Dashboard" />
          <SidebarLink
            href="/admin/users"
            icon={Users}
            label="User Management"
          />
          <SidebarLink
            href="/admin/settings"
            icon={Settings}
            label="Settings"
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-colors w-full"
          >
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Admin Overview" userInitial="A" />
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
