import React from "react";
import { LayoutDashboard, CalendarDays, Users, Settings as SettingsIcon, LogOut, Package, Briefcase, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isAuth");
      toast.success("Logged out successfully! 👋");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white font-sans overflow-hidden">
      {/* Sidebar - Same Master Structure */}
      <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400">ELITE ERP</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/dashboard' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/bookings" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/bookings' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <CalendarDays className="w-5 h-5" /> Bookings
          </Link>
          <Link to="/clients" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/clients' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Users className="w-5 h-5" /> Clients
          </Link>
          <Link to="/staff" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/staff' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Briefcase className="w-5 h-5" /> Staff/Payroll
          </Link>
          <Link to="/inventory" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/inventory' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Package className="w-5 h-5" /> Inventory
          </Link>
          <Link to="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/settings' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <SettingsIcon className="w-5 h-5" /> Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-slate-400 text-sm">Manage your profile and ERP preferences.</p>
        </header>

        <div className="max-w-2xl bg-slate-900 border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><User className="w-5 h-5" /> Profile Settings</h3>
          <p className="text-slate-400 text-sm">Feature coming soon! Yahan aap apna admin profile update kar paoge.</p>
        </div>
      </main>
    </div>
  );
}
