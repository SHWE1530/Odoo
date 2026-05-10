import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plane, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/app/trips/new")({ component: NewTrip });

const presetCovers = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=70",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=70",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=70",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=70",
];
const presetTags = ["beach", "city", "food", "wellness", "adventure", "culture", "nature", "nightlife"];

function NewTrip() {
  const { addTrip } = useStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState(1500);
  const [travelers, setTravelers] = useState(1);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [cover, setCover] = useState(presetCovers[0]);

  const toggleTag = (t: string) =>
    setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/app/trips" })} className="mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Create a new trip</h2>
        <p className="text-sm text-muted-foreground">A few details and we'll spin up your itinerary canvas.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title || !destination || !startDate || !endDate) { toast.error("Fill the required fields"); return; }
          const t = addTrip({ title, destination, cover, startDate, endDate, budget, travelers, status: "planning", description, tags, shared: false });
          toast.success("Trip created ✨");
          navigate({ to: "/app/trips/$tripId", params: { tripId: t.id } });
        }}
        className="space-y-5"
      >
        <Card className="p-6 space-y-5">
          <div>
            <Label>Choose a cover</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {presetCovers.map(c => (
                <button type="button" key={c} onClick={() => setCover(c)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition ${cover === c ? "border-primary shadow-glow" : "border-transparent hover:border-border"}`}>
                  <img src={c} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Trip name *</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Bali soul reset" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dest">Primary destination *</Label>
              <Input id="dest" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Bali, Indonesia" required />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start date *</Label>
              <Input id="start" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End date *</Label>
              <Input id="end" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input id="budget" type="number" min={0} value={budget} onChange={e => setBudget(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trav">Travelers</Label>
              <Input id="trav" type="number" min={1} value={travelers} onChange={e => setTravelers(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Vibe / description</Label>
            <Textarea id="desc" value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Slow mornings, local food, sunset surfs…" />
          </div>

          <div>
            <Label className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {presetTags.map(t => (
                <button type="button" key={t} onClick={() => toggleTag(t)}>
                  <Badge variant={tags.includes(t) ? "default" : "outline"} className="capitalize cursor-pointer">{t}</Badge>
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate({ to: "/app/trips" })}>Cancel</Button>
          <Button type="submit" className="gradient-hero text-white shadow-glow hover:opacity-90"><Plane className="h-4 w-4" /> Create trip</Button>
        </div>
      </form>
    </div>
  );
}
