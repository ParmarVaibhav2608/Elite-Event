import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Calendar, Users, Package, Image, Settings, Receipt, Plus, Trash2, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";

export default function ExpensesPage() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State Fields
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Vendor");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/expenses");
      const data = await response.json();
      if (response.ok) {
        setExpenses(data);
      } else {
        toast.error("Expenses fetch karne mein dikkat aayi");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server connection breakdown");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!title.trim() || !amount.trim()) {
      toast.error("Title aur Amount bharo bhai!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount: Number(amount), category, date, notes }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Expense added tracking registry!");
        setTitle("");
        setAmount("");
        setNotes("");
        fetchExpenses();
      } else {
        toast.error("Expense save failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server synchronization mismatch");
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Kya aap sach me ye transaction hatana chahte hain?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Expense trace removed");
        fetchExpenses();
      } else {
        toast.error("Deletion unsuccessful");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network request error");
    }
  };

  // Safe navigation mapping layer
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/dashboard" },
    { name: "Lead Management", icon: <FileText className="w-5 h-5" />, path: "/leads" },
    { name: "Bookings", icon: <Calendar className="w-5 h-5" />, path: "/bookings" },
    { name: "Clients", icon: <Users className="w-5 h-5" />, path: "/clients" },
    { name: "Staff/Payroll", icon: <Users className="w-5 h-5" />, path: "/staff" },
    { name: "Inventory", icon: <Package className="w-5 h-5" />, path: "/inventory" },
    { name: "Expense Tracker", icon: <Receipt className="w-5 h-5" />, path: "/expenses", active: true },
    { name: "Quotations", icon: <FileText className="w-5 h-5" />, path: "/quotations" },
    { name: "Payments Log", icon: <IndianRupee className="w-5 h-5" />, path: "/payments" },
    { name: "Gallery", icon: <Image className="w-5 h-5" />, path: "/gallery" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Dynamic Native Embedded Sidebar Section */}
      <aside className="w-64 bg-slate-900 border-r border-white/10 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="text-xl font-black tracking-wider text-white">
            ELITE <span className="text-rose-500">ERP</span>
          </div>
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
                item.active
                  ? "bg-indigo-600/20 border border-indigo-500/30 text-indigo-400"
                  : "text-slate-400 hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Container Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-white">Expense Tracking Matrix</h1>
          <p className="text-sm text-slate-400 mt-1">Manage corporate cash outlays, operational vendor rents and logistics daily wages.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Processing Block Left Column */}
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl h-fit">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              Add Outflow Record
            </h3>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Expense Title</label>
                <input
                  type="text"
                  placeholder="e.g., Sound System Rental"
                  className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Amount (INR)</label>
                  <input
                    type="number"
                    placeholder="5000"
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Category</label>
                  <select
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Vendor">Vendor Rent</option>
                    <option value="Daily Wage">Daily Wage</option>
                    <option value="Food">Food/Catering</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Transaction Date</label>
                <input
                  type="date"
                  className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Supplementary Notes</label>
                <textarea
                  rows="3"
                  placeholder="Add payment method or vendor billing context..."
                  className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg cursor-pointer text-sm"
              >
                Log Financial Expense
              </button>
            </form>
          </div>

          {/* Interactive Data Grid Registry View Right Columns */}
          <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="p-4">Expense Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date Logged</th>
                    <th className="p-4">Total Outflow</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm font-medium">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-500">Retrieving ledger details...</td>
                    </tr>
                  ) : expenses.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-500">No layout outflows tracked yet inside compilation database.</td>
                    </tr>
                  ) : (
                    expenses.map((exp) => (
                      <tr key={exp._id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-4">
                          <p className="text-white font-bold">{exp.title}</p>
                          {exp.notes && <p className="text-xs text-slate-500 mt-0.5">{exp.notes}</p>}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-950 text-slate-300 border border-white/5">
                            {exp.category}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">{exp.date}</td>
                        <td className="p-4 text-rose-400 font-extrabold">₹{exp.amount.toLocaleString("en-IN")}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteExpense(exp._id)}
                            className="p-2 text-slate-500 hover:text-rose-400 transition-colors bg-transparent border-none cursor-pointer outline-none"
                            title="Delete Entry"
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
