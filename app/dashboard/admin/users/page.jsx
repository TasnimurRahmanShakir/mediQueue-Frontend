import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Plus, MoreVertical } from "lucide-react";

export default function UsersPage() {
  const users = [
    { id: 1, name: "Dr. Smith", role: "Doctor", status: "Active" },
    { id: 2, name: "Jane Doe", role: "Receptionist", status: "Active" },
    { id: 3, name: "Bob Wilson", role: "Doctor", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
        <Button className="w-auto px-6">
          <Plus size={18} /> Add User
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Role</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-gray-50 transition-colors border-b last:border-0"
              >
                <td className="p-4 font-medium text-gray-800">{u.name}</td>
                <td className="p-4 text-gray-600">{u.role}</td>
                <td className="p-4">
                  <Badge status={u.status} />
                </td>
                <td className="p-4 text-right">
                  <button className="text-gray-400 hover:text-blue-600">
                    <MoreVertical size={18} />
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
