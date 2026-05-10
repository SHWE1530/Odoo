"use client";

import { motion } from "framer-motion";
import { Plus, Search, MapPin, Calendar, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const myTrips = [
  { id: 1, title: "Kyoto Autumn Escape", location: "Kyoto, Japan", date: "Oct 12 - Oct 20", status: "Active", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Alpine Explorer", location: "Zermatt, Switzerland", date: "Dec 05 - Dec 15", status: "Planning", image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Amalfi Coast Drive", location: "Positano, Italy", date: "Jun 10 - Jun 22", status: "Completed", image: "https://images.unsplash.com/photo-1516483638261-f40af5ff1e20?q=80&w=800&auto=format&fit=crop" },
];

export default function MyTrips() {
  return (
    <div className="space-y-10 pb-20 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">My Trips</h1>
          <p className="text-muted-foreground text-lg font-light">Manage and revisit your curated itineraries.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Search destinations..." className="h-12 w-64 rounded-full bg-white/5 border border-white/10 pl-12 pr-4 outline-none focus:border-[#6366f1] transition-all" />
           </div>
           <button className="h-12 px-6 rounded-full bg-white text-black font-semibold flex items-center gap-2 hover:bg-gray-200 transition-all shadow-glow hover:scale-105">
             <Plus className="h-5 w-5" /> New Trip
           </button>
        </div>
      </div>

      <div className="glass-dark p-2 rounded-2xl flex items-center gap-1 border-white/5 max-w-md">
         {["All", "Active", "Planning", "Completed"].map((tab, i) => (
           <button 
             key={tab} 
             className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all ${i === 0 ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {myTrips.map((trip, i) => (
           <Link href={`/app/trips/${trip.id}`} key={trip.id}>
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#171f33]/30 h-[400px]"
             >
               <div className="absolute inset-0 overflow-hidden">
                 <img src={trip.image} alt={trip.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/60 to-transparent transition-opacity group-hover:opacity-90" />
               
               <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <span className={`px-3 py-1.5 rounded-full backdrop-blur-xl text-[10px] font-bold uppercase tracking-widest border ${
                    trip.status === "Active" ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" : 
                    trip.status === "Planning" ? "bg-orange-500/20 text-orange-300 border-orange-500/30" :
                    "bg-white/10 text-gray-300 border-white/10"
                  }`}>
                    {trip.status}
                  </span>
                  <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
               </div>

               <div className="absolute bottom-6 left-6 right-6 space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                 <h3 className="text-2xl font-bold text-white">{trip.title}</h3>
                 <div className="space-y-1.5">
                   <div className="flex items-center gap-2 text-sm text-gray-300">
                     <MapPin className="h-4 w-4 text-[#c0c1ff]" /> {trip.location}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-300">
                     <Calendar className="h-4 w-4 text-[#c0c1ff]" /> {trip.date}
                   </div>
                 </div>
               </div>
             </motion.div>
           </Link>
         ))}

         {/* Empty State / Add New */}
         <motion.button 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="group h-[400px] rounded-3xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#6366f1]/50 transition-all flex flex-col items-center justify-center gap-4"
         >
            <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#6366f1]/20">
               <Plus className="h-8 w-8 text-gray-400 group-hover:text-[#c0c1ff] transition-colors" />
            </div>
            <p className="font-bold text-gray-400 group-hover:text-white transition-colors">Design New Itinerary</p>
         </motion.button>
      </div>
    </div>
  );
}
