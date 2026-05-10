"use client";

import { motion } from "framer-motion";
import { User as UserIcon, Settings, Bell, Shield, Wallet, CreditCard, Key, LogOut } from "lucide-react";

export default function ProfileSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight">Account Preferences</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Settings Navigation Sidebar */}
        <div className="space-y-2">
          {[
            { id: "profile", label: "Public Profile", icon: UserIcon, active: true },
            { id: "account", label: "Account Security", icon: Shield, active: false },
            { id: "billing", label: "Billing & Plans", icon: Wallet, active: false },
            { id: "notifications", label: "Notifications", icon: Bell, active: false },
            { id: "preferences", label: "App Preferences", icon: Settings, active: false },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                tab.active 
                  ? "bg-white/10 text-white shadow-lg border border-white/10" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-3 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 space-y-8">
             <div>
                <h3 className="text-xl font-bold mb-1">Avatar</h3>
                <p className="text-sm text-muted-foreground">This is how others will see you on the platform.</p>
             </div>
             
             <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-3xl font-bold border-4 border-[#0b1326] shadow-2xl relative">
                   M
                   <button className="absolute bottom-0 right-0 p-1.5 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Camera className="h-3 w-3" />
                   </button>
                </div>
                <div className="space-x-3">
                   <button className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors">Upload new</button>
                   <button className="px-4 py-2 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-colors">Delete</button>
                </div>
             </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 space-y-6">
             <div>
                <h3 className="text-xl font-bold mb-1">Personal Information</h3>
                <p className="text-sm text-muted-foreground">Update your underlying contact details and public bio.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Full Name</label>
                   <input type="text" defaultValue="Maya Rivers" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</label>
                   <input type="email" defaultValue="maya@traveloop.app" disabled className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none opacity-50 text-sm cursor-not-allowed" />
                </div>
                <div className="space-y-2 md:col-span-2">
                   <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Platform Bio</label>
                   <textarea rows={4} defaultValue="Digital nomad exploring the world one matcha latte at a time. Currently based in Tokyo." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm resize-none" />
                </div>
             </div>

             <div className="pt-4 flex justify-end">
                <button className="px-6 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold rounded-xl shadow-glow transition-all">Save Changes</button>
             </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8 space-y-6 border-red-500/20">
             <div>
                <h3 className="text-xl font-bold text-red-400 mb-1">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">Irreversible actions regarding your account data.</p>
             </div>
             
             <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/10 bg-red-500/5">
                <div>
                   <h4 className="font-semibold text-white">Delete Account</h4>
                   <p className="text-xs text-gray-400 mt-1">Permanently erase all your itineraries and data.</p>
                </div>
                <button className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors">
                   Delete Data
                </button>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// Needed explicit import for custom avatar component
import { Camera } from "lucide-react";
