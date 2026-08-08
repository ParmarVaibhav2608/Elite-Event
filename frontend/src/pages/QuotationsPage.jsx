import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Calendar, Users, Package, Image, Settings, Receipt, Plus, Trash2, IndianRupee, FileSpreadsheet } from "lucide-react";
import toast from "react-hot-toast";

export default function QuotationsPage() {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields State
  const [clientName, setClientName] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [basePrice, setBasePrice] = useState("");
  const [decorationCost, setDecorationCost] = useState("");
  const [cateringCost, setCateringCost] = useState("");
  const [status, setStatus] = useState("Draft");

  const fetchQuotations = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/quotations");
      const data = await response.json();
      if (response.ok) {
        setQuotations(data);
      } else {
        toast.error("Error fetching quotations data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Database tracking connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleAddQuotation = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !basePrice.trim()) {
      toast.error("Client Name aur Base Price compulsory hai bhai!");
      return;
    }

    const base = Number(basePrice) || 0;
    const deco = Number(decorationCost) || 0;
    const cate = Number(cateringCost) || 0;
    const totalAmount = base + deco + cate;

    try {
      const response = await fetch("http://localhost:5000/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          eventType,
          basePrice: base,
          decorationCost: deco,
          cateringCost: cate,
          totalAmount,
          status
        }),
      });
      if (response.ok) {
        toast.success("Quotation Estimate Saved Successfully!");
        setClientName("");
        setBasePrice("");
        setDecorationCost("");
        setCateringCost("");
        fetchQuotations();
      } else {
        toast.error("Quotation injection logic failure");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server synchronization mismatch");
    }
  };

  const handleDeleteQuotation = async (id) => {
    if (!window.confirm("Kya aap sach me ye quotation delete karna chahte hain?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/quotations/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Quotation deleted cleanly");
        fetchQuotations();
      } else {
        toast.error("Scrubbing document failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network interface connection error");
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/dashboard" },
    { name: "Lead Management", icon: <FileText className="w-5 h-5" />, path: "/leads" },
    { name: "Bookings", icon: <Calendar className="w-5 h-5" />, path: "/bookings" },
    { name: "Clients", icon: <Users className="w-5 h-5" />, path: "/clients" },
    { name: "Staff/Payroll", icon: <Users className="w-5 h-5" />, path: "/staff" },
    { name: "Inventory", icon: <Package className="w-5 h-5" />, path: "/inventory" },
    { name: "Expense Tracker", icon: <Receipt className="w-5 h-5" />, path: "/expenses" },
    { name: "Quotations", icon: <FileSpreadsheet className="w-5 h-5" />, path: "/quotations", active: true },
    { name: "Payments Log", icon: <IndianRupee className="w-5 h-5" />, path: "/payments" },
    { name: "Gallery", icon: <Image className="w-5 h-5" />, path: "/gallery" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <aside className="w-64 bg-slate-900 border-r border-white/10 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="text-xl font-black tracking-wider text-white">ELITE <span className="text-rose-500">ERP</span></div>
        </div>
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (item.path === "/gallery") {
                  navigate(item.path, { state: { fromAdmin: true } });
                } else {
                  navigate(item.path);
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left border-none outline-none ${
                item.active ? "bg-indigo-600/20 border border-indigo-500/30 text-indigo-400" : "text-slate-400 hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-white">Commercial Quotations Hub</h1>
          <p className="text-sm text-slate-400 mt-1">Generate calculated cost estimates, plan decoration pricing tiers, and structure catering baselines.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl h-fit">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              Build New Estimate
            </h3>
            <form onSubmit={handleAddQuotation} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Client Full Name</label>
                <input
                  type="text"
                  placeholder="e.g., Ramesh Kumar"
                  className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Event Type</label>
                  <select
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="BirthdayParty">Birthday Party</option>
                    <option value="Concert">Stage Concert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Estimate Status</label>
                  <select
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Approved">Approved 🟢</option>
                    <option value="Declined">Declined 🔴</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Base Price</label>
                  <input
                    type="number"
                    placeholder="25000"
                    className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-xs"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Decor Cost</label>
                  <input
                    type="number"
                    placeholder="5000"
                    className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-xs"
                    value={decorationCost}
                    onChange={(e) => setDecorationCost(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Catering Cost</label>
                  <input
                    type="number"
                    placeholder="12000"
                    className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-xs"
                    value={cateringCost}
                    onChange={(e) => setCateringCost(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg cursor-pointer text-sm"
              >
                Compile Quotation Total
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="p-4">Client / Event</th>
                    <th className="p-4">Breakdown Breakdown (Base / Decor / Food)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Grand Valuation</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm font-medium">
                  {loading ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">Loading quotation grids...</td></tr>
                  ) : quotations.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">No quotation templates found inside production storage bounds.</td></tr>
                  ) : (
                    quotations.map((q) => (
                      <tr key={q._id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-4">
                          <p className="text-white font-bold">{q.clientName}</p>
                          <p className="text-xs text-indigo-400 mt-0.5">{q.eventType}</p>
                        </td>
                        <td className="p-4 text-xs text-slate-400">
                          ₹{q.basePrice} / ₹{q.decorationCost} / ₹{q.cateringCost}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-black tracking-wide uppercase border ${
                            q.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            q.status === "Declined" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                            "bg-slate-950 text-slate-400 border-white/5"
                          }`}>
                            {q.status}
                          </span>
                        </td>
                        <td className="p-4 text-indigo-400 font-extrabold">₹{q.totalAmount.toLocaleString("en-IN")}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteQuotation(q._id)}
                            className="p-2 text-slate-500 hover:text-rose-400 transition-colors bg-transparent border-none cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
