import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { Users, Plane, Globe2, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, Cell,
} from "recharts";

export const Route = createFileRoute("/_app/app/admin")({ component: Admin });

const signups = [
  { m: "Jan", v: 220 }, { m: "Feb", v: 340 }, { m: "Mar", v: 410 },
  { m: "Apr", v: 520 }, { m: "May", v: 690 }, { m: "Jun", v: 880 },
];
const popular = [
  { name: "Bali", v: 1820 }, { name: "Tokyo", v: 1540 }, { name: "Lisbon", v: 1320 },
  { name: "Iceland", v: 980 }, { name: "Mexico City", v: 870 },
];
const colors = ["oklch(0.62 0.18 215)", "oklch(0.74 0.18 45)", "oklch(0.65 0.18 160)", "oklch(0.7 0.2 320)", "oklch(0.75 0.17 90)"];

function Admin() {
  const { trips, user } = useStore();

  if (user?.email !== "admin@traveloop.app") {
    return <Navigate to="/app/dashboard" />;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-5">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Admin analytics</h2>
        <p className="text-sm text-muted-foreground">Platform-wide metrics & trends.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total users", value: "12,840", trend: "+8.2%" },
          { icon: Plane, label: "Trips planned", value: "42,318", trend: "+12.4%" },
          { icon: Globe2, label: "Cities tracked", value: "1,206", trend: "+3.1%" },
          { icon: TrendingUp, label: "MoM growth", value: "+18%", trend: "vs last mo." },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center"><s.icon className="h-4 w-4 text-primary" /></div>
            </div>
            <div className="text-2xl font-bold mt-2">{s.value}</div>
            <Badge variant="secondary" className="mt-2 text-[10px]">{s.trend}</Badge>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6">
          <h3 className="font-semibold mb-1">Signups</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 6 months</p>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={signups}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 220)" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="v" stroke="oklch(0.62 0.18 215)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-1">Popular destinations</h3>
          <p className="text-xs text-muted-foreground mb-4">Trips in last 30 days</p>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={popular} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 220)" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} fontSize={12} width={80} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="v" radius={[0, 8, 8, 0]}>
                  {popular.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-3">Recent trips on platform</h3>
        <div className="space-y-2">
          {trips.map(t => (
            <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50">
              <img src={t.cover} alt="" className="h-10 w-10 rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{t.title}</div>
                <div className="text-xs text-muted-foreground truncate">{t.destination}</div>
              </div>
              <Badge variant="outline" className="capitalize">{t.status}</Badge>
              <span className="text-sm font-medium tabular-nums">${t.budget}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
