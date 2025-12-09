import { Bell, Search } from "lucide-react";

export const Header = ({ title, userInitial = "A" }) => (
  <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>

    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
        <Search size={18} className="text-gray-400" />
        <input
          placeholder="Search..."
          className="bg-transparent border-none focus:outline-none text-sm w-48"
        />
      </div>

      <button className="relative p-2 text-slate-600 hover:bg-gray-100 rounded-full transition-colors">
        <Bell size={20} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold shadow-md ring-2 ring-white">
        {userInitial}
      </div>
    </div>
  </header>
);
