"use client";
import { Download, Plus, DollarSign, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Local Badge for specific billing statuses if not in main Badge component
const BillingBadge = ({ status }) => {
  const styles = {
    Paid: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
    Overdue: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default function BillingPage() {
  const invoices = [
    {
      id: "INV-2024-001",
      patient: "Liam Johnson",
      date: "Aug 24, 2024",
      amount: "$150.00",
      status: "Paid",
    },
    {
      id: "INV-2024-002",
      patient: "Noah Williams",
      date: "Aug 23, 2024",
      amount: "$320.00",
      status: "Pending",
    },
    {
      id: "INV-2024-003",
      patient: "Emma Brown",
      date: "Aug 22, 2024",
      amount: "$85.00",
      status: "Overdue",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Billing & Invoices
          </h1>
          <p className="text-sm text-gray-500">
            Manage payments and financial records.
          </p>
        </div>
        <Button className="px-6">
          <Plus size={18} /> Create Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4 border-l-4 border-l-blue-500">
          <div className="p-3 rounded-full bg-blue-50 text-blue-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">
              Total Income
            </p>
            <h3 className="text-xl font-bold text-slate-800">$12,450</h3>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-l-4 border-l-orange-500">
          <div className="p-3 rounded-full bg-orange-50 text-orange-600">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">
              Pending Bills
            </p>
            <h3 className="text-xl font-bold text-slate-800">$1,280</h3>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Invoice ID
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Patient
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Amount
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm font-medium text-gray-700">
                  {inv.id}
                </td>
                <td className="p-4 text-sm font-medium text-gray-900">
                  {inv.patient}
                </td>
                <td className="p-4 text-sm text-gray-500">{inv.date}</td>
                <td className="p-4 text-sm font-bold text-slate-800">
                  {inv.amount}
                </td>
                <td className="p-4">
                  <BillingBadge status={inv.status} />
                </td>
                <td className="p-4 text-right">
                  <button
                    className="text-gray-400 hover:text-blue-600 p-2 rounded hover:bg-blue-50 transition-all"
                    title="Download Invoice"
                  >
                    <Download size={18} />
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
