import React from "react";

export const Input = ({
  label,
  icon: Icon,
  className = "",
  error,
  ...props
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && (
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={18}
        />
      )}
      <input
        className={`w-full ${
          Icon ? "pl-10" : "pl-3"
        } pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-700 placeholder:text-slate-400 transition-all ${
          error ? "border-red-500 focus:border-red-500" : ""
        } ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
  </div>
);
