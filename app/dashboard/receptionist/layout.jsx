"use client";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  LogOut,
  Settings,
} from "lucide-react";
import { SidebarLink } from "@/components/dashboard/SidebarLink";
import { Header } from "@/components/dashboard/Header";
import { logoutAction } from "@/app/actions/auth";

export default function ReceptionistLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    logoutAction();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Matches Dark Theme in Image */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <ShieldCheck className="text-blue-500" size={32} />
          <div>
            <h1 className="font-bold text-lg leading-tight">
              Clinic Management
            </h1>
            <p className="text-xs text-slate-400">Receptionist</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          <SidebarLink
            href="/dashboard/receptionist"
            icon={LayoutDashboard}
            label="Dashboard"
            baseColor="bg-blue-600"
          />
          {/* <SidebarLink
            href="/dashboard/receptionist/patients"
            icon={Users}
            label="Patients"
            baseColor="bg-blue-600"
          /> */}
          <SidebarLink
            href="/dashboard/receptionist/billing"
            icon={FileText}
            label="Billing"
            baseColor="bg-blue-600"
          />
        </nav>

        <div className="p-4 space-y-2 border-t border-slate-700">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white w-full transition-colors rounded-lg hover:bg-slate-700">
            <Settings size={20} /> <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white w-full transition-colors rounded-lg hover:bg-slate-700"
          >
            <LogOut size={20} /> <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Reusing Header with specific title */}
        <Header title="" userInitial="R" />
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">{children}</div>
      </main>
    </div>
  );
}
