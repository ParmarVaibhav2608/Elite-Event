import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Users, Settings, LogOut, Briefcase, Package, Image, ClipboardList, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const isAuth = localStorage.getItem("isAuth") === "true";
    
    if (!isAdmin && !isAuth) {
      toast.error("Access Denied: Admin session missing!");
      navigate("/login");
      return;
    }
    fetchLeads();
  }, [navigate]);

  const fetchLeads = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/leads");
      if (!response.ok) {
        // Fallback gracefully without throwing a system crash trigger
        setLeads([]);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Silent fallback registry handling:", error);
      setLeads([]); // Assign empty safe list array layout
    } finally {
      setLoading(false);
    }
  };

  // THE MASTERSTROKE CONVERSION LOGIC
  const handleConvert = async (lead) => {
    try {
      const bookingResponse = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: lead.clientName,
          contact: lead.phone,
          date: lead.eventDate,
          venue: lead.notes || "Venue details inside notes",
          eventType: lead.eventType,
          amount: "Pending",
          status: "Confirmed"
        })
      });

      if (bookingResponse.ok) {
        await fetch(`http://localhost:5000/api/leads/${lead._id}`, { method: 'DELETE' });
        toast.success(`Wow! ${lead.clientName} transformed into Active Booking! 🚀`);
        fetchLeads();
      } else {
        toast.error("Failed to generate structural booking row.");
      }
    } catch (error) {
      toast.error("Automation conversion process failed.");
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

      {/* Main Panel Workspace */}
      <main className="flex-1 overflow-y-auto relative p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Inbound Leads Registry</h1>
          <p className="text-slate-400 text-sm mt-1">Convert front-end website user queries into actual bookings in one click.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading pipelines...</div>
        ) : (
          <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 shadow-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-sm">
                  <th className="pb-3 font-semibold">Client Details</th>
                  <th className="pb-3 font-semibold">Event Type</th>
                  <th className="pb-3 font-semibold">Event Date</th>
                  <th className="pb-3 font-semibold">Address/Notes</th>
                  <th className="pb-3 font-semibold text-right">Action Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-slate-500 py-8">No live website queries waiting inside database collection.</td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id} className="text-sm hover:bg-white/[0.01] transition-colors">
                      <td className="py-4">
                        <div className="font-bold text-white">{lead.clientName}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{lead.phone} | {lead.email}</div>
                      </td>
                      <td className="py-4 text-indigo-400 font-medium">{lead.eventType}</td>
                      <td className="py-4 text-slate-400">{lead.eventDate}</td>
                      <td className="py-4 text-slate-300 max-w-xs truncate">{lead.notes || "-"}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleConvert(lead)} 
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 ml-auto transition-colors shadow-md"
                        >
                          <CheckCircle size={14} /> Convert to Booking
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
