import React, { useState, useEffect } from "react";
import { LayoutDashboard, CalendarDays, Users, Settings, LogOut, Package, Plus, X, Briefcase } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import toast from "react-hot-toast";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ itemName: "", totalStock: "", onSite: 0, faulty: 0 });

  const navigate = useNavigate();
  const location = useLocation(); 
  
  useEffect(() => { fetchInventory(); }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/inventory");
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (error) { toast.error("Data load failed!"); setLoading(false); }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const newItem = await response.json();
      setItems([...items, newItem]);
      setIsModalOpen(false);
      setFormData({ itemName: "", totalStock: "", onSite: 0, faulty: 0 });
      toast.success("Item added to inventory! 📦");
    } catch (error) { toast.error("Failed!"); }
  };

  const handleUpdate = async (id, field, value) => {
    try {
      await fetch(`http://localhost:5000/api/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: Number(value) })
      });
      fetchInventory(); 
    } catch (error) { toast.error("Update failed!"); }
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
        <header className="flex justify-between items-center mb-8">
          <div><h1 className="text-3xl font-bold">Inventory Control</h1><p className="text-slate-400 text-sm">Track your LED, Sound & Event Gear.</p></div>
          <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus className="w-5 h-5" /> Add Item</button>
        </header>

        <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950/50 uppercase font-bold text-xs text-slate-300">
              <tr><th className="px-6 py-4">Item</th><th className="px-6 py-4">Total</th><th className="px-6 py-4">On-Site</th><th className="px-6 py-4">Faulty</th><th className="px-6 py-4">Available</th></tr>
            </thead>
            <tbody>
              {items.map((i) => {
                const available = i.totalStock - (i.onSite + i.faulty);
                return (
                  <tr key={i._id} className="border-b border-white/5">
                    <td className="px-6 py-4 font-bold text-white">{i.itemName}</td>
                    <td className="px-6 py-4">{i.totalStock}</td>
                    <td className="px-6 py-4"><input type="number" defaultValue={i.onSite} onBlur={(e) => handleUpdate(i._id, "onSite", e.target.value)} className="bg-slate-950 border border-white/10 rounded w-16 p-1" /></td>
                    <td className="px-6 py-4"><input type="number" defaultValue={i.faulty} onBlur={(e) => handleUpdate(i._id, "faulty", e.target.value)} className="bg-slate-950 border border-white/10 rounded w-16 p-1" /></td>
                    <td className={`px-6 py-4 font-black ${available < 5 ? "text-rose-500" : "text-emerald-400"}`}>{available}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm p-6">
            <div className="flex justify-between mb-4"><h3 className="text-xl font-bold">New Inventory Item</h3><button onClick={() => setIsModalOpen(false)}><X /></button></div>
            <form onSubmit={handleAddItem} className="space-y-4">
              <input type="text" placeholder="Item Name (e.g. LED P3)" required className="w-full bg-slate-950 border p-3 rounded" onChange={(e) => setFormData({...formData, itemName: e.target.value})} />
              <input type="number" placeholder="Total Stock" required className="w-full bg-slate-950 border p-3 rounded" onChange={(e) => setFormData({...formData, totalStock: e.target.value})} />
              <button type="submit" className="w-full bg-indigo-600 p-3 rounded font-bold">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
