"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, MapPin, Clock, Plus, ChevronRight, MoreVertical,
  Plane, Hotel, Utensils, Camera, ArrowLeft,
  PieChart, DollarSign, Receipt, CheckCircle2, Circle, TrendingUp
} from "lucide-react";
import Link from "next/link";

const days = [
  {
    day: 1,
    date: "Oct 12",
    activities: [
      { id: 1, time: "09:00 AM", title: "Flight Arrival", location: "KIX Airport", type: "transport", icon: Plane, cost: "$0" },
      { id: 2, time: "12:30 PM", title: "Hotel Check-in", location: "Ace Hotel Kyoto", type: "hotel", icon: Hotel, cost: "$450" },
      { id: 3, time: "07:00 PM", title: "Welcome Dinner", location: "Pontocho Alley", type: "food", icon: Utensils, cost: "$120" },
    ]
  },
  {
    day: 2,
    date: "Oct 13",
    activities: [
      { id: 4, time: "10:00 AM", title: "Fushimi Inari Shrine", location: "Fushimi Ward", type: "sightseeing", icon: Camera, cost: "$15" },
    ]
  }
];

export default function TripDetail() {
  const [activeTab, setActiveTab] = useState("Timeline");

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Hero Header */}
      <div className="relative h-[300px] md:h-[350px] rounded-[40px] overflow-hidden border border-white/10 group shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop" 
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          alt="Kyoto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/40 to-transparent" />
        
        <div className="absolute top-8 left-8 flex gap-4">
           <Link href="/app/dashboard" className="h-10 w-10 flex items-center justify-center rounded-full glass-dark hover:scale-110 transition-transform">
              <ArrowLeft className="h-5 w-5" />
           </Link>
           <button className="h-10 px-4 flex items-center justify-center rounded-full glass-dark text-sm font-medium hover:bg-white/10 transition-colors">
              Share Publicly
           </button>
        </div>

        <div className="absolute bottom-10 left-10 space-y-2">
          <div className="flex items-center gap-2 text-[#c0c1ff] font-bold text-xs uppercase tracking-widest">
            <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/30">Active Trip</span>
            <span className="opacity-50">•</span>
            <span>8 Days</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Kyoto Autumn Escape</h1>
          <div className="flex items-center gap-4 text-white/70 text-sm md:text-base font-medium">
             <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Oct 12 - Oct 20</div>
             <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Kyoto, Japan</div>
          </div>
        </div>
      </div>

      {/* Primary Tabs Navigation */}
      <div className="sticky top-4 z-40">
        <div className="glass-dark p-2 rounded-2xl flex items-center gap-1 shadow-2xl border-white/5">
           {["Timeline", "Budget", "Packing Checklist"].map((tab) => (
             <button 
               key={tab} 
               onClick={() => setActiveTab(tab)}
               className={`flex-1 h-12 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab ? 'bg-white text-black shadow-lg scale-[1.02]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* TIMELINE VIEW */}
          {activeTab === "Timeline" && (
            <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
              {days.map((day, dayIdx) => (
                <div key={day.day} className="space-y-6">
                  <div className="flex items-end justify-between border-b border-white/5 pb-4">
                    <div>
                      <h2 className="text-2xl font-bold">Day {day.day}</h2>
                      <p className="text-muted-foreground text-sm font-medium">{day.date}</p>
                    </div>
                    <button className="text-sm font-semibold text-[#c0c1ff] flex items-center gap-1 hover:text-white transition-colors bg-[#6366f1]/10 px-4 py-2 rounded-full border border-[#6366f1]/20 pb-2.5">
                      <Plus className="h-4 w-4 relative top-0.5" /> Add Activity
                    </button>
                  </div>

                  <div className="space-y-3 relative before:absolute before:inset-0 before:ml-7 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {day.activities.map((activity, actIdx) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: actIdx * 0.05 }}
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                      >
                         <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#0b1326] bg-[#171f33] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:scale-110 group-hover:bg-[#6366f1] transition-all duration-300 z-10">
                            <activity.icon className="h-5 w-5" />
                         </div>
                         <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-5 hover:border-[#6366f1]/40 border-white/5 hover:translate-y-[-2px] cursor-pointer">
                            <div className="flex items-center justify-between mb-1">
                               <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c0c1ff] bg-[#6366f1]/10 px-2 py-1 rounded-md">
                                 <Clock className="h-3 w-3" /> {activity.time}
                               </div>
                               <span className="text-xs font-bold text-gray-400">{activity.cost}</span>
                            </div>
                            <h4 className="font-bold text-lg mb-1">{activity.title}</h4>
                            <p className="text-sm text-gray-400 flex items-center gap-1"><MapPin className="h-3 w-3" /> {activity.location}</p>
                         </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* BUDGET VIEW */}
          {activeTab === "Budget" && (
            <motion.div key="budget" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-8 md:col-span-2 glow-indigo overflow-hidden relative">
                    <div className="absolute -top-10 -right-10 opacity-5"><PieChart className="h-64 w-64" /></div>
                    <div className="relative z-10">
                      <p className="text-sm font-semibold uppercase tracking-widest text-[#c0c1ff] mb-2">Total Expense</p>
                      <h2 className="text-6xl font-extrabold tracking-tighter mb-4">$585.00</h2>
                      <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex shadow-inner">
                         <div className="h-full bg-blue-500 w-[60%]" />
                         <div className="h-full bg-purple-500 w-[25%]" />
                         <div className="h-full bg-pink-500 w-[15%]" />
                      </div>
                      <div className="flex gap-6 mt-4 text-xs font-medium text-gray-400">
                         <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-blue-500" /> Hotel (60%)</div>
                         <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-purple-500" /> Food (25%)</div>
                         <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-pink-500" /> Activity (15%)</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                     <div className="glass-card p-6 border-white/5 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0"><DollarSign className="h-6 w-6" /></div>
                        <div>
                           <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Target Budget</p>
                           <p className="text-2xl font-bold">$1,500</p>
                        </div>
                     </div>
                     <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0"><TrendingUp className="h-6 w-6" /></div>
                        <div>
                           <p className="text-xs text-emerald-500/70 uppercase tracking-wider font-bold mb-1">Remaining</p>
                           <p className="text-2xl font-bold text-emerald-400">$915.00</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-[#171f33]/30 border border-white/5 rounded-3xl p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Receipt className="h-5 w-5" /> Recent Transactions</h3>
                  <div className="space-y-4">
                     {days[0].activities.map((act) => (
                       <div key={act.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-4">
                             <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center"><act.icon className="h-5 w-5 text-[#c0c1ff]" /></div>
                             <div>
                                <p className="font-bold text-sm">{act.title}</p>
                                <p className="text-xs text-gray-400">{act.time}</p>
                             </div>
                          </div>
                          <p className="font-bold font-mono">{act.cost}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}

          {/* PACKING CHECKLIST */}
          {activeTab === "Packing Checklist" && (
            <motion.div key="packing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 max-w-3xl mx-auto">
               <div className="flex items-center justify-between mb-8">
                 <div>
                    <h2 className="text-3xl font-extrabold tracking-tight mb-2">Essential Gear</h2>
                    <p className="text-muted-foreground font-medium">12 of 18 items packed.</p>
                 </div>
                 <button className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-glow">
                    <Plus className="h-6 w-6" />
                 </button>
               </div>

               <div className="space-y-6">
                 {[
                   { category: "Documents", items: [{ name: "Passport", checked: true }, { name: "JR Pass", checked: true }, { name: "Travel Insurance", checked: false }] },
                   { category: "Clothing", items: [{ name: "Heavy Jacket", checked: true }, { name: "Walking Shoes", checked: true }, { name: "Scarf", checked: false }] }
                 ].map((cat, idx) => (
                    <div key={cat.category} className="glass-card overflow-hidden">
                       <div className="bg-white/5 p-4 border-b border-white/5 flex items-center justify-between">
                          <h3 className="font-bold tracking-wider uppercase text-xs text-[#c0c1ff]">{cat.category}</h3>
                          <span className="text-xs font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-md">{cat.items.filter(i=>i.checked).length} / {cat.items.length}</span>
                       </div>
                       <div className="p-2">
                          {cat.items.map((item, i) => (
                             <label key={i} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer group transition-colors">
                                {item.checked ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <Circle className="h-5 w-5 text-gray-500 group-hover:text-white" />}
                                <span className={`text-sm font-medium transition-all ${item.checked ? 'text-gray-500 line-through' : 'text-white'}`}>{item.name}</span>
                             </label>
                          ))}
                       </div>
                    </div>
                 ))}
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
