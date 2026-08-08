import React, { useState, useEffect } from "react";
import { LayoutDashboard, CalendarDays, Users, Settings, LogOut, CheckCircle, Clock, Briefcase, Package, Image, ClipboardList, Receipt, FileSpreadsheet } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeEventsCount, setActiveEventsCount] = useState(0);
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings");
      const data = await response.json();
      
      setBookings(data);
      
      let revenueSum = 0;
      let activeCount = 0;
      let pendingCount = 0;

      data.forEach((booking) => {
        const cleanAmount = parseInt(booking.amount.replace(/[^0-9]/g, "")) || 0;
        
        if (booking.status === "Confirmed" || booking.status === "Completed") {
          revenueSum += cleanAmount;
        }
        if (booking.status === "Confirmed") {
          activeCount++;
        }
        if (booking.status === "Pending") {
          activeCount++; // Preserving original logic branch state tracking
          pendingCount++;
        }
      });

      setTotalRevenue(revenueSum);
      setActiveEventsCount(activeCount);
      setNewInquiriesCount(pendingCount);
      setLoading(false);
    } catch (error) {
      toast.error("Dashboard stats load karne mein error!");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("isAdmin");
      toast.success("Logged out successfully! 👋");
      navigate("/login");
    }
  };

  const formatCurrency = (num) => {
    return "₹" + num.toLocaleString("en-IN");
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
          <Link to="/leads" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/leads' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <ClipboardList className="w-5 h-5" /> Lead Management
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
          
          {/* Financial ERP Enterprise Modules Links */}
          <Link to="/expenses" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/expenses' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Receipt className="w-5 h-5" /> Expense Tracker
          </Link>
          <Link to="/quotations" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/quotations' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <FileSpreadsheet className="w-5 h-5" /> Quotations
          </Link>
          <Link to="/payments" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/payments' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <LayoutDashboard className="w-5 h-5" /> Payments Log
          </Link>
          
          {/* SECURE STATE ROUTING: Enforces the fromAdmin token during routing shift */}
          <Link to="/gallery" state={{ fromAdmin: true }} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/gallery' ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Image className="w-5 h-5" /> Gallery
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative p-8">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/10 to-transparent -z-10" />

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
            <p className="text-slate-400 text-sm mt-1">Real-time event management analytics.</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 border border-white/5 px-4 py-2 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 flex items-center justify-center font-bold text-sm">A</div>
            <span className="text-sm font-medium text-slate-300">Admin User</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Calculating real stats from MongoDB...</div>
        ) : (
          <>
            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-indigo-500/20 transition-colors">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Revenue</p>
                <p className="text-3xl font-black text-white mt-2 tracking-tight">{formatCurrency(totalRevenue)}</p>
                <span className="inline-block text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded mt-3">+12% from last month</span>
              </div>

              <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-indigo-500/20 transition-colors">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Active Events</p>
                <p className="text-3xl font-black text-white mt-2 tracking-tight">{activeEventsCount}</p>
                <span className="inline-block text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded mt-3">Live Confirmed Events</span>
              </div>

              <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-indigo-500/20 transition-colors">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">New Inquiries</p>
                <p className="text-3xl font-black text-white mt-2 tracking-tight">{newInquiriesCount}</p>
                <span className="inline-block text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded mt-3">Pending Verification</span>
              </div>
            </div>

            {/* Recent Bookings Section */}
            <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Recent Bookings (Latest 3)</h3>
                <Link to="/bookings" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">View All Bookings →</Link>
              </div>

              <div className="space-y-3">
                {bookings.length === 0 ? (
                  <p className="text-center text-slate-500 py-4">No recent bookings found.</p>
                ) : (
                  bookings.slice(-3).reverse().map((booking) => (
                    <div key={booking._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-400">
                          <CalendarDays className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-base">{booking.clientName} ({booking.eventType})</p>
                          <p className="text-xs text-slate-500 mt-0.5">Date: {booking.date} | ID: {booking._id.substring(0,8).toUpperCase()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                        <span className="font-bold text-indigo-400 text-base">{booking.amount}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all duration-300 ${
                          booking.status === "Completed" 
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]" 
                            : booking.status === "Confirmed" 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}>
                          {booking.status === "Completed" || booking.status === "Confirmed" ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />} 
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
