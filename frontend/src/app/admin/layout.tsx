"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Users, ShieldAlert } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("traveloop_access_token");
    if (!token) {
      router.push("/login");
      return;
    }
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'ADMIN') {
        router.push("/app/dashboard");
      } else {
        setIsAdmin(true);
      }
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

  if (!isAdmin) {
    return (
       <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent flex rounded-full animate-spin"></div>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex text-white relative">
      <div className="absolute top-[-30%] right-[-10%] w-[800px] h-[800px] rounded-full bg-red-900/10 blur-[150px] mix-blend-screen pointer-events-none" />
      
      {/* Heavy Admin Sidebar */}
      <aside className="w-64 glass-dark border-r border-red-500/10 flex flex-col pt-8 relative z-10">
        <div className="px-8 pb-8 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center font-bold">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <span className="text-xl font-bold tracking-tight text-red-500">Admin</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 font-medium transition-all">
            <LayoutDashboard className="h-5 w-5" /> Analytics
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-all">
            <Users className="h-5 w-5" /> User Identity
          </Link>
        </nav>

        <div className="p-4">
           <Link href="/app/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all text-left border border-white/5">
             <ArrowLeft className="h-5 w-5" /> Exit Admin
           </Link>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
