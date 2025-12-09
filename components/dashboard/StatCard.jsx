import { Card } from "@/components/ui/Card";

export const StatCard = ({ icon: Icon, label, value, color }) => (
  <Card className="flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-full ${color} bg-opacity-10`}>
      <Icon size={24} className={color.replace("bg-", "text-")} />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </Card>
);
