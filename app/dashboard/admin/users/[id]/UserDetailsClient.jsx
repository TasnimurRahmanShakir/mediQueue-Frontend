"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Edit2,
  RefreshCcw,
  MapPin,
  Calendar,
  Briefcase,
  Award,
} from "lucide-react";
import { updateUser } from "@/app/actions/userAction";
import StatusBadge from "@/components/ui/Badge";
import { BASE_URL2 } from "@/app/service/api";

// Helper for display fields
const InfoField = ({
  label,
  value,
  icon: Icon,
  isEditing,
  name,
  onChange,
  type = "text",
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
      {Icon && <Icon size={14} />} {label}
    </label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 text-sm"
      />
    ) : (
      <p className="text-slate-900 font-medium text-sm md:text-base">
        {value || "N/A"}
      </p>
    )}
  </div>
);

export default function UserDetailsClient({ initialUser, id }) {
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(
    searchParams?.get("edit") === "true"
  );

  const [formData, setFormData] = useState(initialUser);

  const [user, setUser] = useState(initialUser);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      console.log("Form Data from handleSave", formData);
      const result = await updateUser(id, formData);
      if (result.success) {
        setUser(result.data);
        setFormData(result.data);
        setIsEditing(false);
      } else {
        alert("Failed to update user: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("An error occurred while saving.");
    }
  };

  const handleResetPassword = () => {
    console.log("Resetting password for", id);
    alert("Reset Password functionality implementation pending.");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Navigation / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link
            href="/dashboard/admin/users"
            className="text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-2 text-sm transition font-medium"
          >
            <ArrowLeft size={16} /> Back to Users
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            {user.name} <StatusBadge label={user.role} />
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage user details, role permissions, and schedule.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleResetPassword}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition shadow-sm text-sm"
          >
            <RefreshCcw size={16} /> Reset Password
          </button>

          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(user); // Revert changes to last saved state
                }}
                className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 font-medium transition shadow-sm text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition shadow-sm shadow-blue-200 text-sm"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition shadow-sm shadow-blue-200 text-sm"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-slate-100 mb-4 overflow-hidden border-4 border-white shadow-md relative group">
                <img
                  src={
                    formData.Image
                      ? URL.createObjectURL(formData.Image)
                      : BASE_URL2 + user.imageUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name
                        )}&background=random`
                  }
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <input
                      type="file"
                      name="Image"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <Edit2 className="text-white" size={24} />
                  </label>
                )}
                {!isEditing && (
                  <div
                    className={`absolute bottom-3 right-3 w-4 h-4 rounded-full border-2 border-white ${
                      user.status === "Active" ? "bg-green-500" : "bg-slate-400"
                    }`}
                  ></div>
                )}
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {formData.name}
            </h2>
            <div className="flex gap-2 justify-center mt-2 items-center">
              <StatusBadge type="role" label={user.role} />
              {isEditing ? (
                <select
                  name="status"
                  value={formData.status || user.status}
                  onChange={handleInputChange}
                  className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-semibold uppercase tracking-wider text-slate-700 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Offline">Offline</option>
                  <option value="Suspended">Suspended</option>
                </select>
              ) : (
                <StatusBadge type="status" label={user.status} />
              )}
            </div>
            <p className="text-slate-500 text-sm mt-4 leading-relaxed">
              {user.bio ||
                "No bio available for this user. Add a description to provide more context."}
            </p>

            <div className="flex flex-col gap-3 w-full mt-6">
              <Link
                href={`mailto:${formData.email}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-medium text-sm transition border border-slate-100"
              >
                <Mail size={16} /> Send Email
              </Link>
              <Link
                href={`https://wa.me/+88${formData.phoneNumber}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-medium text-sm transition border border-slate-100"
              >
                <Phone size={16} /> Call Now
              </Link>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              This Month
            </h3>
            {user.role === "Doctor" && (
              <div className="grid grid-cols-2 divide-x divide-slate-100">
                <div className="text-center px-4">
                  <div className="text-2xl font-bold text-slate-900">
                    {user.appointments ?? 0}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    Appointments
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Briefcase size={20} />
              </div>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <InfoField
                label="Full Name"
                value={formData.name}
                name="name"
                onChange={handleInputChange}
              />
              <InfoField
                label="Date of Birth"
                value={formData.dob}
                name="dob"
                Icon={Calendar}
                onChange={handleInputChange}
                type="date"
              />
              <InfoField
                label="Email Address"
                value={formData.email}
                name="email"
                isEditing={isEditing}
                Icon={Mail}
                onChange={handleInputChange}
              />
              <InfoField
                label="Phone Number"
                value={formData.phoneNumber}
                name="phoneNumber"
                isEditing={isEditing}
                Icon={Phone}
                onChange={handleInputChange}
              />
              <div className="md:col-span-2">
                <InfoField
                  label="Home Address"
                  value={formData.address}
                  name="address"
                  // isEditing={isEditing}
                  Icon={MapPin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Award size={20} />
              </div>
              Professional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <InfoField
                label="Employee ID"
                value={formData.id || "DR-2023-089"}
                name="Id"
                // isEditing={isEditing}
                onChange={handleInputChange}
              />
              {user.role === "Doctor" && (
                <>
                  <InfoField
                    label="Department"
                    value={
                      formData.doctorProfile.specialization + "Dept." ||
                      "Cardiology Dept."
                    }
                    name="department"
                    onChange={handleInputChange}
                  />
                  <InfoField
                    label="Specialization"
                    value={
                      formData.doctorProfile.specialization ||
                      "Interventional Cardiology"
                    }
                    name="specialization"
                    // isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <InfoField
                    label="Medical License #"
                    value={
                      formData.doctorProfile.licenseNumber || "MD-99887766"
                    }
                    name="license"
                    // isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <InfoField
                    label="Consultation Fee"
                    value={
                      formData.ConsultationFee ??
                      formData.doctorProfile.consultationFee ??
                      "$150.00 / Session"
                    }
                    name="ConsultationFee"
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                </>
              )}
              {user.role === "Receptionist" && (
                <div className="max-w-md">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      Shift Time
                    </label>
                    {isEditing ? (
                      <select
                        name="ShiftTime"
                        value={
                          formData.ShiftTime ||
                          formData.receptionistProfile?.shiftTime ||
                          ""
                        }
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 text-sm appearance-none"
                      >
                        <option value="">Select Shift</option>
                        <option value="Morning">Morning (8AM - 4PM)</option>
                        <option value="Evening">Evening (4PM - 12AM)</option>
                        <option value="Night">Night (12AM - 8AM)</option>
                      </select>
                    ) : (
                      <p className="text-slate-900 font-medium text-sm md:text-base">
                        {formData.ShiftTime ||
                          formData.receptionistProfile?.shiftTime ||
                          "N/A"}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {/* <InfoField
                label="Joining Date"
                value={formData.joiningDate || "March 10, 2018"}
                name="joiningDate"
                isEditing={isEditing}
                onChange={handleInputChange}
                type="date"
              /> */}

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Shift Schedule
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                    Mon - Fri: 09:00 AM - 05:00 PM
                  </span>
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>{" "}
                    Sat: On Call
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
