import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Star, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_app/app/explore")({ component: Explore });

const cities = [
  { name: "Lisbon", country: "Portugal", img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=70", rating: 4.8, trending: true, tags: ["beach", "food"] },
  { name: "Tokyo", country: "Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=70", rating: 4.9, trending: true, tags: ["city", "food"] },
  { name: "Marrakech", country: "Morocco", img: "https://images.unsplash.com/photo-1597212720174-f8a7d6d68ade?w=900&q=70", rating: 4.6, trending: false, tags: ["culture", "shopping"] },
  { name: "Reykjavík", country: "Iceland", img: "https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?w=900&q=70", rating: 4.7, trending: false, tags: ["nature", "adventure"] },
  { name: "Bali", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=70", rating: 4.9, trending: true, tags: ["beach", "wellness"] },
  { name: "Mexico City", country: "Mexico", img: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=900&q=70", rating: 4.7, trending: true, tags: ["food", "culture"] },
];

const activities = [
  { title: "Surfing class — Canggu", city: "Bali", category: "Adventure", price: 35 },
  { title: "Sushi-making workshop", city: "Tokyo", category: "Food", price: 80 },
  { title: "Sintra day trip", city: "Lisbon", category: "Culture", price: 60 },
  { title: "Northern lights tour", city: "Reykjavík", category: "Nature", price: 95 },
  { title: "Medina food walk", city: "Marrakech", category: "Food", price: 40 },
  { title: "Frida Kahlo museum + Coyoacán", city: "Mexico City", category: "Culture", price: 25 },
];

function Explore() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("cities");
  const filteredCities = cities.filter(c => !q || (c.name + c.country + c.tags.join("")).toLowerCase().includes(q.toLowerCase()));
  const filteredActs = activities.filter(a => !q || (a.title + a.city + a.category).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Explore</h2>
        <p className="text-sm text-muted-foreground">Find your next destination & activities.</p>
      </div>

      <Card className="p-3 mb-5 flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search cities, activities, vibes…" className="pl-9 h-10" />
        </div>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="cities">Cities</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {tab === "cities" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCities.map(c => (
            <Card key={c.name} className="overflow-hidden group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 p-0">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={c.img} alt="" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                {c.trending && <Badge className="absolute top-3 left-3 gap-1"><TrendingUp className="h-3 w-3" /> Trending</Badge>}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs flex items-center gap-1"><Star className="h-3 w-3 fill-current" /> {c.rating}</div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg">{c.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{c.country}</p>
                <div className="flex gap-1.5 mt-3 flex-wrap">{c.tags.map(t => <Badge key={t} variant="outline" className="capitalize">{t}</Badge>)}</div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredActs.map(a => (
            <Card key={a.title} className="p-5 flex items-center gap-4 hover:shadow-elegant transition">
              <div className="h-12 w-12 rounded-xl gradient-ocean flex items-center justify-center text-white font-bold">{a.city.slice(0, 1)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-xs text-muted-foreground">{a.city} · {a.category}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-gradient">${a.price}</div>
                <Button size="sm" variant="outline" className="mt-1">Add</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
