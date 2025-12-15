"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { UserPlus, Calendar as CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import "react-calendar/dist/Calendar.css";

export default function ReceptionDashboard() {
  const [date, setDate] = useState(new Date());

  const appointments = [
    {
      time: "09:00 AM",
      name: "Liam Johnson",
      doctor: "Dr. Emily Carter",
      status: "Waiting",
    },
    {
      time: "09:30 AM",
      name: "Olivia Smith",
      doctor: "Dr. Ben Adams",
      status: "Completed",
    },
    {
      time: "10:00 AM",
      name: "Noah Williams",
      doctor: "Dr. Emily Carter",
      status: "Waiting",
    },
    {
      time: "10:30 AM",
      name: "Emma Brown",
      doctor: "Dr. Sarah Day",
      status: "Waiting",
    },
    {
      time: "11:00 AM",
      name: "James Davis",
      doctor: "Dr. Ben Adams",
      status: "In Progress",
    },
    {
      time: "11:30 AM",
      name: "Sophia Miller",
      doctor: "Dr. Sarah Day",
      status: "Cancelled",
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Left Column: Calendar & Quick Actions */}
      <div className="space-y-6">
        {/* Calendar Widget */}
        <Card className="p-6 border-none shadow-sm">
          <style>{`
            .react-calendar { border: none; font-family: inherit; width: 100%; }
            .react-calendar__tile--active { background: #3b82f6 !important; color: white; border-radius: 50%; }
            .react-calendar__tile--now { background: #eff6ff; color: #3b82f6; border-radius: 50%; }
            .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus { background: #e0f2fe; border-radius: 50%; }
            .react-calendar__navigation button { font-weight: bold; font-size: 1.1rem; }
          `}</style>
          <Calendar
            onChange={setDate}
            value={date}
            className="w-full text-sm border-none"
            next2Label={null}
            prev2Label={null}
          />
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button className="h-12 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-3 text-sm font-medium">
              <UserPlus size={18} /> Register New Patient
            </Button>
            <Button
              variant="outline"
              className="h-12 border-gray-200 hover:border-blue-500 hover:text-blue-500 text-gray-700 flex items-center justify-center gap-3 text-sm font-medium"
            >
              <CalendarIcon size={18} /> Book Appointment
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Column: Today's Appointments Table */}
      <div className="xl:col-span-2">
        <Card className="h-full border-none shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Today's Appointments
            </h2>
            <span className="text-sm text-gray-500">{date.toDateString()}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 font-semibold text-gray-400 text-xs uppercase tracking-wider w-24">
                    Time
                  </th>
                  <th className="py-4 font-semibold text-gray-400 text-xs uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="py-4 font-semibold text-gray-400 text-xs uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="py-4 font-semibold text-gray-400 text-xs uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointments.map((apt, index) => (
                  <tr
                    key={index}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 text-sm text-gray-600 font-medium">
                      {apt.time}
                    </td>
                    <td className="py-4 text-sm text-gray-800 font-medium">
                      {apt.name}
                    </td>
                    <td className="py-4 text-sm text-gray-500">{apt.doctor}</td>
                    <td className="py-4">
                      <Badge status={apt.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
