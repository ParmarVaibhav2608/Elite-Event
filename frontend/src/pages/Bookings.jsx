import React, { useState, useEffect } from "react";
import { LayoutDashboard, CalendarDays, Users, Settings, LogOut, Search, CheckCircle, Clock, Plus, X, Trash2, CheckSquare, Briefcase, Package } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ clientName: "", eventType: "", date: "", amount: "" });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings");
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      toast.error("Database connection failed!");
      setLoading(false);
    }
  };

  const handleAddBooking = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const newBooking = await response.json();
      setBookings([...bookings, newBooking]);
      setFormData({ clientName: "", eventType: "", date: "", amount: "" });
      setIsModalOpen(false);
      
      toast.success("New booking added successfully! 🎉");
    } catch (error) {
      toast.error("Failed to save booking!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await fetch(`http://localhost:5000/api/bookings/${id}`, { method: "DELETE" });
        setBookings(bookings.filter((booking) => booking._id !== id));
        
        toast.success("Booking deleted forever! 🗑️");
      } catch (error) {
        toast.error("Could not delete booking.");
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    let newStatus = "Pending";
    if (currentStatus === "Pending") newStatus = "Confirmed";
    else if (currentStatus === "Confirmed") newStatus = "Completed";
    else newStatus = "Pending";
    
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const updatedBooking = await response.json();
      setBookings(bookings.map((booking) => booking._id === id ? updatedBooking : booking));
      
      toast.success(`Status changed to ${newStatus}! ✅`);
    } catch (error) {
      toast.error("Status update failed!");
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/10 to-transparent -z-10" />
        
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 sticky top-0 z-10 backdrop-blur-md bg-slate-950/60">
          <h1 className="text-2xl font-bold tracking-tight">All Bookings</h1>
          <div className="flex items-center gap-4">
            
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search by client or event..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-64 transition-all" 
              />
            </div>

            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-indigo-500/20">
              <Plus className="w-5 h-5" /> Add Booking
            </button>
          </div>
        </header>

        <div className="p-8">
          <div className="bg-slate-900 border border-white/5 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-950/50 text-slate-300 uppercase font-bold text-xs border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4">Booking ID</th>
                    <th className="px-6 py-4">Client Name</th>
                    <th className="px-6 py-4">Event Type</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="7" className="px-6 py-8 text-center text-slate-500">Loading real data from MongoDB...</td></tr>
                  ) : (
                    (() => {
                      const filteredBookings = bookings.filter((booking) => 
                        booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        booking.eventType.toLowerCase().includes(searchTerm.toLowerCase())
                      );

                      return filteredBookings.length === 0 ? (
                        <tr><td colSpan="7" className="px-6 py-8 text-center text-slate-500">No matching bookings found!</td></tr>
                      ) : (
                        filteredBookings.map((booking) => (
                          <tr key={booking._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-500 text-xs">{booking._id.substring(0, 8).toUpperCase()}</td>
                            <td className="px-6 py-4 font-bold text-white">{booking.clientName}</td>
                            <td className="px-6 py-4">{booking.eventType}</td>
                            <td className="px-6 py-4">{booking.date}</td>
                            <td className="px-6 py-4 font-bold text-indigo-400">{booking.amount}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all duration-300 ${booking.status === "Completed" ? "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]" : booking.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                                {booking.status === "Completed" || booking.status === "Confirmed" ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />} {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 flex items-center justify-center gap-2">
                              <button onClick={() => handleToggleStatus(booking._id, booking.status)} className="p-2 hover:bg-emerald-500/10 rounded-lg transition-colors text-slate-500 hover:text-emerald-400" title="Change Status"><CheckSquare className="w-5 h-5" /></button>
                              <button onClick={() => handleDelete(booking._id)} className="p-2 hover:bg-rose-500/10 rounded-lg transition-colors text-slate-500 hover:text-rose-500" title="Delete Booking"><Trash2 className="w-5 h-5" /></button>
                            </td>
                          </tr>
                        ))
                      );
                    })()
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-slate-950/50">
              <h3 className="text-xl font-bold text-white">Create New Booking</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleAddBooking} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Client Name</label>
                <input type="text" required value={formData.clientName} onChange={(e) => setFormData({...formData, clientName: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none" placeholder="E.g. Amit & Priya" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Event Type</label>
                <select required value={formData.eventType} onChange={(e) => setFormData({...formData, eventType: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none">
                  <option value="" disabled>Select event type...</option>
                  <option value="Royal Wedding">Royal Wedding</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Custom Theme">Custom Theme</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Event Date</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Amount (₹)</label>
                  <input type="text" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none" placeholder="E.g. ₹2,50,000" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold py-3 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">Save Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
