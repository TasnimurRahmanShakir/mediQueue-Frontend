"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Quick-fill helper for testing
  const [formData, setFormData] = useState({
    email: "admin@hospital.com",
    password: "123",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      router.push(`/${data.role}`);
      router.refresh();
    } else {
      alert("Invalid Creds! Try admin@hospital.com / 123");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <ShieldCheck size={28} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Clinic OS</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        {/* Role Hints for Demo */}
        <div className="mt-6 p-4 bg-gray-50 rounded text-xs text-gray-500 space-y-1">
          <p>
            <strong>Admin:</strong> admin@hospital.com / 123
          </p>
          <p>
            <strong>Doctor:</strong> doc@hospital.com / 123
          </p>
          <p>
            <strong>Reception:</strong> desk@hospital.com / 123
          </p>
        </div>
      </div>
    </div>
  );
}
