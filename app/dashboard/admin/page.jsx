import { Users, BriefcaseMedical, DollarSign, Activity } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Users"
          value="1,240"
          color="bg-blue-500"
        />
        <StatCard
          icon={BriefcaseMedical}
          label="Doctors"
          value="45"
          color="bg-indigo-500"
        />
        <StatCard
          icon={Activity}
          label="System Health"
          value="98%"
          color="bg-green-500"
        />
        <StatCard
          icon={DollarSign}
          label="Revenue"
          value="$45,200"
          color="bg-emerald-500"
        />
      </div>
      {/* Admin specific content could go here */}
    </div>
  );
}
