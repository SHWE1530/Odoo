"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Globe2, 
  Compass, 
  Clock, 
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Wallet
} from "lucide-react";

const stats = [
  { label: "Planned Trips", value: "12", icon: Globe2, color: "text-blue-400" },
  { label: "Cities Visited", value: "24", icon: MapPin, color: "text-indigo-400" },
  { label: "Total Saved", value: "$1,240", icon: Wallet, color: "text-violet-400" },
];

const activeTrips = [
  { 
    id: 1, 
    title: "Kyoto Autumn Escape", 
    location: "Kyoto, Japan", 
    date: "Oct 12 - Oct 20", 
    status: "Active",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: 2, 
    title: "Alpine Explorer", 
    location: "Zermatt, Switzerland", 
    date: "Dec 05 - Dec 15", 
    status: "Planning",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-primary font-medium mb-2"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm tracking-wider uppercase">Your Journey v2.0</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Bonjour, Maya.</h1>
          <p className="text-muted-foreground mt-2 text-lg font-light">Where will the wind take you next?</p>
        </div>
        <button className="h-14 px-8 rounded-2xl bg-white text-black font-semibold flex items-center gap-3 hover:bg-gray-100 transition-all shadow-glow active:scale-95 group">
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          Plan New Adventure
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex items-center justify-between group hover:border-[#6366f1]/40"
          >
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
            <div className={`h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Trip Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#8b5cf6]" />
              Active Itineraries
            </h2>
            <button className="text-sm font-medium text-primary hover:underline">View all</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTrips.map((trip) => (
              <motion.div 
                key={trip.id}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#171f33]/30"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={trip.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-[#c0c1ff] border border-white/10">
                      {trip.status}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{trip.title}</h4>
                    <p className="text-sm text-white/60 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {trip.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <div className="glass-dark p-8 rounded-[32px] space-y-6 glow-indigo">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#6366f1]" />
              Monthly Budget
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Spent</p>
                  <p className="text-2xl font-bold">$2,450</p>
                </div>
                <p className="text-xs text-[#c0c1ff]">Target: $3,000</p>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  className="h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-2 opacity-10">
                <Compass className="h-20 w-20" />
             </div>
             <h3 className="text-lg font-bold mb-4">Discovery</h3>
             <p className="text-xs text-muted-foreground mb-4 leading-relaxed">Trending destinations based on your travel style.</p>
             <button className="w-full h-11 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all">
                Explore Recommendations
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
