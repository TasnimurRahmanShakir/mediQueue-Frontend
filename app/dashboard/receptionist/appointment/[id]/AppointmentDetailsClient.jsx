"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Activity,
  Clock,
  Save,
  Edit2,
} from "lucide-react";
import StatusBadge from "@/components/ui/Badge";

// Helper for display fields (reused pattern)
const InfoField = ({
  label,
  value,
  icon: Icon,
  isEditing,
  name,
  onChange,
  type = "text",
  options = [],
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
      {Icon && <Icon size={14} />} {label}
    </label>
    {isEditing ? (
      options.length > 0 ? (
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 text-sm appearance-none placeholder:text-slate-900"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 text-sm"
        />
      )
    ) : (
      <p className="text-slate-900 font-medium text-sm md:text-base">
        {value || "N/A"}
      </p>
    )}
  </div>
);

export default function AppointmentDetailsClient({ initialData, id }) {
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved data:", formData);
    alert("Changes saved (mock)!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      {/* Top Navigation / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link
            href="/dashboard/receptionist"
            className="text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-2 text-sm transition font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Appointment Details <StatusBadge label={formData.Status} />
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            View and manage appointment information.
          </p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(initialData);
                }}
                className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 font-medium transition shadow-sm text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition shadow-sm shadow-blue-200 text-sm flex items-center gap-2"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition shadow-sm shadow-blue-200 text-sm"
            >
              <Edit2 size={16} /> Edit Details
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Details Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 md:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileText size={20} />
            </div>
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <InfoField
              label="Internal ID"
              value={formData.Id}
              name="Id"
              // Not editable
            />
            <InfoField
              label="Status"
              value={formData.Status}
              name="Status"
              isEditing={isEditing}
              options={[
                "Scheduled",
                "Waiting",
                "In Progress",
                "Completed",
                "Cancelled",
              ]}
              onChange={handleInputChange}
              Icon={Activity}
            />
            <InfoField
              label="Reason for Visit"
              value={formData.Reason}
              name="Reason"
              isEditing={isEditing}
              onChange={handleInputChange}
              Icon={FileText}
            />
            <InfoField
              label="Scheduled Time"
              value={
                formData.Schedule
                  ? new Date(formData.Schedule).toLocaleString()
                  : ""
              }
              name="Schedule"
              isEditing={isEditing}
              type="datetime-local"
              onChange={handleInputChange}
              Icon={Calendar}
            />
            <InfoField
              label="Created At"
              value={
                formData.CreatedAt
                  ? new Date(formData.CreatedAt).toLocaleString()
                  : ""
              }
              name="CreatedAt"
              // Not editable
              Icon={Clock}
            />
          </div>
        </div>

        {/* Doctor Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <User size={20} />
            </div>
            Doctor Information
          </h3>
          <div className="space-y-4">
            <InfoField
              label="Doctor Name"
              value={formData.DoctorName}
              name="DoctorName"
              // Read only for now as changing doctor might be complex
              Icon={User}
            />
            <InfoField
              label="Doctor ID"
              value={formData.DoctorId}
              name="DoctorId"
              // Read only
            />
          </div>
        </div>

        {/* Patient Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <User size={20} />
            </div>
            Patient Information
          </h3>
          <div className="space-y-4">
            <InfoField
              label="Patient Name"
              value={formData.PatientName}
              name="PatientName"
              // Read only for now
              Icon={User}
            />
            <InfoField
              label="Patient ID"
              value={formData.PatientId}
              name="PatientId"
              // Read only
            />
          </div>
        </div>
      </div>
    </div>
  );
}
