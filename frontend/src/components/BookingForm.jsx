import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function BookingForm({ onClose, eventType }) {
  const [formData, setFormData] = useState({
    clientName: "",
    contact: "",
    date: "",
    venue: "",
    eventType: eventType || "Custom Event",
    amount: "Pending" // Initial state
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Redirecting public inquiry fire mechanism directly to the Lead Management layer
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: formData.clientName,
          phone: formData.contact,
          eventDate: formData.date,
          notes: formData.venue,
          eventType: formData.eventType
        })
      });
      
      if (response.ok) {
        toast.success("Booking request sent! Hamari team aapko contact karegi. 🚀");
        onClose();
      } else {
        toast.error("Failed to process inquiry entry on the server.");
      }
    } catch (error) {
      toast.error("Failed to send request.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Inquire for {eventType}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Your Name" required className="w-full bg-slate-950 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, clientName: e.target.value})} />
          <input type="tel" placeholder="Contact Number" required className="w-full bg-slate-950 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, contact: e.target.value})} />
          <input type="date" required className="w-full bg-slate-950 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, date: e.target.value})} />
          <textarea placeholder="Venue Address" required className="w-full bg-slate-950 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, venue: e.target.value})} />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors">Submit Inquiry</button>
        </form>
      </div>
    </div>
  );
}
