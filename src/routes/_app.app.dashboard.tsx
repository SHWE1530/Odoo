import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plane, MapPin, Calendar, Wallet, TrendingUp, ArrowRight,
  Compass, Sparkles, ListChecks,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/_app/app/dashboard")({ component: Dashboard });

function Dashboard() {
  const { trips, expenses, checklist, user } = useStore();
  const upcoming = trips.filter(t => t.status === "upcoming");
  const planning = trips.filter(t => t.status === "planning");
  const totalSpend = expenses.reduce((a, e) => a + e.amount, 0);
  const packedPct = checklist.length ? Math.round(checklist.filter(c => c.packed).length / checklist.length * 100) : 0;

  const spendByCat = Object.entries(
    expenses.reduce<Record<string, number>>((acc, e) => { acc[e.category] = (acc[e.category] ?? 0) + e.amount; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  const colors = ["oklch(0.62 0.18 215)", "oklch(0.74 0.18 45)", "oklch(0.65 0.18 160)", "oklch(0.7 0.2 320)", "oklch(0.75 0.17 90)"];

  const trend = [
    { m: "Jan", spend: 320 }, { m: "Feb", spend: 480 }, { m: "Mar", spend: 220 },
    { m: "Apr", spend: 690 }, { m: "May", spend: 540 }, { m: "Jun", spend: 1240 },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Greeting */}
      <div className="relative overflow-hidden rounded-3xl gradient-hero text-white p-6 md:p-10 shadow-glow">
        <div className="absolute -top-10 -right-10 h-60 w-60 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Badge className="bg-white/20 hover:bg-white/25 text-white border-0 mb-3"><Sparkles className="h-3 w-3" /> Hello {user?.name?.split(" ")[0] ?? "explorer"}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Where to next?</h1>
            <p className="text-white/85 mt-1 max-w-md">{upcoming.length} upcoming · {planning.length} in planning · let's make them legendary.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="secondary" className="h-10"><Link to="/app/trips/new"><Plane className="h-4 w-4" /> New trip</Link></Button>
            <Button asChild variant="ghost" className="h-10 text-white hover:bg-white/15 hover:text-white"><Link to="/app/explore">Explore <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Plane} label="Total trips" value={trips.length.toString()} />
        <StatCard icon={Calendar} label="Upcoming" value={upcoming.length.toString()} />
        <StatCard icon={Wallet} label="Tracked spend" value={`$${totalSpend.toLocaleString()}`} />
        <StatCard icon={ListChecks} label="Packed" value={`${packedPct}%`} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Spend trend</h3>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </div>
            <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3 w-3" /> +18%</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.18 215)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.62 0.18 215)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tickLine={false} axisLine={false} stroke="oklch(0.5 0.03 230)" fontSize={12} />
                <YAxis tickLine={false} axisLine={false} stroke="oklch(0.5 0.03 230)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="spend" stroke="oklch(0.62 0.18 215)" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-1">By category</h3>
          <p className="text-xs text-muted-foreground mb-4">All-time</p>
          <div className="h-48">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={spendByCat} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {spendByCat.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {spendByCat.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: colors[i % colors.length] }} />{c.name}</div>
                <span className="font-medium">${c.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Trips & checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Your trips</h3>
            <Button asChild size="sm" variant="ghost"><Link to="/app/trips">See all <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {trips.slice(0, 4).map(t => (
              <Link key={t.id} to="/app/trips/$tripId" params={{ tripId: t.id }} className="group">
                <div className="flex gap-3 p-3 rounded-xl hover:bg-muted/60 transition border border-transparent hover:border-border">
                  <img src={t.cover} alt="" className="h-16 w-16 rounded-lg object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium truncate">{t.title}</div>
                      <Badge variant={t.status === "upcoming" ? "default" : t.status === "planning" ? "secondary" : "outline"} className="capitalize text-[10px]">{t.status}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" />{t.destination}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{new Date(t.startDate).toLocaleDateString()} · ${t.budget}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Packing progress</h3>
            <Compass className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold mb-1">{packedPct}%</div>
          <Progress value={packedPct} className="h-2" />
          <div className="mt-4 space-y-2">
            {checklist.slice(0, 4).map(c => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <span className={c.packed ? "line-through text-muted-foreground" : ""}>{c.label}</span>
                <Badge variant="outline" className="text-[10px]">{c.category}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="h-4 w-4 text-primary" /></div>
      </div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </Card>
  );
}
