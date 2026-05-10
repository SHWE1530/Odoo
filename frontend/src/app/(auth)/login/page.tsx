"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe2, Mail, Lock, User as UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/axios";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isLogin, setIsLogin] = useState(searchParams.get("tab") !== "register");
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (isLogin) {
        const res = await api.post("/auth/login", data);
        localStorage.setItem("traveloop_access_token", res.data.tokens.accessToken);
        router.push("/app/dashboard");
        toast.success("Welcome back!");
      } else {
        await api.post("/auth/register", data);
        setEmailToVerify(data.email);
        setOtpMode(true);
        toast.info("Please check your email for OTP");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { email: emailToVerify, code: otp, purpose: "EMAIL_VERIFICATION" });
      localStorage.setItem("traveloop_access_token", res.data.tokens.accessToken);
      router.push("/app/dashboard");
      toast.success("Email verified successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050505] text-white overflow-hidden relative">
      <div className="absolute top-0 left-[-20%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-[-20%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[150px] mix-blend-screen pointer-events-none" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex h-12 w-12 rounded-xl bg-blue-500/10 items-center justify-center mb-4 border border-blue-500/20">
            <Globe2 className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {otpMode ? "Verify your email" : isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {otpMode ? `We sent a 6-digit code to ${emailToVerify}` : "Explore the world precisely curated to your style."}
          </p>
        </div>

        <div className="glass-dark p-8 rounded-3xl">
          {otpMode ? (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 text-center">Secure Code</label>
                <input type="text" maxLength={6} required value={otp} onChange={e => setOtp(e.target.value)} placeholder="000000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-center tracking-widest text-xl transition-all" />
              </div>
              <button disabled={loading} type="submit" className="w-full bg-white text-black font-semibold rounded-xl py-3 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                {loading ? <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : "Verify Code"}
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="popLayout">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Full Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input {...register("name")} placeholder="Maya Rivers" className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-blue-500 transition-all text-sm" />
                      </div>
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message as string}</p>}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input {...register("email")} type="email" placeholder="maya@traveloop.app" className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-blue-500 transition-all text-sm" />
                    </div>
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message as string}</p>}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Password</label>
                      {isLogin && <button type="button" className="text-xs text-blue-400 hover:underline">Forgot?</button>}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input {...register("password")} type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-blue-500 transition-all text-sm" />
                    </div>
                    {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message as string}</p>}
                  </div>
                </motion.div>
              </AnimatePresence>

              <button disabled={loading} type="submit" className="w-full bg-white text-black font-semibold rounded-xl py-3 mt-6 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                {loading ? <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"} 
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {!otpMode && (
            <p className="text-center text-sm text-gray-500 mt-8">
              {isLogin ? "New here? " : "Already planning with us? "}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-white hover:text-blue-400 font-medium transition-colors">
                {isLogin ? "Register now" : "Log in securely"}
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
