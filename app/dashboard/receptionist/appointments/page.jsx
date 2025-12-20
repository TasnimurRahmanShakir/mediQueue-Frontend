"use client";
import { useState } from "react";
import { Calendar, Clock, MoreVertical, Filter } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Waiting", "In Progress", "Completed", "Cancelled"];

  const appointments = [
    {
      id: 1,
      time: "09:00 AM",
      name: "Liam Johnson",
      doctor: "Dr. Emily Carter",
      type: "General Checkup",
      status: "Waiting",
    },
    {
      id: 2,
      time: "09:30 AM",
      name: "Olivia Smith",
      doctor: "Dr. Ben Adams",
      type: "Dental Cleaning",
      status: "Completed",
    },
    {
      id: 3,
      time: "11:00 AM",
      name: "James Davis",
      doctor: "Dr. Ben Adams",
      type: "Surgery",
      status: "In Progress",
    },
  ];

  // Filter logic (mock)
  const filteredAppointments =
    activeTab === "All"
      ? appointments
      : appointments.filter((a) => a.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
          <p className="text-sm text-gray-500">View and manage schedules.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/receptionist/appointment/new" className="px-6">Book Appointment</Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Time
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Patient
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Doctor
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Type
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt) => (
                  <tr
                    key={apt.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Clock size={16} className="text-blue-500" /> {apt.time}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {apt.name}
                    </td>
                    <td className="p-4 text-sm text-gray-600">{apt.doctor}</td>
                    <td className="p-4 text-sm text-gray-600">{apt.type}</td>
                    <td className="p-4">
                      <Badge status={apt.status} />
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-gray-400 hover:text-blue-600 p-1">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    No appointments found for this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
