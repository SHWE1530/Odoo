import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, User, Mail, Lock, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-12 order-2 md:order-1">
        <Card className="w-full max-w-md p-8 shadow-elegant">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero"><Sparkles className="h-4 w-4 text-white" /></div>
            <span className="font-bold">Traveloop</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Start planning in under a minute.</p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email || !name) return;
              login(email, name, city, country);
              toast.success(`Welcome aboard, ${name.split(" ")[0]} 🌴`);
              navigate({ to: "/app/dashboard" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="pl-9 h-11" required placeholder="Maya Rivers" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 h-11" required placeholder="you@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 h-11" required placeholder="At least 8 characters" minLength={8} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="h-11" placeholder="Austin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="h-11" placeholder="USA" />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 gradient-hero text-white shadow-glow hover:opacity-90">
              Create account <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-foreground font-medium hover:underline">Sign in</Link>
          </p>
        </Card>
      </div>

      <div className="relative hidden md:block overflow-hidden order-1 md:order-2">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tl from-black/50 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-10 text-white">
          <h2 className="text-4xl font-bold leading-tight max-w-md">Begin a smarter way to wander.</h2>
          <p className="mt-3 text-white/80 max-w-sm">Free forever for personal trips.</p>
        </div>
      </div>
    </div>
  );
}
