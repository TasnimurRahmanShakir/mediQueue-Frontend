"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// --- 1. Reusable Text Input with Icon ---
export const FormInput = ({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  register,
  name,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Icon size={18} />
          </div>
        )}

        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full bg-white border rounded-lg py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
            Icon ? "pl-10" : "pl-4"
          } ${error ? "border-red-500" : "border-gray-200"}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};

// --- 2. Reusable Select Dropdown ---
export const FormSelect = ({
  label,
  options,
  register,
  name,
  error,
  placeholder = "Select...",
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        {...register(name)}
        className={`w-full bg-white border rounded-lg py-2.5 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};

// --- 3. Reusable Image Upload ---
export const ImageUpload = ({ label, register, name }) => {
  return (
    <div className="border border-dashed border-gray-300 rounded-xl p-4 flex items-center gap-6 bg-gray-50/50">
      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-400 text-xl font-bold">
        Img
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
        <p className="text-xs text-gray-500">JPG or PNG, max 2MB</p>
      </div>
      <label className="cursor-pointer px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition text-sm font-medium text-gray-700">
        Browse
        <input
          type="file"
          className="hidden"
          accept="image/*"
          {...register(name)}
        />
      </label>
    </div>
  );
};
