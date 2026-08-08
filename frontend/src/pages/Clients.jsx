import React, { useState, useEffect } from "react";
import { LayoutDashboard, CalendarDays, Users, Settings, LogOut, Mail, IndianRupee, UserCheck, Briefcase, Package } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings");
      const data = await response.json();

      const clientMap = {};
      data.forEach((booking) => {
        const name = booking.clientName;
        const cleanAmount = parseInt(booking.amount.replace(/[^0-9]/g, "")) || 0;
        
        if (!clientMap[name]) {
          clientMap[name] = {
            name: name,
            email: `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}@example.com`,
            totalEvents: 0,
            totalSpent: 0,
          };
        }
        
        clientMap[name].totalEvents += 1;
        if (booking.status === "Confirmed" || booking.status === "Completed") {
          clientMap[name].totalSpent += cleanAmount;
        }
      });

      setClients(Object.values(clientMap));
      setLoading(false);
    } catch (error) {
      toast.error("Clients data load karne mein error!");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isAuth");
      toast.success("Logged out successfully! 👋");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col z-20 shadow-2xl">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400">
            ELITE ERP
          </h2>
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
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative p-8">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/10 to-transparent -z-10" />

        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients Directory</h1>
            <p className="text-slate-400 text-sm mt-1">Manage unique customer profiles and business intelligence.</p>
          </div>
        </header>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Fetching clients registry...</div>
        ) : clients.length === 0 ? (
          <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 text-center text-slate-500">No clients found. Add bookings to generate profiles automatically!</div>
        ) : (
          /* Clients Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="bg-slate-900 border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{client.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3" /> {client.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-sm">
                  <div>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Events</p>
                    <p className="text-white font-bold mt-1 flex items-center gap-1"><UserCheck className="w-4 h-4 text-emerald-400" /> {client.totalEvents} Bookings</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Business</p>
                    <p className="text-indigo-400 font-black mt-1 flex items-center gap-0.5"><IndianRupee className="w-3.5 h-3.5" />{client.totalSpent.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
