"use client";

import React, { useActionState } from "react";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

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

        {state?.error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            disabled={isPending}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in..." : "Login"}
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
