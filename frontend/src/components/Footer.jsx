import React from "react";
// Sirf standard UI icons import kar rahe hain (Jo kabhi delete nahi hote)
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <div className="text-2xl font-black tracking-wider flex items-center gap-1 text-white mb-6">
              ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400">EVENT</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Making your dream events unforgettable. We specialize in premium weddings, corporate galas, and grand celebrations across the country.
            </p>
            {/* Custom Stylish Social Buttons without external icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all duration-300 font-bold text-xs tracking-wider">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 font-bold text-xs tracking-wider">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 font-bold text-xs tracking-wider">
                X
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#about" className="hover:text-rose-400 transition-colors">About Us</a></li>
              <li><a href="#packages" className="hover:text-rose-400 transition-colors">Our Services</a></li>
              <li><a href="#gallery" className="hover:text-rose-400 transition-colors">Portfolio</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#packages" className="hover:text-indigo-400 transition-colors">Royal Weddings</a></li>
              <li><a href="#packages" className="hover:text-indigo-400 transition-colors">Corporate Events</a></li>
              <li><a href="#packages" className="hover:text-indigo-400 transition-colors">Birthday Parties</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
                <span>123 Elite Event Avenue, Premium City, 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rose-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-rose-400 shrink-0" />
                <span>hello@eliteevent.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium">
          <p>&copy; {new Date().getFullYear()} Elite Event ERP. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
