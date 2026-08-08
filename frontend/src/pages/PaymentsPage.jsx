import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Calendar, Users, Package, Image, Settings, Receipt, Plus, Trash2, IndianRupee, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

export default function PaymentsPage() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields Control
  const [clientName, setClientName] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [transactionId, setTransactionId] = useState("");
  const [paymentType, setPaymentType] = useState("Advance Payment");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payments");
      const data = await response.json();
      if (response.ok) {
        setPayments(data);
      } else {
        toast.error("Transactions logs loading failure");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server link context breakdown");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !amountPaid.trim()) {
      toast.error("Client Name aur Amount Paid fill out karo!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          amountPaid: Number(amountPaid),
          paymentMode,
          transactionId,
          paymentType,
          date
        }),
      });
      if (response.ok) {
        toast.success("Billing Settlement Captured Safely!");
        setClientName("");
        setAmountPaid("");
        setTransactionId("");
        fetchPayments();
      } else {
        toast.error("Payment insert sequence blocked");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network synchronization exception");
    }
  };

  const handleDeletePayment = async (id) => {
    if (!window.confirm("Kya aap such me ye payment documentation record destroy karna chahte hain?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/payments/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Transaction row scrubbed successfully");
        fetchPayments();
      } else {
        toast.error("Removal failure executed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Communication channel trace failed");
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
    { name: "Quotations", icon: <FileText className="w-5 h-5" />, path: "/quotations" },
    { name: "Payments Log", icon: <IndianRupee className="w-5 h-5" />, path: "/payments", active: true },
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
          <h1 className="text-3xl font-black tracking-tight text-white">Corporate Inbound Payments Registry</h1>
          <p className="text-sm text-slate-400 mt-1">Audit active user transactions channels, manage advance retainers, and logs settlement metrics.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl h-fit">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              Capture Inbound Funds
            </h3>
            <form onSubmit={handleAddPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Payer Client Name</label>
                <input
                  type="text"
                  placeholder="e.g., Anjali Sharma"
                  className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Amount Received</label>
                  <input
                    type="number"
                    placeholder="15000"
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Payment Mode</label>
                  <select
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                  >
                    <option value="UPI">UPI / NetBanking</option>
                    <option value="Cash">Liquid Cash</option>
                    <option value="Bank Transfer">Direct Bank NEFT</option>
                    <option value="Card">POS Credit Card</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Transaction UTR/ID</label>
                  <input
                    type="text"
                    placeholder="TXN9847194"
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Settlement Tier</label>
                  <select
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <option value="Advance Payment">Advance Token</option>
                    <option value="Part Payment">Part Split</option>
                    <option value="Final Settlement">Final Closing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Receipt Date</label>
                <input
                  type="date"
                  className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500/50 transition-colors text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg cursor-pointer text-sm"
              >
                Log Ledger Transaction
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="p-4">Payer / Transaction ID</th>
                    <th className="p-4">Settlement Category</th>
                    <th className="p-4">Execution Date</th>
                    <th className="p-4">Funds Received</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm font-medium">
                  {loading ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">Parsing transaction database registries...</td></tr>
                  ) : payments.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">No income transactions tracked yet inside local datastore rows.</td></tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p._id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-4">
                          <p className="text-white font-bold">{p.clientName}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{p.transactionId || "Liquid Cash Receipt"}</p>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-950 text-indigo-400 border border-white/5">
                            {p.paymentType} ({p.paymentMode})
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">{p.date}</td>
                        <td className="p-4 text-emerald-400 font-extrabold">₹{p.amountPaid.toLocaleString("en-IN")}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeletePayment(p._id)}
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
