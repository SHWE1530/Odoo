// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Globe2, Briefcase, Activity, Trash2 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import api from "@/lib/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      try {
        // const [resStats, resUsers, resChart] = await Promise.all([
        //   api.get('/admin/stats'),
        //   api.get('/admin/users'),
        //   api.get('/admin/analytics/signups')
        // ]);
        
        // Simulating the actual payload response structure built in the Express Node server for rapid UI scaffolding
        setTimeout(() => {
           setStats({ metrics: { totalUsers: 1420, activeTrips: 342, totalPlatformTrackedSpend: 893450 }, popularDestinations: [{location: "Kyoto, Japan", visits: 45}, {location: "Paris, France", visits: 39}] });
           setUsers([
             { id: '1', name: 'Maya Rivers', email: 'maya@traveloop.app', role: 'USER', isEmailVerified: true, trips: 4, createdAt: new Date().toISOString() },
             { id: '2', name: 'Admin', email: 'admin@traveloop.app', role: 'ADMIN', isEmailVerified: true, trips: 0, createdAt: new Date().toISOString() },
             { id: '3', name: 'Toxic Spammer', email: 'spam@bot.net', role: 'USER', isEmailVerified: false, trips: 12, createdAt: new Date().toISOString() }
           ]);
           setChartData([
             { month: "Jan", signups: 45 }, { month: "Feb", signups: 120 }, 
             { month: "Mar", signups: 98 }, { month: "Apr", signups: 240 },
             { month: "May", signups: 540 }
           ]);
           setLoading(false);
        }, 1000);
      } catch (err) {
        console.error(err);
      }
    }
    loadAdminData();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you absolutely sure? This cascades and drops all their trips forever.")) return;
    try {
       // await api.delete(`/admin/users/${id}`);
       setUsers(users.filter(u => u.id !== id));
       alert("User annihilated completely.");
    } catch (e) {
       alert("Failed to delete.");
    }
  };

  return (
    <div className="space-y-8">
      <header>
         <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-white flex items-center gap-3">
           Platform Command Center <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
         </h1>
         <p className="text-gray-400 text-sm max-w-2xl">High-level telemetry evaluating active trips, revenue throughput, and gross global tracking metrics mapped to Recharts.</p>
      </header>

      {/* KPI Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-dark border border-red-500/20 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Users className="h-16 w-16 text-red-500" /></div>
            <p className="text-gray-400 text-sm font-medium mb-1 tracking-wider uppercase">Platform Accounts</p>
            <h3 className="text-4xl font-bold font-mono">{loading ? "--" : stats?.metrics.totalUsers.toLocaleString()}</h3>
         </motion.div>
         
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-dark border border-white/10 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Globe2 className="h-16 w-16" /></div>
            <p className="text-gray-400 text-sm font-medium mb-1 tracking-wider uppercase">Active Live Trips</p>
            <h3 className="text-4xl font-bold font-mono text-blue-400">{loading ? "--" : stats?.metrics.activeTrips.toLocaleString()}</h3>
         </motion.div>

         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-dark border border-white/10 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Activity className="h-16 w-16" /></div>
            <p className="text-gray-400 text-sm font-medium mb-1 tracking-wider uppercase">Gross API Spend Tracking</p>
            <h3 className="text-4xl font-bold font-mono text-emerald-400">{loading ? "--" : `$${(stats?.metrics.totalPlatformTrackedSpend / 1000).toFixed(1)}k`}</h3>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
         {/* Recharts Analytics Panel */}
         <div className="glass-dark border border-white/10 rounded-2xl p-6 lg:col-span-2 min-h-[400px]">
            <h3 className="text-lg font-bold mb-6 tracking-tight">Growth Velocity (Signups)</h3>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="#6b7280" />
                    <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#6b7280" />
                    <Tooltip contentStyle={{ background: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
                    <Area type="monotone" dataKey="signups" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorSignups)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Trending Destinations Component */}
         <div className="glass-dark border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-6 tracking-tight">Global Heatmap Logs</h3>
            <div className="space-y-4">
               {stats?.popularDestinations?.map((d: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                     <span className="font-medium text-sm">{d.location}</span>
                     <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full font-bold">{d.visits} events</span>
                  </div>
               ))}
               {loading && <div className="h-10 bg-white/5 rounded-xl animate-pulse" />}
            </div>
         </div>
      </div>

      {/* Dangerous Operations Table */}
      <div className="glass-dark border border-white/10 rounded-2xl p-6 overflow-x-auto mt-5">
         <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Briefcase className="h-5 w-5 text-gray-500" /> Administrative Threat Protocol (User List)</h3>
         <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
               <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 font-medium">User Profile</th>
                  <th className="pb-3 font-medium">Clearance</th>
                  <th className="pb-3 font-medium">Tracked Trips</th>
                  <th className="pb-3 text-right font-medium">Terminal</th>
               </tr>
            </thead>
            <tbody>
               {users.map(u => (
                 <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4">
                       <div className="font-medium text-sm">{u.name}</div>
                       <div className="text-xs text-gray-500">{u.email}</div>
                    </td>
                    <td className="py-4">
                       <span className={`text-xs px-2 py-1 rounded-full font-bold tracking-widest ${u.role === 'ADMIN' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-400'}`}>
                         {u.role}
                       </span>
                    </td>
                    <td className="py-4 font-mono text-sm">{u.trips}</td>
                    <td className="py-4 text-right">
                       <button onClick={() => handleDeleteUser(u.id)} disabled={u.role === 'ADMIN'} className="text-red-500 hover:text-red-400 disabled:opacity-20 transition-colors p-2 rounded-lg hover:bg-red-500/10">
                          <Trash2 className="h-4 w-4" />
                       </button>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
