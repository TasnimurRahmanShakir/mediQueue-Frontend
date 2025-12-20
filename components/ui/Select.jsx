import React from "react";
import { ChevronDown } from "lucide-react";

export const Select = ({
  label,
  options = [],
  placeholder = "Select...",
  className = "",
  error,
  value,
  ...props
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && (
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
        {label}
      </label>
    )}
    <div className="relative">
      <select
        value={value}
        className={`w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm appearance-none text-slate-700 transition-all ${
          !value ? "text-slate-400" : ""
        } ${error ? "border-red-500 focus:border-red-500" : ""} ${className}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => {
          // Handle both object {label, value} and string/number options
          const optValue = typeof opt === "object" ? opt.value : opt;
          const optLabel = typeof opt === "object" ? opt.label : opt;
          return (
            <option key={optValue} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        size={16}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
  </div>
);
