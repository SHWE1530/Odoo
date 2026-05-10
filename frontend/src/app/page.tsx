"use client";

import Link from "next/link";
import { ArrowRight, Globe2, Wallet, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[120px] mix-blend-screen" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-dark border-b-0 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe2 className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold tracking-tight">Traveloop.</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-blue-400 transition-colors py-2">
              Sign In
            </Link>
            <Link href="/login?tab=register" className="text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark mb-6 border-white/10 uppercase tracking-widest text-[10px] text-blue-300 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Travel Planning 2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
            Design your journey,<br/>
            <span className="gradient-text">automate the chaos.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            The premium collaborative platform transforming the way individuals plan, visualize, and budget massive multi-city itineraries.
          </p>

          <Link href="/login?tab=register" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-1">
            Start Planning Free <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6 mt-24 text-left w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-dark p-8 rounded-3xl"
          >
            <div className="h-12 w-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
              <Globe2 className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Infinite Exploration</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Organize infinite travel stops across multiple continents efficiently without losing track of your timezone alignment.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-dark p-8 rounded-3xl"
          >
            <div className="h-12 w-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Wallet className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Predictive Budgeting</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Visualize overarching timelines and estimate your overarching expenditures dynamically tracking every cent.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="glass-dark p-8 rounded-3xl"
          >
            <div className="h-12 w-12 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Collaboration</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Share beautifully crafted PDF itineraries and split public plans safely over collaborative dashboard channels.</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
