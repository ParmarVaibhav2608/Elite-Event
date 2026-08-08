import React, { useState, useEffect } from "react";
import { LayoutDashboard, CalendarDays, Users, Settings, LogOut, X, Briefcase, Trash2, UserPlus, Package } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Staff() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", salary: "", advancePaid: 0, currentTask: "No task" });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { fetchStaff(); }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/staff");
      const data = await response.json();
      setStaffList(data);
      setLoading(false);
    } catch (error) {
      toast.error("Data load failed!");
      setLoading(false);
    }
  };

  const handleAddWorker = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        salary: Number(formData.salary),
        advancePaid: Number(formData.advancePaid || 0)
      };
      const response = await fetch("http://localhost:5000/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Server error");
      const newWorker = await response.json();
      setStaffList([...staffList, newWorker]);
      setFormData({ name: "", role: "", salary: "", advancePaid: 0, currentTask: "No task" });
      setIsModalOpen(false);
      toast.success("Worker added! 👷");
    } catch (error) {
      toast.error("Worker add nahi ho paya!");
    }
  };

  const handleUpdateStaff = async (id, field, value) => {
    try {
      const response = await fetch(`http://localhost:5000/api/staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value })
      });
      const updated = await response.json();
      setStaffList(staffList.map((w) => w._id === id ? updated : w));
    } catch (error) { toast.error("Update failed!"); }
  };

  const handleDeleteWorker = async (id) => {
    if (window.confirm("Remove this worker?")) {
      try {
        await fetch(`http://localhost:5000/api/staff/${id}`, { method: "DELETE" });
        setStaffList(staffList.filter((w) => w._id !== id));
        toast.success("Worker removed.");
      } catch (error) { toast.error("Delete failed!"); }
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
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between mb-8">
          <div><h1 className="text-3xl font-bold">Staff Engine</h1></div>
          <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2"><UserPlus className="w-5 h-5" /> Add Worker</button>
        </header>

        <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950/50 uppercase font-bold text-xs text-slate-300">
              <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Task</th><th className="px-6 py-4">Salary</th><th className="px-6 py-4">Advance</th><th className="px-6 py-4">Net</th><th className="px-6 py-4 text-center">Action</th></tr>
            </thead>
            <tbody>
              {staffList.map((w) => (
                <tr key={w._id} className="border-b border-white/5">
                  <td className="px-6 py-4 font-bold text-white">{w.name}</td>
                  <td className="px-6 py-4">{w.role}</td>
                  <td className="px-6 py-4"><input type="text" defaultValue={w.currentTask} onBlur={(e) => handleUpdateStaff(w._id, "currentTask", e.target.value)} className="bg-slate-950 border border-white/10 rounded px-2 py-1 w-full" /></td>
                  <td className="px-6 py-4">₹{w.salary}</td>
                  <td className="px-6 py-4"><input type="number" defaultValue={w.advancePaid} onBlur={(e) => handleUpdateStaff(w._id, "advancePaid", Number(e.target.value))} className="bg-slate-950 border border-white/10 rounded px-2 py-1 w-20" /></td>
                  <td className="px-6 py-4 font-bold text-emerald-400">₹{w.salary - w.advancePaid}</td>
                  <td className="px-6 py-4 text-center"><button onClick={() => handleDeleteWorker(w._id)} className="text-rose-500"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between mb-4"><h3 className="text-xl font-bold">Onboard Worker</h3><button onClick={() => setIsModalOpen(false)}><X /></button></div>
            <form onSubmit={handleAddWorker} className="space-y-4">
              <input type="text" placeholder="Name" required className="w-full bg-slate-950 border p-3 rounded" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input type="text" placeholder="Role (e.g. Driver)" required className="w-full bg-slate-950 border p-3 rounded" onChange={(e) => setFormData({...formData, role: e.target.value})} />
              <input type="number" placeholder="Salary" required className="w-full bg-slate-950 border p-3 rounded" onChange={(e) => setFormData({...formData, salary: e.target.value})} />
              <button type="submit" className="w-full bg-indigo-600 p-3 rounded font-bold">Save Worker</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
