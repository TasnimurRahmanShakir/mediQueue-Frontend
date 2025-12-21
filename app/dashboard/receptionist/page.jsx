"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Calendar as CalendarIcon, Search } from "lucide-react"; // Removed unused Edit
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import "react-calendar/dist/Calendar.css";
import Link from "next/link";
import {
  getAppointmentsByDate,
  cancelAppointment,
} from "@/app/actions/appointmentAction";
import { Trash2, AlertTriangle } from "lucide-react";

export default function ReceptionDashboard() {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- UPDATED SEARCH LOGIC ---
  const filteredAppointments = appointments.filter((apt) => {

    if (!searchQuery) return true;
    return apt.phone && apt.phone.includes(searchQuery);
  });

  // Helper to format time to 12h
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleCancelClick = (id) => {
    setSelectedAppointmentId(id);
    setIsCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    if (!selectedAppointmentId) return;

    const res = await cancelAppointment(selectedAppointmentId);

    if (res.success) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedAppointmentId ? { ...a, status: "Cancelled" } : a
        )
      );
      setIsCancelModalOpen(false);
      setSelectedAppointmentId(null);
    } else {
      alert("Failed to cancel: " + res.error);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const response = await getAppointmentsByDate(formattedDate);

      if (response.success) {
        const mappedAppointments = response.data.map((apt) => ({
          id: apt.id,
          time: formatTime(apt.time || apt.appointmentTime), 
          name: apt.patient?.name || "Unknown",
          doctor: apt.doctor?.user?.name || "Unknown",
          phone: apt.patient?.phoneNumber || "",
          status: apt.status,
        }));
        setAppointments(mappedAppointments);
      } else {
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [date]);

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
            <Link
              href="/dashboard/receptionist/appointment/new"
              className="w-full"
            >
              <Button
                variant="outline"
                className="h-12 w-full border-gray-200 hover:border-blue-500 hover:text-blue-500 text-gray-700 flex items-center justify-center gap-3 text-sm font-medium"
              >
                <CalendarIcon size={18} /> Book Appointment
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Right Column: Today's Appointments Table */}
      <div className="xl:col-span-2">
        <Card className="h-full border-none shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-slate-800">
                Today's Appointments
              </h2>
              <span className="text-sm text-gray-500">
                {date.toDateString()}
              </span>
            </div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by phone..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64 placeholder-slate-400 text-slate-900"
              />
            </div>
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
                  <th className="py-4 font-semibold text-gray-400 text-xs uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((apt, index) => (
                    <tr
                      key={index}
                      className="group hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 text-sm text-gray-600 font-medium">
                        {apt.time}
                      </td>
                      <td className="py-4 text-sm text-gray-800 font-medium">
                        <div>
                          {apt.name}
                          {/* Optional: Show phone number below name for clarity */}
                          <div className="text-xs text-gray-400 font-normal">
                            {apt.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-500">
                        {apt.doctor}
                      </td>
                      <td className="py-4">
                        <Badge type="status" label={apt.status} />
                      </td>
                      <td className="py-4 text-right">
                        {apt.status !== "Cancelled" && (
                          <button
                            onClick={() => handleCancelClick(apt.id)}
                            className="inline-flex items-center justify-center p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Appointment"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-8 text-center text-gray-400 text-sm"
                    >
                      {appointments.length === 0
                        ? "No appointments found for this date."
                        : "No patient found with that phone number."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800">
                  Cancel Booking?
                </h3>
                <p className="text-sm text-slate-500">
                  Are you sure you want to cancel this appointment? This action
                  cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex border-t border-slate-100">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition border-r border-slate-100"
              >
                Go Back
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
