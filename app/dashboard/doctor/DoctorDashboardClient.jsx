"use client";
import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Save,
  Printer,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddMedicationModal } from "@/components/doctor/AddMedicationModal";

export default function DoctorDashboardClient({ appointments = [] }) {
  // Initialize selected appointment to the first one if available
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(
    appointments.length > 0 ? appointments[0].appointmentId : null
  );

  const [isMedicationModalOpen, setMedicationModalOpen] = useState(false);
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Amoxicillin 500mg",
      dosage: "1 tablet, 3 times a day for 7 days",
    },
    {
      id: 2,
      name: "Ibuprofen 200mg",
      dosage: "As needed for pain, max 3 times a day",
    },
  ]);

  const activeAppointment = appointments.find(
    (a) => a.appointmentId === selectedAppointmentId
  );

  const removeMedication = (id) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  const addMedication = () => {
    setMedicationModalOpen(true);
  };

  const handleSaveMedication = (newMed) => {
    setMedications([...medications, { id: Date.now(), ...newMed }]);
  };

  // Helper to format time
  const formatTime = (timeInfo) => {
    if (!timeInfo) return "";
    // Assuming TimeOnly comes as { hour: 10, minute: 30 } or string "10:30:00"
    if (typeof timeInfo === "string") {
      const [hours, minutes] = timeInfo.split(":");
      const date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }
    return timeInfo;
  };

  // Helper for Avatar Seed
  const getAvatarSeed = (name) => {
    return name ? name.replace(/\s+/g, "") : "default";
  };

  return (
    <div className="flex h-full">
      {/* LEFT COLUMN: Patient Queue */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col z-10">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-slate-800 mb-4">Patient Queue</h2>
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              placeholder="Find a patient..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {appointments.length === 0 ? (
            <div className="p-6 text-center text-gray-400 text-sm">
              No scheduled appointments.
            </div>
          ) : (
            appointments.map((apt) => (
              <div
                key={apt.appointmentId}
                onClick={() => setSelectedAppointmentId(apt.appointmentId)}
                className={`p-4 flex items-center gap-3 cursor-pointer border-l-4 transition-all ${
                  selectedAppointmentId === apt.appointmentId
                    ? "bg-blue-50 border-blue-500"
                    : "bg-white border-transparent hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getAvatarSeed(
                      apt.patientName
                    )}`}
                    alt={apt.patientName}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className={`text-sm font-bold truncate ${
                      selectedAppointmentId === apt.appointmentId
                        ? "text-blue-700"
                        : "text-slate-700"
                    }`}
                  >
                    {apt.patientName}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        apt.status === "In-Progress"
                          ? "bg-green-500"
                          : "bg-orange-400" // Default waiting color
                      }`}
                    ></span>
                    <span className="text-xs text-gray-500">
                      {apt.status || "Scheduled"}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-400">
                  {formatTime(apt.appointmentTime)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Active Visit Record */}
      <div className="flex-1 bg-gray-50 flex flex-col h-full overflow-hidden">
        {activeAppointment ? (
          <>
            {/* Header Strip */}
            <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  Active Visit Record
                </h1>
                <p className="text-xs text-gray-400">
                  Appointment ID: {activeAppointment.appointmentId}
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="hidden md:block">
                  <span className="text-gray-400">Patient:</span>{" "}
                  <span className="font-semibold text-slate-800">
                    {activeAppointment.patientName}
                  </span>
                </div>
                {/* Age and Gender not in DTO, hidden for now */}
                {/* <div className="hidden md:block">
                    <span className="text-gray-400">Age:</span> --
                    </div>
                    <div className="hidden md:block">
                    <span className="text-gray-400">Gender:</span> --
                    </div> */}
                <div className="hidden md:block">
                  <span className="text-gray-400">Blood:</span>{" "}
                  {activeAppointment.bloodGroup || "N/A"}
                </div>
                <div className="hidden md:block">
                  <span className="text-gray-400">Phone:</span>{" "}
                  {activeAppointment.patientPhone || "N/A"}
                </div>
              </div>
            </div>

            {/* Scrollable Content Form */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Reason for Visit */}
                <div className="bg-blue-50 border border-blue-100 text-blue-800 px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium">
                  <AlertTriangle size={18} />
                  Reason for Visit: {activeAppointment.reason}
                </div>

                {/* Allergy Alert - Static for now */}
                <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium">
                  <AlertTriangle size={18} />
                  Allergy Alert: Patient is allergic to Penicillin.
                </div>

                {/* Diagnosis Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-bold text-slate-800 mb-3">Diagnosis</h3>
                  <textarea
                    className="w-full h-32 p-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    placeholder="Enter patient diagnosis..."
                    defaultValue=""
                  ></textarea>
                </div>

                {/* Prescription Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-bold text-slate-800 mb-4">
                    Prescription
                  </h3>
                  <div className="space-y-3">
                    {medications.map((med) => (
                      <div
                        key={med.id}
                        className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-100 rounded-lg group"
                      >
                        <div className="flex-1">
                          <input
                            defaultValue={med.name}
                            className="bg-transparent font-bold text-slate-700 w-full focus:outline-none mb-1"
                          />
                          <input
                            defaultValue={med.dosage}
                            className="bg-transparent text-sm text-gray-500 w-full focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={() => removeMedication(med.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={addMedication}
                      className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 font-medium hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={18} /> Add Medication
                    </button>
                  </div>
                </div>

                {/* Private Notes Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-bold text-slate-800 mb-3">
                    Private Notes{" "}
                    <span className="text-xs font-normal text-gray-400">
                      (Not visible to patient)
                    </span>
                  </h3>
                  <textarea
                    className="w-full h-24 p-4 text-gray-700 bg-yellow-50 border border-yellow-100 rounded-lg focus:outline-none focus:border-yellow-300 transition-all resize-none placeholder-gray-400"
                    placeholder="Add internal notes here..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-white border-t border-gray-200 p-4 flex justify-end gap-3 shrink-0">
              <Button
                variant="ghost"
                className="w-auto px-6 text-gray-600 bg-gray-100 hover:bg-gray-200"
              >
                <Save size={18} /> Save as Draft
              </Button>
              <Button className="w-auto px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                <Printer size={18} /> Finalize & Print
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={32} />
            </div>
            <p>Select a patient from the queue to view details.</p>
          </div>
        )}
      </div>
      <AddMedicationModal
        isOpen={isMedicationModalOpen}
        onClose={() => setMedicationModalOpen(false)}
        onSave={handleSaveMedication}
      />
    </div>
  );
}
