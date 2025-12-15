const styles = {
  Doctor: "bg-blue-50 text-blue-700 border-blue-100",
  Nurse: "bg-purple-50 text-purple-700 border-purple-100",
  Admin: "bg-orange-50 text-orange-700 border-orange-100",
  Receptionist: "bg-teal-50 text-teal-700 border-teal-100",
  Active: "bg-green-100 text-green-700",
  Offline: "bg-slate-100 text-slate-600",
  Suspended: "bg-red-100 text-red-600",
  Default: "bg-gray-50 text-gray-700",
};

export default function Badge({ type, label }) {
  const style = styles[label] || styles.Default;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent ${style}`}
    >
      {type === "status" && (
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            label === "Active" ? "bg-green-500" : "bg-slate-400"
          }`}
        ></span>
      )}
      {label}
    </span>
  );
}
