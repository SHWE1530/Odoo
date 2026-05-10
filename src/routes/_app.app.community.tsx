import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";
import { Heart, Copy, MapPin, Globe2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/app/community")({ component: Community });

const community = [
  { id: "c1", title: "10 days in Portugal", author: "Inês M.", destination: "Lisbon · Sintra · Porto", cover: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=70", likes: 412, tags: ["beach","food","culture"] },
  { id: "c2", title: "Vietnam street food run", author: "Long T.", destination: "Hanoi · Hội An · Saigon", cover: "https://images.unsplash.com/photo-1528127269322-539801943592?w=900&q=70", likes: 289, tags: ["food","city"] },
  { id: "c3", title: "Patagonia trek", author: "Sofia G.", destination: "El Chaltén · Torres del Paine", cover: "https://images.unsplash.com/photo-1531176175280-33e81d4ca7d4?w=900&q=70", likes: 651, tags: ["adventure","nature"] },
  { id: "c4", title: "Slow Kyoto in autumn", author: "Aiko S.", destination: "Kyoto, Japan", cover: "https://images.unsplash.com/photo-1493997181344-712f2f19d87a?w=900&q=70", likes: 522, tags: ["culture","wellness"] },
  { id: "c5", title: "Greek island hop", author: "Niko P.", destination: "Santorini · Milos · Naxos", cover: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&q=70", likes: 734, tags: ["beach","food"] },
  { id: "c6", title: "Banff to Jasper drive", author: "Riley B.", destination: "Alberta, Canada", cover: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=900&q=70", likes: 318, tags: ["nature","adventure"] },
];

function Community() {
  const { trips, addTrip } = useStore();
  const myShared = trips.filter(t => t.shared);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Community trips</h2>
        <p className="text-sm text-muted-foreground">Real itineraries from real travelers. Remix any trip into your own.</p>
      </div>

      {myShared.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Your public trips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myShared.map(t => (
              <Card key={t.id} className="overflow-hidden p-0">
                <div className="aspect-[16/10] overflow-hidden"><img src={t.cover} alt="" className="h-full w-full object-cover" loading="lazy" /></div>
                <div className="p-4">
                  <div className="font-semibold">{t.title}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{t.destination}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {community.map(t => (
          <Card key={t.id} className="overflow-hidden p-0 group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img src={t.cover} alt="" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
              <Badge className="absolute top-3 left-3 gap-1"><Heart className="h-3 w-3 fill-current" /> {t.likes}</Badge>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6"><AvatarFallback>{t.author.slice(0, 1)}</AvatarFallback></Avatar>
                <span className="text-xs text-muted-foreground">{t.author}</span>
              </div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1"><Globe2 className="h-3.5 w-3.5" />{t.destination}</p>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {t.tags.map(tag => <Badge key={tag} variant="outline" className="capitalize">{tag}</Badge>)}
              </div>
              <Button
                size="sm" variant="outline" className="w-full mt-4"
                onClick={() => {
                  addTrip({ title: t.title + " (copy)", destination: t.destination, cover: t.cover, startDate: new Date().toISOString().slice(0,10), endDate: new Date(Date.now()+7*864e5).toISOString().slice(0,10), budget: 2000, travelers: 1, status: "planning", description: "", tags: t.tags, shared: false });
                  toast.success("Itinerary copied to your trips");
                }}
              ><Copy className="h-3.5 w-3.5" /> Copy itinerary</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
