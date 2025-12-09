export const Input = ({ label, className = "", ...props }) => (
  <div className="flex flex-col gap-1.5 mb-4">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      className={`px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 ${className}`}
      {...props}
    />
  </div>
);
