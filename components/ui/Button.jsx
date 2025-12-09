export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "w-full py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20",
    outline: "border border-blue-500 text-blue-600 hover:bg-blue-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost: "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
