"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Compass, Briefcase, User as UserIcon, LayoutDashboard, Globe, Settings, LogOut, ShieldAlert } from "lucide-react";
import api from "@/lib/axios";

export default function ProtectedAppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("traveloop_access_token");
    if (!token) {
      router.push("/login");
    } else {
      // Decode JWT payload generically to parse roles & access instantly
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === 'ADMIN') setIsAdmin(true);
        setIsAuthorized(true);
      } catch (e) {
        localStorage.removeItem("traveloop_access_token");
        router.push("/login");
      }
    }
  }, [router]);

  if (!isAuthorized) {
    return (
       <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent flex rounded-full animate-spin"></div>
       </div>
    );
  }

  const routes = [
    { name: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
    { name: "My Trips", path: "/app/trips", icon: Briefcase },
    { name: "Explore", path: "/app/explore", icon: Compass },
    { name: "Community", path: "/app/community", icon: Globe },
    { name: "Profile", path: "/app/profile", icon: UserIcon },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex text-white relative">
      {/* Dynamic authenticated background styling */}
      <div className="absolute top-[-30%] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-blue-900/10 blur-[150px] mix-blend-screen pointer-events-none" />
      
      {/* Glass Sidebar */}
      <aside className="w-64 glass-dark border-r border-white/5 flex flex-col pt-8 relative z-10">
        <div className="px-8 pb-8 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">T</div>
          <span className="text-xl font-bold tracking-tight">Traveloop</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {routes.map((route) => {
            const isActive = pathname.startsWith(route.path);
            return (
              <Link key={route.path} href={route.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? "bg-white/10 text-white font-medium" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"}`}>
                <route.icon className={`h-5 w-5 ${isActive ? "text-blue-400" : ""}`} />
                {route.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 space-y-2">
           {isAdmin && (
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                 <ShieldAlert className="h-5 w-5" /> Admin Panel
              </Link>
           )}
           <button onClick={() => {
             localStorage.removeItem("traveloop_access_token");
             localStorage.removeItem("traveloop_refresh_token");
             router.push("/login");
           }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all text-left">
             <LogOut className="h-5 w-5" /> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
