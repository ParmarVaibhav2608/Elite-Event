import React, { useState } from "react";
import { X, Search, CheckCircle, Clock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function TrackStatusModal({ onClose }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(`http://localhost:5000/api/public/track/${phone.trim()}`);
      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
        if (!data.found) {
          toast.error("Koi record nahi mila is number par!");
        } else {
          toast.success("Status fetched successfully!");
        }
      } else {
        toast.error("Tracking request failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Background Accent */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />

        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-rose-400" />
            Track Booking Status
          </h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleTrackSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Registered Contact Number
            </label>
            <input
              type="tel"
              placeholder="Enter Contact Number used during booking"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 p-3 rounded-lg text-white font-medium outline-none focus:border-rose-500/50 transition-colors placeholder:text-slate-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-bold py-3 rounded-lg transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? "Searching..." : "Track Status"}
          </button>
        </form>

        {/* Dynamic Tracking Status Result Card */}
        {result && (
          <div className="mt-6 p-4 bg-slate-950/60 rounded-xl border border-white/5 animate-fadeIn relative z-10">
            {result.found ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  {result.type === "Booking" ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  )}
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Name</p>
                    <p className="text-white font-bold text-base">{result.clientName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-left">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Event Type</p>
                    <p className="text-slate-200 font-semibold text-xs">{result.eventType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Event Date</p>
                    <p className="text-slate-200 font-semibold text-xs">{result.date || "N/A"}</p>
                  </div>
                </div>

                <div className="mt-2 pt-3 border-t border-white/5 flex flex-col items-center justify-center bg-white/[0.02] p-2 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current State Pipeline</p>
                  <p className="text-sm font-black tracking-wide text-white">{result.status}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-left py-2">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <p className="text-slate-300 font-medium text-sm">{result.message}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
