import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MapPin, Calendar, Users, Search, Plane } from "lucide-react";

export const Route = createFileRoute("/_app/app/trips/")({ component: TripsList });

function TripsList() {
  const { trips } = useStore();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = trips
    .filter(t => tab === "all" || t.status === tab)
    .filter(t => !q || t.title.toLowerCase().includes(q.toLowerCase()) || t.destination.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My trips</h2>
          <p className="text-sm text-muted-foreground">All your past, planned and dream trips.</p>
        </div>
        <Button asChild className="gradient-hero text-white shadow-glow hover:opacity-90">
          <Link to="/app/trips/new"><Plus className="h-4 w-4" /> New trip</Link>
        </Button>
      </div>

      <Card className="p-3 mb-5 flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by title or destination" className="pl-9 h-10" />
        </div>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <Plane className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-semibold">No trips yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Start planning your next adventure.</p>
          <Button asChild className="mt-4 gradient-hero text-white"><Link to="/app/trips/new">Create trip</Link></Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(t => (
            <Link key={t.id} to="/app/trips/$tripId" params={{ tripId: t.id }} className="group">
              <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 p-0">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={t.cover} alt="" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                  <Badge className="absolute top-3 left-3 capitalize" variant={t.status === "upcoming" ? "default" : t.status === "planning" ? "secondary" : "outline"}>{t.status}</Badge>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg leading-tight">{t.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1.5"><MapPin className="h-3.5 w-3.5" />{t.destination}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(t.startDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{t.travelers}</span>
                    <span className="ml-auto font-medium text-foreground">${t.budget}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
