import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, Map, Wallet, ListChecks, BookOpen, Users,
  ArrowRight, Plane, Star, TrendingUp, Globe2,
} from "lucide-react";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Traveloop — AI-powered trip planning, beautifully" },
      { name: "description", content: "Plan multi-city trips, track budgets, build packing lists, journal your journey, and discover itineraries from a community of travelers." },
      { property: "og:title", content: "Traveloop — AI-powered trip planning" },
      { property: "og:description", content: "Multi-city itineraries, smart budgets, packing & community trips." },
      { property: "og:image", content: "/og.jpg" },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Map, title: "Multi-city itineraries", desc: "Drag, drop, and reorder cities. A living map of your trip." },
  { icon: Wallet, title: "Smart budgets", desc: "Track expenses by day & category. See where every dollar goes." },
  { icon: ListChecks, title: "Packing checklists", desc: "Templates by trip type. Never forget the adapter again." },
  { icon: BookOpen, title: "Trip journal", desc: "Day-by-day notes & memories that travel with you." },
  { icon: Users, title: "Community trips", desc: "Discover and remix itineraries from real travelers." },
  { icon: Sparkles, title: "AI suggestions", desc: "Activity ideas tuned to your vibe and your dates." },
];

const testimonials = [
  { name: "Maya R.", role: "Solo traveler", quote: "It's like Notion + Google Maps had a beautifully designed baby. Booked Bali in an afternoon." },
  { name: "Jordan K.", role: "Couple, 12 trips", quote: "The budget chart alone paid for itself. We finally stopped fighting about expenses." },
  { name: "Priya S.", role: "Family of 4", quote: "Packing lists by kid, journal entries with photos. My new family-trip command center." },
];

const stats = [
  { label: "Trips planned", value: "42K+" },
  { label: "Cities covered", value: "1,200" },
  { label: "Avg. saved/trip", value: "$340" },
  { label: "Community itineraries", value: "8.6K" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Floating nav */}
      <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(96%,1100px)]">
        <div className="glass shadow-soft rounded-2xl flex items-center justify-between px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold tracking-tight">Traveloop</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#community" className="hover:text-foreground transition">Community</a>
            <a href="#testimonials" className="hover:text-foreground transition">Loved by</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm"><Link to="/login">Sign in</Link></Button>
            <Button asChild size="sm" className="gradient-hero text-white shadow-glow hover:opacity-90">
              <Link to="/register">Start free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-30 dark:opacity-25" width={1600} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full gradient-sunset blur-3xl opacity-30 animate-float -z-10" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full gradient-ocean blur-3xl opacity-30 animate-float -z-10" />

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-6 gap-1.5 py-1.5 px-3 rounded-full">
              <Sparkles className="h-3.5 w-3.5" /> AI-assisted itineraries · v1.0
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
              Plan trips that feel <span className="text-gradient">unforgettable</span>.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              From the spark of an idea to the last sunset — multi-city itineraries,
              budgets, packing lists, and a journal, all in one beautiful place.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="gradient-hero text-white shadow-glow hover:opacity-90 text-base h-12 px-7">
                <Link to="/register">Plan my first trip <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base h-12 px-7">
                <Link to="/app/community">Browse community trips</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
              {stats.map(s => (
                <div key={s.label} className="glass rounded-2xl px-4 py-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-3">Features</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything for the perfect trip</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">A calm, focused workspace for the messy magic of travel planning.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Card key={f.title} className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/60">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-hero shadow-glow mb-4">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="mt-4 text-xs text-muted-foreground/70 font-mono">0{i + 1}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community showcase */}
      <section id="community" className="py-20 md:py-28 bg-muted/40">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <Badge variant="outline" className="mb-3">Community</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Trips by real travelers</h2>
            </div>
            <Button asChild variant="ghost"><Link to="/app/community">Explore all <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { t: "10 days in Portugal", d: "Lisbon · Sintra · Porto", img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=70" },
              { t: "Vietnam street-food run", d: "Hanoi · Hội An · Saigon", img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=900&q=70" },
              { t: "Patagonia trek", d: "El Chaltén · Torres del Paine", img: "https://images.unsplash.com/photo-1531176175280-33e81d4ca7d4?w=900&q=70" },
            ].map(c => (
              <Card key={c.t} className="overflow-hidden group cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 p-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.t} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{c.t}</h3>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5" />{c.d}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Loved by travelers</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">A travel companion you'll keep using</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-0.5 mb-3 text-[oklch(0.78_0.18_70)]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 pt-5 border-t">
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl gradient-hero text-white p-10 md:p-16 text-center shadow-glow">
            <div className="absolute -top-10 -right-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <Plane className="h-10 w-10 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto">Your next adventure is one plan away.</h2>
            <p className="mt-4 text-white/85 max-w-xl mx-auto">Start free. No credit card. Bring your wanderlust.</p>
            <Button asChild size="lg" variant="secondary" className="mt-8 h-12 px-8 text-base">
              <Link to="/register">Create my trip <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md gradient-hero">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span>© {new Date().getFullYear()} Traveloop</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Built for explorers</span>
            <Link to="/login" className="hover:text-foreground">Sign in</Link>
            <Link to="/register" className="hover:text-foreground">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
