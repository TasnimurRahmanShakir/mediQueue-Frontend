export const Badge = ({ status, className = "" }) => {
  const styles = {
    // Standard statuses
    Active: "bg-green-50 text-green-700 border-green-200",
    Inactive: "bg-gray-100 text-gray-600 border-gray-200",

    // Appointment statuses (From Image)
    Waiting: "bg-blue-50 text-blue-600 border-blue-100",
    Completed: "bg-green-50 text-green-600 border-green-100",
    "In Progress": "bg-yellow-50 text-yellow-700 border-yellow-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  // Fallback to gray if status not found
  const activeStyle = styles[status] || styles.Inactive;

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${activeStyle} ${className}`}
    >
      {status}
    </span>
  );
};
