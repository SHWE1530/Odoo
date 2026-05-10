import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("hello@traveloop.app");
  const [password, setPassword] = useState("demo1234");

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:block overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-between p-10 text-white">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur"><Sparkles className="h-4 w-4" /></div>
            <span className="font-bold">Traveloop</span>
          </Link>
          <div>
            <h2 className="text-4xl font-bold leading-tight max-w-md">Pick up where your wanderlust left off.</h2>
            <p className="mt-3 text-white/80 max-w-sm">Sign in to access your trips, budgets, and journal.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md p-8 shadow-elegant">
          <div className="md:hidden flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero"><Sparkles className="h-4 w-4 text-white" /></div>
            <span className="font-bold">Traveloop</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Use any email & password to demo.</p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              login(email);
              toast.success("Welcome back ✈️");
              navigate({ to: "/app/dashboard" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 h-11" required />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/login" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 h-11" required />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 gradient-hero text-white shadow-glow hover:opacity-90">
              Sign in <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            New here?{" "}
            <Link to="/register" className="text-foreground font-medium hover:underline">Create an account</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
