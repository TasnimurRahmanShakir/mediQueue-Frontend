import { Search, Calendar, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function DoctorHistory() {
  const history = [
    {
      id: 1,
      name: "Liam Gallagher",
      date: "Aug 20, 2024",
      diagnosis: "Seasonal Allergies",
      status: "Completed",
    },
    {
      id: 2,
      name: "Ava Garcia",
      date: "Aug 19, 2024",
      diagnosis: "Migraine",
      status: "Follow-up Req",
    },
    {
      id: 3,
      name: "Noah Patel",
      date: "Aug 18, 2024",
      diagnosis: "Annual Physical",
      status: "Completed",
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Visit History</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            placeholder="Search history..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
            <tr>
              <th className="p-4">Patient Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Diagnosis</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {history.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 font-medium text-slate-700">
                  {record.name}
                </td>
                <td className="p-4 text-gray-500 flex items-center gap-2">
                  <Calendar size={14} /> {record.date}
                </td>
                <td className="p-4 text-gray-600">{record.diagnosis}</td>
                <td className="p-4">
                  <Badge status={record.status} />
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-blue-600">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
