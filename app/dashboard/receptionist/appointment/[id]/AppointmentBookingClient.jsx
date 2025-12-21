"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, UserPlus, Calendar as CalendarIcon, Info } from "lucide-react";
import {
  searchSpecializations,
  getDoctorAvailableSlots,
  createAppointment,
  searchPatient
} from "@/app/actions/appointmentAction";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useDebouncedCallback } from "@/app/hooks/useDebounce";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function AppointmentBookingClient({
  doctors: initialDoctors = [],
}) {
  const router = useRouter();
  const [patientMode, setPatientMode] = useState("search"); // 'search' | 'register'

  // --- Search State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // --- Specialization State ---
  const [specQuery, setSpecQuery] = useState("");
  const [specResults, setSpecResults] = useState([]);
  const [isSpecSearching, setIsSpecSearching] = useState(false);
  const [showSpecSuggestions, setShowSpecSuggestions] = useState(false);

  // --- Data State ---
  const [availableDoctors, setAvailableDoctors] = useState(initialDoctors);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // --- Form State ---
  const [formData, setFormData] = useState({
    Name: "",
    PhoneNumber: "",
    BloodGroup: "",
    DOB: "",
    DoctorId: "",
    Specialization: "",
    AppointmentDate: "",
    AppointmentTime: "",
    Reason: "",
  });

  // =========================================================
  // 1. DEBOUNCED SEARCH LOGIC
  // =========================================================

  const performPatientSearch = useDebouncedCallback(async (query) => {
    if (query.length > 0) {
      setIsSearching(true);
      const results = await searchPatient(query);
      setSearchResults(results.data || []);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }, 500);

  const performSpecSearch = useDebouncedCallback(async (query) => {
    if (query.length > 0) {
      setIsSpecSearching(true);
      const results = await searchSpecializations(query);
      setSpecResults(results.success ? results.data : []);
      setIsSpecSearching(false);
      setShowSpecSuggestions(true);
    } else {
      setSpecResults([]);
      setShowSpecSuggestions(false);
    }
  }, 300);

  // =========================================================
  // 2. HANDLERS
  // =========================================================

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (patientMode === "register") return;
    performPatientSearch(query);
  };

  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery("");
    setSearchResults([]);
  };

  const toggleRegisterMode = () => {
    if (patientMode === "search") {
      setPatientMode("register");
      setSelectedPatient(null);
      setSearchQuery("");
      setSearchResults([]);
    } else {
      setPatientMode("search");
    }
  };

  const handleSpecChange = (e) => {
    const value = e.target.value;
    setSpecQuery(value);

    // Reset doctor if specialization changes
    setFormData((prev) => ({ ...prev, Specialization: value, DoctorId: "" }));
    setAvailableDoctors([]); // Clear doctors until valid selection

    performSpecSearch(value);
  };

  const selectSpecialization = (deptObject) => {
    // 1. Set the Input Text
    setSpecQuery(deptObject.departmentName);

    // 2. Update Form Data
    setFormData((prev) => ({
      ...prev,
      Specialization: deptObject.departmentName,
      DoctorId: "",
    }));

    // 3. Populate Doctors
    setAvailableDoctors(deptObject.doctors || []);

    // 4. Hide Suggestions
    setShowSpecSuggestions(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset slot selection if critical fields change
    if (name === "DoctorId" || name === "AppointmentDate") {
      setFormData((prev) => ({ ...prev, [name]: value, AppointmentTime: "" }));
    }
  };

  // =========================================================
  // 3. EFFECT: FETCH SLOTS
  // =========================================================
  useEffect(() => {
    if (formData.DoctorId && formData.AppointmentDate) {
      const fetchSlots = async () => {
        setIsLoadingSlots(true);
        setAvailableSlots([]);

        const res = await getDoctorAvailableSlots(
          formData.DoctorId,
          formData.AppointmentDate
        );
        if (res.success) {
          setAvailableSlots(res.data);
        } else {
          setAvailableSlots([]);
        }
        setIsLoadingSlots(false);
      };

      fetchSlots();
    }
  }, [formData.DoctorId, formData.AppointmentDate]);

  // =========================================================
  // 4. SUBMIT
  // =========================================================
  const handleSubmit = async () => {
    if (
      !formData.DoctorId ||
      !formData.AppointmentDate ||
      !formData.AppointmentTime
    ) {
      alert("Please fill in all required appointment details.");
      return;
    }

    if (patientMode === "register") {
      if (!formData.Name || !formData.PhoneNumber) {
        alert("Please fill in all required patient details.");
        return;
      }
    } else if (!selectedPatient) {
      alert("Please select a patient.");
      return;
    }

    let payload = {
      DoctorId: formData.DoctorId,
      AppointmentDate: formData.AppointmentDate,
      AppointmentTime: formData.AppointmentTime,
      Reason: formData.Reason,
    };

    if (patientMode === "register") {
      payload = {
        ...payload,
        Name: formData.Name,
        PhoneNumber: formData.PhoneNumber,
        BloodGroup: formData.BloodGroup,
        DOB: formData.DOB,
      };
    } else {
      payload.PatientId = selectedPatient.id;
    }
    const result = await createAppointment(payload);
    if (result.success) {
      alert("Appointment booked successfully!");
      router.push("/dashboard/receptionist");
    } else {
      alert("Failed: " + result.error);
    }
  };

  // =========================================================
  // 5. RENDER
  // =========================================================
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Book Appointment</h1>
        <Link
          href="/dashboard/receptionist"
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
        >
          Cancel
        </Link>
      </div>

      <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        {/* --- PATIENT SECTION --- */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            Patient Information
          </h2>

          {/* Restored Blue Info Box */}
          <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-sm flex gap-3 items-start">
            <Info size={18} className="mt-0.5 shrink-0" />
            <p>Search for an existing patient or register a new one.</p>
          </div>

          {/* Search Input Section */}
          <div
            className={`space-y-4 transition-opacity duration-300 ${
              patientMode === "register"
                ? "opacity-50 pointer-events-none"
                : "opacity-100"
            }`}
          >
            <h3 className="text-sm font-semibold text-slate-700">
              Find Existing Patient
            </h3>
            {selectedPatient ? (
              <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">
                    {selectedPatient.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {selectedPatient.email || selectedPatient.phoneNumber}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="relative flex-1">
                <Input
                  placeholder="Search by name, ID, phone..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  disabled={patientMode === "register"}
                  icon={Search}
                  className="disabled:bg-slate-50"
                  autoComplete="off"
                />
                {/* Search Results Dropdown */}
                {searchQuery.length > 2 && patientMode === "search" && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 z-10 max-h-60 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 text-center text-slate-400 text-sm">
                        Searching...
                      </div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => selectPatient(user)}
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 flex flex-col gap-0.5 border-b border-slate-50 last:border-0"
                        >
                          <span className="font-medium text-slate-800 text-sm">
                            {user.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {user.email || user.phoneNumber}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-slate-400 text-sm">
                        No patients found.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Restored Register Toggle Button */}
          <div className="flex items-center gap-4">
            <div className="h-px bg-slate-100 flex-1"></div>
            <button
              onClick={toggleRegisterMode}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition flex items-center gap-2 ${
                patientMode === "register"
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <UserPlus size={16} />
              {patientMode === "register"
                ? "Registering New Patient..."
                : "Register New Patient"}
            </button>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>

          {/* Registration Form */}
          <div
            className={`space-y-4 transition-all duration-300 ${
              patientMode === "search"
                ? "opacity-50 pointer-events-none grayscale"
                : "opacity-100"
            }`}
          >
            <h3 className="text-sm font-semibold text-slate-700">
              New Patient Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                disabled={patientMode === "search"}
                placeholder="e.g. John Doe"
                className="disabled:text-slate-400"
              />
              <Input
                label="Phone Number"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                disabled={patientMode === "search"}
                placeholder="+1 (555) 000-0000"
                type="tel"
                className="disabled:text-slate-400"
              />
              <Select
                label="Blood Group"
                name="BloodGroup"
                value={formData.BloodGroup}
                onChange={handleInputChange}
                disabled={patientMode === "search"}
                options={BLOOD_GROUPS}
                placeholder="Select Blood Group"
                className="disabled:text-slate-400"
              />
              <Input
                label="Date of Birth"
                name="DOB"
                value={formData.DOB}
                onChange={handleInputChange}
                disabled={patientMode === "search"}
                type="date"
                className="disabled:text-slate-400"
              />
            </div>
          </div>
        </section>

        {/* --- APPOINTMENT SECTION --- */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            Appointment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Input
                label="Specialization"
                name="Specialization"
                value={specQuery}
                onChange={handleSpecChange}
                placeholder="Type to search Department..."
                className="w-full"
                autoComplete="off"
                onFocus={() => {
                  if (specQuery && specResults.length > 0)
                    setShowSpecSuggestions(true);
                }}
              />
              {/* Specialization Search Results */}
              {showSpecSuggestions &&
                (specResults.length > 0 || isSpecSearching) && (
                  <div className="absolute top-[calc(100%-8px)] left-0 right-0 bg-white rounded-b-xl shadow-lg border border-slate-100 z-20 max-h-60 overflow-y-auto">
                    {isSpecSearching ? (
                      <div className="p-3 text-xs text-slate-400">
                        Searching...
                      </div>
                    ) : (
                      specResults.map((dept, index) => (
                        <button
                          key={index}
                          onClick={() => selectSpecialization(dept)}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-700 flex justify-between items-center"
                        >
                          <span>{dept.departmentName}</span>
                          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {dept.doctors.length} Doctors
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
            </div>

            <Select
              label="Doctor"
              name="DoctorId"
              value={formData.DoctorId}
              onChange={handleInputChange}
              options={availableDoctors.map((doc) => ({
                value: doc.id,
                label: `${doc.name}`,
              }))}
              placeholder={
                availableDoctors.length === 0
                  ? "Select Dept first"
                  : "Select a doctor"
              }
              disabled={availableDoctors.length === 0}
            />
            <Input
              label="Date"
              name="AppointmentDate"
              value={formData.AppointmentDate}
              onChange={handleInputChange}
              type="date"
              icon={CalendarIcon}
            />

            <Input
              label="Reason"
              name="Reason"
              value={formData.Reason}
              onChange={handleInputChange}
              placeholder="e.g. Regular checkup"
            />
          </div>

          {/* Time Slots */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Available Time Slots
              </label>
              {isLoadingSlots && (
                <span className="text-xs text-blue-500 animate-pulse">
                  (Loading...)
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {!formData.AppointmentDate || !formData.DoctorId ? (
                <div className="col-span-full text-sm text-slate-400 italic p-2 border border-dashed border-slate-200 rounded-lg text-center">
                  Select Doctor & Date to view slots.
                </div>
              ) : availableSlots.length === 0 && !isLoadingSlots ? (
                <div className="col-span-full text-sm text-red-400 italic p-2 border border-dashed border-red-100 bg-red-50 rounded-lg text-center">
                  No slots available.
                </div>
              ) : (
                availableSlots.map((slot, index) => {
                  const isSelected = formData.AppointmentTime === slot.time;
                  return (
                    <button
                      key={index}
                      disabled={slot.isBooked}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          AppointmentTime: slot.time,
                        }))
                      }
                      className={`
                        py-2 px-1 rounded-lg text-xs font-medium border transition relative
                        ${
                          slot.isBooked
                            ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed decoration-slate-300"
                            : isSelected
                            ? "bg-blue-50 border-blue-200 text-blue-600 ring-2 ring-blue-100"
                            : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50"
                        }
                      `}
                    >
                      {slot.formattedTime}
                      {isSelected && !slot.isBooked && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* --- FOOTER ACTIONS --- */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Link
            href="/dashboard/receptionist"
            className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition text-sm"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-sm"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
