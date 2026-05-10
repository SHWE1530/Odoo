"use client";

import { motion } from "framer-motion";
import { Users, Share2, MapPin, Search, Star, MessageCircle, Heart, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const showcases = [
  { 
    id: 1, 
    creator: "Elena R.", 
    avatar: "E", 
    title: "14 Days across the Swiss Alps", 
    views: "12.4k", 
    likes: 842,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    creator: "Marcus T.", 
    avatar: "M", 
    title: "Hidden Gems of Tokyo & Kyoto", 
    views: "8.2k", 
    likes: 531,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    creator: "Sarah Jane", 
    avatar: "S", 
    title: "Backpacking the Amalfi Coast", 
    views: "15.1k", 
    likes: 1204,
    image: "https://images.unsplash.com/photo-1516483638261-f40af5ff1e20?q=80&w=800&auto=format&fit=crop" 
  },
];

export default function Community() {
  return (
    <div className="space-y-10 pb-20 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Community Showcase</h1>
          <p className="text-muted-foreground text-lg font-light max-w-xl">Curated, battle-tested itineraries published by verified travelers. Clone them directly into your workspace.</p>
        </div>
        <button className="h-12 px-6 rounded-full bg-[#6366f1]/10 text-[#c0c1ff] font-semibold flex items-center gap-2 hover:bg-[#6366f1]/20 transition-all border border-[#6366f1]/20">
          <Share2 className="h-4 w-4" /> Publish Yours
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {showcases.map((post, i) => (
            <motion.div 
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group glass-card overflow-hidden hover:border-[#6366f1]/30 flex flex-col"
            >
               <div className="relative h-64 overflow-hidden">
                  <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] to-transparent" />
                  
                  {/* Clone Button Overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-white/20 hover:bg-white/30 flex items-center gap-1">
                        Clone <ArrowUpRight className="h-3 w-3" />
                     </button>
                  </div>
               </div>

               <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                     <div className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">{post.avatar}</div>
                        <span className="text-sm font-medium text-gray-300">{post.creator}</span>
                     </div>
                     <h3 className="text-2xl font-bold line-clamp-2 leading-tight group-hover:text-[#c0c1ff] transition-colors cursor-pointer">{post.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-gray-400">
                     <div className="flex items-center gap-1.5 text-sm">
                        <Users className="h-4 w-4" /> {post.views}
                     </div>
                     <div className="flex items-center gap-1.5 text-sm">
                        <Heart className="h-4 w-4 hover:text-pink-500 cursor-pointer transition-colors" /> {post.likes}
                     </div>
                  </div>
               </div>
            </motion.div>
         ))}
      </div>

    </div>
  );
}
