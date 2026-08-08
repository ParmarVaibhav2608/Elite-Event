import React from "react";
import { Camera } from "lucide-react";

export default function Gallery({ onViewFullGallery }) {
  // High-quality event images (Unsplash) - All links updated and tested
  const portfolioImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      title: "Royal Indian Wedding",
      category: "Wedding"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800&auto=format&fit=crop",
      title: "Corporate Excellence Awards",
      category: "Corporate"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
      title: "Grand Birthday Bash",
      category: "Party"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
      title: "Luxury Table Decor",
      category: "Decoration"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop",
      title: "Live Concert Setup",
      category: "Entertainment"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
      title: "Grand Event Venue",
      category: "Setup"
    }
  ];

  return (
    <section id="gallery" className="relative w-full py-20 bg-slate-900 text-white overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-rose-600/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider uppercase">
            <Camera className="w-3.5 h-3.5" /> Our Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Moments We've <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-rose-400">Created</span>
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            A glimpse into the magical experiences and unforgettable memories we've crafted for our amazing clients.
          </p>
        </div>

        {/* Masonry-style Grid for Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioImages.map((img) => (
            <div 
              key={img.id} 
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer border border-white/10 shadow-lg"
            >
              {/* Image with zoom effect on hover */}
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Dark Gradient Overlay that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-rose-400 font-bold text-sm tracking-wider uppercase mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.category}
                </span>
                <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-16 text-center">
          <button 
            type="button"
            onClick={onViewFullGallery}
            className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-xl backdrop-blur-sm transition-all shadow-sm cursor-pointer"
          >
            View Full Gallery
          </button>
        </div>

      </div>
    </section>
  );
}
