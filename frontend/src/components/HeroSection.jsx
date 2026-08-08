import React from "react";
import { Calendar, CheckCircle, Star, Users, ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection({ onInquire, onTrack }) {
  const whatsappUrl = "https://wa.me/910000000000?text=Hi%20Elite%20Event,%20I%20want%20a%20quote.";

  return (
    <div className="relative w-full min-h-screen bg-slate-900 text-white overflow-hidden font-sans">
      
      {/* Dynamic Futuristic Glow Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-rose-500/20 to-purple-600/20 blur-[120px] animate-pulse duration-[6000ms]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-indigo-500/20 to-emerald-500/10 blur-[120px] animate-pulse duration-[8000ms]" />
        {/* Subtle grid pattern for premium tech/modern feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Premium Glassmorphic Navbar */}
      <nav className="border-b border-white/10 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-black tracking-wider flex items-center gap-1 text-white">
            ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">EVENT</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-300 items-center">
            <a href="#about" className="hover:text-rose-400 transition-colors">About</a>
            <a href="#gallery" className="hover:text-rose-400 transition-colors">Gallery</a>
            <a href="#packages" className="hover:text-rose-400 transition-colors">Packages</a>
            <button type="button" onClick={onTrack} className="hover:text-rose-400 transition-colors cursor-pointer text-sm font-semibold bg-transparent border-none text-slate-300 p-0 outline-none">
              Track Status
            </button>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-bold tracking-wide rounded-full group bg-gradient-to-br from-rose-500 to-indigo-500 group-hover:from-rose-500 group-hover:to-indigo-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-800 mt-2"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-slate-950 rounded-full group-hover:bg-opacity-0">
              Contact Team
            </span>
          </a>
        </div>
      </nav>

      {/* Main Content Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Column: Premium Copywriting */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          
          {/* Neon/Glow Badge */}
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.1)] text-rose-400 px-4 py-1.5 rounded-full text-xs font-bold mb-6 animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            Premium Bookings Open for 2026!
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Make Your <br className="hidden md:block" />
            Dream Event <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400 dropping-shadow-sm">
              Unforgettable
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-lg mb-8 font-medium leading-relaxed">
            Weddings, Luxury Corporate Events & Grand Stage Celebrations. We don't just organize; we style, manage, and curate unforgettable premium experiences.
          </p>

          {/* Luxury CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
            <a
              href="#packages"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(244,63,94,0.3)] hover:shadow-[0_4px_25px_rgba(244,63,94,0.5)] transition-all duration-300"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
            
            {/* Functional Booking Now Button */}
            <button 
              type="button"
              onClick={() => onInquire("General Booking")}
              className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-sm transition-all text-center shadow-sm cursor-pointer"
            >
              Booking Now
            </button>
          </div>

          {/* Interactive Trust Glass Cards */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/[0.03] backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-inner flex items-center gap-4 hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300 group">
              <div className="bg-rose-500/10 p-3 rounded-xl text-rose-400 group-hover:scale-110 transition-transform"><Calendar className="w-5 h-5" /></div>
              <div className="text-left">
                <p className="font-black text-white text-xl tracking-tight">500+</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Events Executed</p>
              </div>
            </div>
            <div className="bg-white/[0.03] backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-inner flex items-center gap-4 hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300 group">
              <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform"><Star className="w-5 h-5 fill-indigo-400" /></div>
              <div className="text-left">
                <p className="font-black text-white text-xl tracking-tight">4.9/5</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Client Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Floating Image Mesh */}
        <div className="w-full lg:w-1/2 relative min-h-[480px] hidden md:block">
          
          {/* Neon Background Aura behind images */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-gradient-to-tr from-rose-500/30 to-indigo-500/30 blur-[60px] rounded-full animate-pulse" />

          {/* Image 1: Main Center Large */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[75%] z-10 hover:z-30 transition-all duration-500">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop" 
              alt="Premium Wedding Reception" 
              className="w-full h-full object-cover rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 hover:scale-[1.03] transition-transform duration-500"
            />
          </div>

          {/* Image 2: Top Right Overlapping Card */}
          <div className="absolute top-[8%] right-[4%] w-[42%] h-[38%] z-20 hover:z-30 transition-all duration-500 transform hover:scale-[1.05]">
            <img 
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&auto=format&fit=crop" 
              alt="Luxury Corporate Gala" 
              className="w-full h-full object-cover rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-white/20"
            />
          </div>

          {/* Image 3: Bottom Left Overlapping Card */}
          <div className="absolute bottom-[8%] left-[4%] w-[42%] h-[38%] z-20 hover:z-30 transition-all duration-500 transform hover:scale-[1.05]">
            <img 
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=500&auto=format&fit=crop" 
              alt="Elite Stage Lighting" 
              className="w-full h-full object-cover rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-white/20"
            />
          </div>
          
        </div>

      </section>

      {/* Luxury Glowing WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <svg className="w-6 h-6 fill-white group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.435 1.451 5.393 0 9.778-4.383 9.781-9.774a9.725 9.725 0 0 0-2.83-6.915A9.745 9.745 0 0 0 12.01 2.74c-5.397 0-9.786 4.386-9.79 9.777a9.776 9.776 0 0 0 1.51 5.116l-.993 3.626 3.712-.973z" />
        </svg>
      </a>
    </div>
  );
}
