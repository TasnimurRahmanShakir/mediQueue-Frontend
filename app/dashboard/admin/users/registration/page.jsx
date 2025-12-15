"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  Lock,
  Stethoscope,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  FileText,
  DollarSign,
} from "lucide-react";
import { FormInput, FormSelect, ImageUpload } from "@/components/ui/forms";
import { createUser } from "@/app/actions/userAction";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      role: "Admin",
    },
  });

  const selectedRole = watch("Role");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. Recreate FormData (Vital for Node.js file upload to work)
      const formData = new FormData();

      // --- FIX: Use Capital Keys to match your Input Names ---
      formData.append("Name", data.Name); // matches name="Name"
      formData.append("Email", data.Email); // matches name="Email"
      formData.append("PhoneNumber", data.PhoneNumber); // matches name="PhoneNumber"
      formData.append("Password", data.Password); // matches name="Password"
      formData.append("Role", data.Role); // matches name="Role"

      // 2. Handle Image
      // Ensure we check the correct key 'Image' (Capital I)
      if (data.Image && data.Image[0]) {
        formData.append("Image", data.Image[0]);
      }

      // 3. Handle Role Specifics
      if (data.Role === "Doctor") {
        formData.append("Specialization", data.Specialization);
        formData.append("LicenseNumber", data.LicenseNumber);
        formData.append("ConsultationFee", data.ConsultationFee);
      } else if (data.Role === "Receptionist") {
        formData.append("ShiftTime", data.ShiftTime);
      }

      // Call Server Action
      const result = await createUser(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: `Successfully registered ${data.Role}: ${data.Name}`,
        });
        reset();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setMessage({
        type: "error",
        text: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Register New User
            </h1>
            <p className="text-gray-500">
              Create accounts for Doctors, Receptionists, or Patients.
            </p>
          </div>
        </div>

        {/* Message Banner */}
        {message.text && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 border animate-in fade-in slide-in-from-top-2 ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <p className="font-medium">{message.text}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Section 1: Basic Information */}
          <div className="p-8 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
              <Shield size={20} className="text-blue-600" />
              Account Verification & Basic Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                name="Name"
                icon={User}
                register={register}
                error={errors.name}
                validation={{ required: "Name is required" }}
              />
              <FormInput
                label="Email Address"
                name="Email"
                type="email"
                icon={Mail}
                register={register}
                error={errors.email}
                validation={{ required: "Email is required" }}
              />
              <FormInput
                label="Phone Number"
                name="PhoneNumber"
                icon={Phone}
                register={register}
                error={errors.phoneNumber}
                validation={{ required: "Phone number is required" }}
              />
              <FormSelect
                label="Role"
                name="Role"
                register={register}
                error={errors.role}
                options={[
                  { value: "Doctor", label: "Doctor" },
                  { value: "Receptionist", label: "Receptionist" },
                  { value: "Admin", label: "Admin" },
                ]}
              />
              <FormInput
                label="Password"
                name="Password"
                type="password"
                icon={Lock}
                register={register}
                error={errors.password}
                validation={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
              />
              <ImageUpload
                label="Profile Photo"
                name="Image"
                register={register}
              />
            </div>
          </div>

          {/* Section 2: Role Specific Details */}
          {(selectedRole === "Doctor" || selectedRole === "Receptionist") && (
            <div className="p-8 bg-gray-50/50 border-t border-gray-100 space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-4">
                {selectedRole === "Doctor" ? (
                  <Stethoscope size={20} className="text-purple-600" />
                ) : (
                  <Clock size={20} className="text-orange-600" />
                )}
                {selectedRole} Specific Details
              </h2>

              {selectedRole === "Doctor" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormSelect
                    label="Specialization"
                    name="Specialization"
                    register={register}
                    error={errors.specialization}
                    validation={{ required: "Specialization is required" }}
                    options={[
                      { value: "General", label: "General Medicine" },
                      { value: "Cardiology", label: "Cardiology" },
                      { value: "Pediatrics", label: "Pediatrics" },
                      { value: "Neurology", label: "Neurology" },
                      { value: "Dermatology", label: "Dermatology" },
                      { value: "Orthopedics", label: "Orthopedics" },
                    ]}
                  />
                  <FormInput
                    label="License Number"
                    name="LicenseNumber"
                    placeholder="MD-XXXXX"
                    icon={FileText}
                    register={register}
                    error={errors.licenseNumber}
                    validation={{ required: "License Number is required" }}
                  />
                  <FormInput
                    label="Consultation Fee"
                    name="ConsultationFee"
                    type="number"
                    placeholder="0.00"
                    icon={DollarSign}
                    register={register}
                    error={errors.consultationFee}
                    validation={{ required: "Consultation Fee is required" }}
                  />
                </div>
              )}

              {selectedRole === "Receptionist" && (
                <div className="max-w-md">
                  <FormSelect
                    label="Shift Time"
                    name="ShiftTime"
                    register={register}
                    error={errors.shiftTime}
                    validation={{ required: "Shift time is required" }}
                    options={[
                      { value: "Morning", label: "Morning (8AM - 4PM)" },
                      { value: "Evening", label: "Evening (4PM - 12AM)" },
                      { value: "Night", label: "Night (12AM - 8AM)" },
                    ]}
                  />
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center shadow-lg shadow-blue-200"
            >
              {isSubmitting ? "Processing..." : `Register New ${selectedRole}`}
              {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
