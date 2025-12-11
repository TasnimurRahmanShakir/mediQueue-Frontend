"use client";
import { useRouter } from "next/navigation";
import { Stethoscope, Clock, LogOut, Settings, User } from "lucide-react";
import { SidebarLink } from "@/components/dashboard/SidebarLink";
import { Header } from "@/components/dashboard/Header";
import { logoutAction } from "@/app/actions/auth";

export default function DoctorLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    logoutAction();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Matches Dark Theme */}
      <aside className="w-20 lg:w-64 bg-slate-800 text-white flex flex-col shrink-0 transition-all duration-300">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-700">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Stethoscope size={24} />
          </div>
          <span className="hidden lg:block ml-3 font-bold text-white leading-tight">
            Doctor Portal
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink
            href="/doctor"
            icon={Stethoscope}
            label="Active Visits"
            baseColor="bg-blue-600"
          />
          <SidebarLink
            href="/doctor/history"
            icon={Clock}
            label="Visit History"
            baseColor="bg-blue-600"
          />
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-2">
          <button className="flex items-center justify-center lg:justify-start gap-3 px-4 py-3 text-slate-300 hover:text-white w-full transition-colors rounded-lg hover:bg-slate-700">
            <Settings size={20} />{" "}
            <span className="hidden lg:block">Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center lg:justify-start gap-3 px-4 py-3 text-slate-300 hover:text-white w-full transition-colors rounded-lg hover:bg-slate-700"
          >
            <LogOut size={20} />{" "}
            <span className="hidden lg:block">Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Header title="" userInitial="D" />
        {/* Pass full height to children for the split-view dashboard */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </main>
    </div>
  );
}
