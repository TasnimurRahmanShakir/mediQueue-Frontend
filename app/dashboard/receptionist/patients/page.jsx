"use client";
import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

export default function PatientsPage() {
  const patients = [
    {
      id: "P-001",
      name: "Liam Johnson",
      age: 24,
      phone: "+1 (555) 012-3456",
      lastVisit: "Aug 20, 2024",
      status: "Active",
    },
    {
      id: "P-002",
      name: "Olivia Smith",
      age: 31,
      phone: "+1 (555) 987-6543",
      lastVisit: "Aug 18, 2024",
      status: "Active",
    },
    {
      id: "P-003",
      name: "Noah Williams",
      age: 45,
      phone: "+1 (555) 456-7890",
      lastVisit: "Jul 12, 2024",
      status: "Inactive",
    },
    {
      id: "P-004",
      name: "Emma Brown",
      age: 28,
      phone: "+1 (555) 234-5678",
      lastVisit: "Aug 21, 2024",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Patient Records</h1>
          <p className="text-sm text-gray-500">
            Manage patient data and history.
          </p>
        </div>
        <Button className="w-full md:w-auto px-6">
          <Plus size={18} /> Register Patient
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              placeholder="Search by name, phone, or ID..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <Button
            variant="outline"
            className="w-full md:w-auto px-4 border-gray-200 text-gray-600 bg-white"
          >
            <Filter size={16} /> Filter
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">ID</th>
                <th className="p-4 border-b">Patient Name</th>
                <th className="p-4 border-b">Age</th>
                <th className="p-4 border-b">Phone</th>
                <th className="p-4 border-b">Last Visit</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  <td className="p-4 text-sm font-medium text-blue-600">
                    {patient.id}
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-800">
                    {patient.name}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{patient.age}</td>
                  <td className="p-4 text-sm text-gray-600">{patient.phone}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {patient.lastVisit}
                  </td>
                  <td className="p-4">
                    <Badge status={patient.status} />
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
