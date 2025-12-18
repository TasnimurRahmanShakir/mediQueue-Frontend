"use client";

import React, { useState, useEffect } from "react";
import { Eye, Edit2, Trash2, Search, Plus, Filter } from "lucide-react";
import EditModal from "@/components/ui/EditModal";
import StatusBadge from "@/components/ui/Badge";
import { getUsers, searchUsers } from "@/app/actions/userAction";
import { useDebounce } from "@/app/hooks/useDebounce";
import Link from "next/link";
import { deleteUser } from "@/app/actions/userAction";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function loadUsers() {
      if (debouncedSearchTerm) {
        const data = await searchUsers(debouncedSearchTerm);
        setUsers(data);
      } else {
        const data = await getUsers();
        setUsers(data);
      }
    }
    loadUsers();
  }, [debouncedSearchTerm]);

  const handleDeleteUser = async (userId) => {
    console.log("userId", userId);
    await deleteUser(userId);
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  // Configuration for the Dynamic Modal
  const userFormFields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: ["Doctor", "Nurse", "Admin", "Receptionist"],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Offline", "Suspended"],
    },
  ];

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
      );
    } else {
      const newUser = { ...formData, id: Date.now().toString() };
      setUsers((prev) => [...prev, newUser]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users by Email, phone, name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition shadow-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition shadow-sm">
            <Filter size={18} className="mr-2" /> Filter
          </button>
          <Link
            href="/dashboard/admin/users/registration"
            className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition shadow-sm shadow-blue-200"
          >
            <Plus size={18} className="mr-2" /> Add User
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge label={user.role} />
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-sm">
                    {user.email}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge type="status" label={user.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2  group-hover:scale-105 transition-all">
                      <Link
                        href={`/dashboard/admin/users/${user.id}`}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/dashboard/admin/users/${user.id}?edit=true`}
                        className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <p>Showing 1-4 of 4 results</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              Prev
            </button>
            <button
              className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Reusable Modal */}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Edit User" : "Add New User"}
        fields={userFormFields}
        initialData={editingUser || {}}
        onSubmit={handleSave}
      />
    </div>
  );
}
