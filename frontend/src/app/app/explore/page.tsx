"use client";

import { motion } from "framer-motion";
import { Search, Compass, MapPin, Heart, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const destinations = [
  { id: 1, name: "Amalfi Coast", country: "Italy", rating: 4.9, tags: ["Coastal", "Romance", "Food"], image: "https://images.unsplash.com/photo-1516483638261-f40af5ff1e20?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Kyoto", country: "Japan", rating: 4.8, tags: ["Culture", "Nature", "Quiet"], image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Zermatt", country: "Switzerland", rating: 4.9, tags: ["Alps", "Ski", "Adventure"], image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Santorini", country: "Greece", rating: 4.7, tags: ["Views", "Ocean", "Relax"], image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop" },
];

export default function ExploreWorld() {
  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-[40px] overflow-hidden border border-white/10 flex items-center justify-center">
         <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1600&auto=format&fit=crop" alt="Explore" className="absolute inset-0 w-full h-full object-cover" />
         <div className="absolute inset-0 bg-[#0b1326]/60 backdrop-blur-sm" />
         
         <div className="relative z-10 text-center space-y-6 max-w-2xl px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Find your next horizon</h1>
            <p className="text-lg text-gray-300">Discover handpicked destinations perfectly matched to your travel style and budget preferences.</p>
            
            <div className="relative max-w-xl mx-auto mt-8">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
               <input type="text" placeholder="Search cities, countries, or experiences..." 
                 className="w-full h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 pl-16 pr-6 outline-none focus:border-[#6366f1] focus:bg-white/20 transition-all text-lg shadow-2xl" 
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
                 Explore
               </button>
            </div>
         </div>
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
         {["Trending Now", "Weekend Escapes", "Digital Nomad", "Luxury", "Budget Friendly", "Adventure"].map((cat, i) => (
           <button key={cat} className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-all border ${i === 0 ? 'bg-white text-black border-transparent' : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'}`}>
             {cat}
           </button>
         ))}
      </div>

      {/* Recommendations Grid */}
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Compass className="h-6 w-6 text-primary" /> Recommended for Maya
            </h2>
            <Link href="#" className="text-sm font-semibold text-primary hover:text-white transition-colors">See all matches</Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[380px] rounded-[32px] overflow-hidden cursor-pointer"
              >
                 <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/20 to-transparent" />
                 
                 <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
                    <Heart className="h-5 w-5 text-white" />
                 </div>

                 <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex gap-2 mb-3">
                       {dest.tags.slice(0,2).map(tag => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-white border border-white/10">
                             {tag}
                          </span>
                       ))}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                    <div className="flex items-center justify-between">
                       <p className="text-sm text-gray-300 flex items-center gap-1"><MapPin className="h-3 w-3" /> {dest.country}</p>
                       <p className="text-sm font-bold text-white flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {dest.rating}</p>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </div>
      
    </div>
  );
}
