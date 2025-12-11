import Link from "next/link";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-blue-500">
              Clinic OS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="w-auto! px-6">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              v1.0 Now Live
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              Modern Queue Management <br className="hidden lg:block" />
              <span className="text-blue-600">Simplified.</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Streamline patient flow, reduce wait times, and enhance clinic
              efficiency with our comprehensive role-based management system.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-8 py-4 text-lg h-12">
                  Get Started <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  className="w-full sm:w-auto px-8 py-4 text-lg h-12 text-slate-600 hover:text-blue-600"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1000px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 mix-blend-multiply filter pointer-events-none"></div>
          <div className="absolute top-20 right-0 -z-10 w-[800px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 mix-blend-multiply filter pointer-events-none"></div>
        </div>

        {/* Features Grid */}
        <div id="features" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Everything you need to run your clinic
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Designed for healthcare professionals to manage operations
                seamlessly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <LayoutDashboard size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Role-Based Access
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Dedicated dashboards for Admins, Doctors, and Receptionists
                  with tailored tools and permissions.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Patient Management
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Efficiently register, track, and manage patient queues in
                  real-time to minimize waiting periods.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Real-Time Updates
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Live status tracking for doctors and receptionists to ensure
                  smooth operational flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <ShieldCheck size={20} />
            </div>
            <span className="font-bold text-slate-800">Clinic OS</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} mediQueue. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
