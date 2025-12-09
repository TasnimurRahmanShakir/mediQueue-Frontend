"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarLink = ({
  href,
  icon: Icon,
  label,
  baseColor = "bg-blue-600",
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? `${baseColor} text-white shadow-lg shadow-blue-900/20`
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};
