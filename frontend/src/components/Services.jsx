import React from "react";
import { PartyPopper, Briefcase, Cake, Camera, Music, Utensils, Sparkles, PlusCircle } from "lucide-react";

export default function Services({ onInquire }) {
  const services = [
    {
      title: "Royal Weddings",
      description: "Complete wedding management from pre-wedding shoots to the grand reception with royal setups.",
      icon: <PartyPopper className="w-8 h-8 text-rose-400" />,
      glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]",
      border: "hover:border-rose-500/40"
    },
    {
      title: "Corporate Events",
      description: "Professional conferences, seminars, and high-end corporate gala arrangements perfectly managed.",
      icon: <Briefcase className="w-8 h-8 text-indigo-400" />,
      glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
      border: "hover:border-indigo-500/40"
    },
    {
      title: "Birthday Parties",
      description: "Premium theme-based birthday decorations, lighting, games, and absolute entertainment.",
      icon: <Cake className="w-8 h-8 text-fuchsia-400" />,
      glow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.25)]",
      border: "hover:border-fuchsia-500/40"
    },
    {
      title: "Photography & Video",
      description: "Cinematic premium videography and candid photography to capture your golden memories.",
      icon: <Camera className="w-8 h-8 text-amber-400" />,
      glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
      border: "hover:border-amber-500/40"
    },
    {
      title: "DJ & Entertainment",
      description: "Top-tier sound systems, live bands, and celebrity performers to elevate the crowd's energy.",
      icon: <Music className="w-8 h-8 text-emerald-400" />,
      glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
      border: "hover:border-emerald-500/40"
    },
    {
      title: "Premium Catering",
      description: "Multi-cuisine catering services with dynamic presentations, grand stalls and top taste.",
      icon: <Utensils className="w-8 h-8 text-orange-400" />,
      glow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]",
      border: "hover:border-orange-500/40"
    },
    {
      title: "Custom Events / Others",
      description: "Have a unique idea? Anniversaries, exhibitions, or custom theme parties—we build exactly what you imagine.",
      icon: <PlusCircle className="w-8 h-8 text-cyan-400" />,
      glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]",
      border: "hover:border-cyan-500/40"
    }
  ];

  return (
    <section id="packages" className="relative w-full py-20 bg-slate-900 text-white overflow-hidden">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/5 blur-[130px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Our Expertise
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Services We <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">Provide</span>
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            We deliver high-end event management experiences. Choose your package or customize your own celebration hassle-free.
          </p>
        </div>

        {/* Services Dark Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-300 shadow-inner group flex flex-col justify-between ${service.border} ${service.glow} hover:-translate-y-2`}
            >
              <div>
                {/* Icon Container with subtle neon ring */}
                <div className="bg-slate-950 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              {/* Updated Button styling for better visibility and interaction affordance */}
              <button 
                type="button"
                onClick={() => onInquire(service.title)}
                className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-white transition-all duration-300 border border-rose-500/20 hover:border-rose-500/50 hover:bg-rose-500/10 px-4 py-2.5 rounded-lg w-fit"
              >
                Inquire Now 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
