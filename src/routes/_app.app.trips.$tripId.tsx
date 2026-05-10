import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft, MapPin, Calendar, Users, Wallet, Trash2, Plus, Share2,
  Plane, Hotel, Utensils, Sparkles, ListChecks, BookOpen, FileText,
  Printer, Download, Globe2,
} from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from "recharts";

export const Route = createFileRoute("/_app/app/trips/$tripId")({ component: TripDetail });

function TripDetail() {
  const { tripId } = useParams({ from: "/_app/app/trips/$tripId" });
  const navigate = useNavigate();
  const store = useStore();
  const trip = store.trips.find(t => t.id === tripId);

  if (!trip) {
    return (
      <div className="p-12 text-center">
        <h2 className="font-semibold">Trip not found</h2>
        <Button onClick={() => navigate({ to: "/app/trips" })} className="mt-4">Back to trips</Button>
      </div>
    );
  }

  const stops = store.stops.filter(s => s.tripId === trip.id).sort((a, b) => a.order - b.order);
  const acts = store.activities.filter(a => a.tripId === trip.id);
  const expenses = store.expenses.filter(e => e.tripId === trip.id);
  const checklist = store.checklist.filter(c => c.tripId === trip.id);
  const notes = store.notes.filter(n => n.tripId === trip.id);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={trip.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <Button variant="secondary" size="sm" onClick={() => navigate({ to: "/app/trips" })} className="absolute top-4 left-4">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => { store.updateTrip(trip.id, { shared: !trip.shared }); toast.success(trip.shared ? "Made private" : "Now public on community ✨"); }}>
            <Share2 className="h-4 w-4" /> {trip.shared ? "Public" : "Share"}
          </Button>
          <Button size="sm" variant="destructive" onClick={() => { store.deleteTrip(trip.id); toast.success("Trip deleted"); navigate({ to: "/app/trips" }); }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="px-4 md:px-8 -mt-16 relative space-y-5">
        <Card className="p-6 shadow-elegant">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Badge variant="secondary" className="capitalize mb-2">{trip.status}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{trip.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{trip.destination}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{new Date(trip.startDate).toLocaleDateString()} – {new Date(trip.endDate).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{trip.travelers}</span>
                <span className="flex items-center gap-1.5"><Wallet className="h-4 w-4" />${trip.budget}</span>
              </div>
              {trip.description && <p className="text-sm text-muted-foreground mt-3 max-w-2xl">{trip.description}</p>}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {trip.tags.map(t => <Badge key={t} variant="outline" className="capitalize">{t}</Badge>)}
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="itinerary" className="pb-12">
          <TabsList className="grid grid-cols-5 max-w-2xl">
            <TabsTrigger value="itinerary"><Plane className="h-3.5 w-3.5" /> Itinerary</TabsTrigger>
            <TabsTrigger value="budget"><Wallet className="h-3.5 w-3.5" /> Budget</TabsTrigger>
            <TabsTrigger value="checklist"><ListChecks className="h-3.5 w-3.5" /> Packing</TabsTrigger>
            <TabsTrigger value="notes"><BookOpen className="h-3.5 w-3.5" /> Journal</TabsTrigger>
            <TabsTrigger value="invoice"><FileText className="h-3.5 w-3.5" /> Invoice</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="mt-5">
            <ItineraryTab tripId={trip.id} stops={stops} acts={acts} />
          </TabsContent>
          <TabsContent value="budget" className="mt-5">
            <BudgetTab tripId={trip.id} budget={trip.budget} expenses={expenses} />
          </TabsContent>
          <TabsContent value="checklist" className="mt-5">
            <ChecklistTab tripId={trip.id} items={checklist} />
          </TabsContent>
          <TabsContent value="notes" className="mt-5">
            <NotesTab tripId={trip.id} notes={notes} />
          </TabsContent>
          <TabsContent value="invoice" className="mt-5">
            <InvoiceTab trip={trip} expenses={expenses} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ---------- Tabs ---------- */

function ItineraryTab({ tripId, stops, acts }: { tripId: string; stops: any[]; acts: any[] }) {
  const { addStop, removeStop, addActivity, toggleActivity, removeActivity } = useStore();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [nights, setNights] = useState(2);
  const [arrival, setArrival] = useState("");

  const [actTitle, setActTitle] = useState("");
  const [actDay, setActDay] = useState(1);
  const [actCat, setActCat] = useState("Food");
  const [actCost, setActCost] = useState(20);

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card className="p-5 lg:col-span-2">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Globe2 className="h-4 w-4" /> Cities & stops</h3>
        {stops.length === 0 ? (
          <p className="text-sm text-muted-foreground">No stops yet. Add your first city below.</p>
        ) : (
          <div className="relative pl-6 space-y-4">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
            {stops.map((s, i) => (
              <div key={s.id} className="relative">
                <div className="absolute -left-[18px] top-2 h-4 w-4 rounded-full gradient-hero ring-4 ring-background" />
                <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition">
                  <div>
                    <div className="font-medium">{s.city}, {s.country}</div>
                    <div className="text-xs text-muted-foreground">Day {i * 2 + 1} · {s.nights} nights · arrives {new Date(s.arrivalDate).toLocaleDateString()}</div>
                    {s.notes && <div className="text-xs mt-1">{s.notes}</div>}
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => removeStop(s.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 pt-5 border-t grid md:grid-cols-5 gap-2">
          <Input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
          <Input placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
          <Input type="date" value={arrival} onChange={e => setArrival(e.target.value)} />
          <Input type="number" min={1} value={nights} onChange={e => setNights(Number(e.target.value))} placeholder="Nights" />
          <Button onClick={() => {
            if (!city) return toast.error("Add a city");
            addStop({ tripId, city, country, nights, arrivalDate: arrival || new Date().toISOString().slice(0, 10), order: stops.length });
            setCity(""); setCountry(""); setArrival("");
            toast.success("Stop added");
          }}><Plus className="h-4 w-4" /> Add stop</Button>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Sparkles className="h-4 w-4" /> Activities</h3>
        {acts.length === 0 ? <p className="text-sm text-muted-foreground">Plan something fun.</p> : (
          <div className="space-y-2">
            {acts.sort((a, b) => a.day - b.day).map(a => (
              <div key={a.id} className={`p-3 rounded-lg border ${a.done ? "bg-muted/40" : ""}`}>
                <div className="flex items-start gap-2">
                  <Checkbox checked={a.done} onCheckedChange={() => toggleActivity(a.id)} className="mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${a.done ? "line-through text-muted-foreground" : ""}`}>{a.title}</div>
                    <div className="text-xs text-muted-foreground">Day {a.day} · {a.category} · ${a.cost}</div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => removeActivity(a.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t space-y-2">
          <Input placeholder="Activity title" value={actTitle} onChange={e => setActTitle(e.target.value)} />
          <div className="grid grid-cols-3 gap-2">
            <Input type="number" min={1} value={actDay} onChange={e => setActDay(Number(e.target.value))} placeholder="Day" />
            <Select value={actCat} onValueChange={setActCat}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Food", "Adventure", "Culture", "Nature", "Stay", "Transport"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="number" min={0} value={actCost} onChange={e => setActCost(Number(e.target.value))} placeholder="$" />
          </div>
          <Button className="w-full" onClick={() => {
            if (!actTitle) return toast.error("Title required");
            addActivity({ tripId, title: actTitle, day: actDay, category: actCat, cost: actCost, time: "10:00", location: "", done: false });
            setActTitle("");
            toast.success("Activity added");
          }}><Plus className="h-4 w-4" /> Add activity</Button>
        </div>
      </Card>
    </div>
  );
}

function BudgetTab({ tripId, budget, expenses }: { tripId: string; budget: number; expenses: any[] }) {
  const { addExpense, removeExpense } = useStore();
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(50);
  const [cat, setCat] = useState("Food");

  const total = expenses.reduce((a, e) => a + e.amount, 0);
  const pct = budget ? Math.min(100, (total / budget) * 100) : 0;

  const byCat = Object.entries(
    expenses.reduce<Record<string, number>>((a, e) => { a[e.category] = (a[e.category] ?? 0) + e.amount; return a; }, {})
  ).map(([name, value]) => ({ name, value }));
  const colors = ["oklch(0.62 0.18 215)", "oklch(0.74 0.18 45)", "oklch(0.65 0.18 160)", "oklch(0.7 0.2 320)", "oklch(0.75 0.17 90)"];

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card className="p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold">Spend vs budget</h3>
            <p className="text-xs text-muted-foreground">${total.toLocaleString()} of ${budget.toLocaleString()}</p>
          </div>
          <Badge variant={pct > 100 ? "destructive" : pct > 80 ? "secondary" : "default"}>{Math.round(pct)}%</Badge>
        </div>
        <Progress value={pct} className="h-2.5 mb-6" />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byCat}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 220)" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {byCat.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-3">Expenses</h3>
        <div className="space-y-2 max-h-72 overflow-auto">
          {expenses.map(e => (
            <div key={e.id} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50">
              <div>
                <div className="text-sm font-medium">{e.label}</div>
                <div className="text-xs text-muted-foreground">{e.category}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium tabular-nums">${e.amount}</span>
                <Button size="icon" variant="ghost" onClick={() => removeExpense(e.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t space-y-2">
          <Input placeholder="Label (e.g. Flights)" value={label} onChange={e => setLabel(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Transport", "Stay", "Food", "Activities", "Shopping", "Other"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="number" min={0} value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="$" />
          </div>
          <Button className="w-full" onClick={() => {
            if (!label) return toast.error("Label required");
            addExpense({ tripId, label, amount, category: cat, date: new Date().toISOString().slice(0, 10) });
            setLabel("");
            toast.success("Expense added");
          }}><Plus className="h-4 w-4" /> Add expense</Button>
        </div>
      </Card>
    </div>
  );
}

function ChecklistTab({ tripId, items }: { tripId: string; items: any[] }) {
  const { addChecklist, togglePacked, removeChecklist } = useStore();
  const [label, setLabel] = useState("");
  const [cat, setCat] = useState("Clothing");
  const grouped: Record<string, any[]> = {};
  items.forEach(i => { (grouped[i.category] ??= []).push(i); });
  const packed = items.filter(i => i.packed).length;
  const pct = items.length ? Math.round(packed / items.length * 100) : 0;

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card className="p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Packing checklist</h3>
            <p className="text-xs text-muted-foreground">{packed} of {items.length} packed</p>
          </div>
          <Badge>{pct}%</Badge>
        </div>
        <Progress value={pct} className="h-2 mb-5" />
        {items.length === 0 ? <p className="text-sm text-muted-foreground">Empty list — add your essentials below.</p> : (
          <div className="space-y-5">
            {Object.entries(grouped).map(([category, list]) => (
              <div key={category}>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{category}</div>
                <div className="space-y-1.5">
                  {list.map((c: any) => (
                    <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 group">
                      <Checkbox checked={c.packed} onCheckedChange={() => togglePacked(c.id)} />
                      <span className={`flex-1 text-sm ${c.packed ? "line-through text-muted-foreground" : ""}`}>{c.label}</span>
                      <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100" onClick={() => removeChecklist(c.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-3">Add item</h3>
        <div className="space-y-2">
          <Input placeholder="Reef-safe sunscreen" value={label} onChange={e => setLabel(e.target.value)} />
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Clothing", "Toiletries", "Tech", "Documents", "Health", "Other"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button className="w-full" onClick={() => {
            if (!label) return toast.error("Item required");
            addChecklist({ tripId, label, category: cat, packed: false });
            setLabel("");
          }}><Plus className="h-4 w-4" /> Add</Button>
        </div>
        <div className="mt-5 pt-5 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-2">Quick add</p>
          <div className="flex flex-wrap gap-1.5">
            {["Passport", "Charger", "Sunglasses", "Headphones", "Toothbrush"].map(q => (
              <Button key={q} size="sm" variant="outline" className="h-7" onClick={() => {
                addChecklist({ tripId, label: q, category: "Other", packed: false });
              }}>{q}</Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function NotesTab({ tripId, notes }: { tripId: string; notes: any[] }) {
  const { addNote, removeNote } = useStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [day, setDay] = useState(1);

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card className="p-6 lg:col-span-2">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><BookOpen className="h-4 w-4" /> Trip journal</h3>
        {notes.length === 0 ? <p className="text-sm text-muted-foreground">Capture moments, day by day.</p> : (
          <div className="space-y-3">
            {notes.map(n => (
              <div key={n.id} className="p-4 rounded-xl bg-muted/40 group">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Day {n.day}</Badge>
                    <span className="font-medium">{n.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString()}</span>
                    <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100" onClick={() => removeNote(n.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <p className="text-sm mt-2 leading-relaxed">{n.body}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-3">New entry</h3>
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2"><Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /></div>
            <Input type="number" min={1} value={day} onChange={e => setDay(Number(e.target.value))} placeholder="Day" />
          </div>
          <Textarea rows={6} placeholder="What happened today?" value={body} onChange={e => setBody(e.target.value)} />
          <Button className="w-full" onClick={() => {
            if (!title || !body) return toast.error("Title and body required");
            addNote({ tripId, title, body, day, date: new Date().toISOString().slice(0, 10) });
            setTitle(""); setBody("");
            toast.success("Saved 📝");
          }}><Plus className="h-4 w-4" /> Save entry</Button>
        </div>
      </Card>
    </div>
  );
}

function InvoiceTab({ trip, expenses }: { trip: any; expenses: any[] }) {
  const total = expenses.reduce((a, e) => a + e.amount, 0);
  const tax = Math.round(total * 0.08 * 100) / 100;
  const grand = total + tax;
  return (
    <Card className="p-8 print:shadow-none print:border-0">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-10 w-10 rounded-xl gradient-hero flex items-center justify-center"><Sparkles className="h-5 w-5 text-white" /></div>
            <span className="font-bold text-lg">Traveloop</span>
          </div>
          <div className="text-xs text-muted-foreground">Trip expense invoice</div>
          <div className="text-2xl font-bold mt-2">{trip.title}</div>
          <div className="text-sm text-muted-foreground">{trip.destination}</div>
        </div>
        <div className="text-right text-sm">
          <div className="text-muted-foreground">Invoice #</div>
          <div className="font-mono font-medium">TRV-{trip.id.toUpperCase()}-{new Date().getFullYear()}</div>
          <div className="text-muted-foreground mt-3">Date</div>
          <div className="font-medium">{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <div className="border-t border-b py-3 grid grid-cols-12 text-xs uppercase tracking-wider text-muted-foreground font-medium">
        <div className="col-span-6">Item</div>
        <div className="col-span-3">Category</div>
        <div className="col-span-3 text-right">Amount</div>
      </div>
      {expenses.map(e => (
        <div key={e.id} className="grid grid-cols-12 py-3 border-b text-sm">
          <div className="col-span-6">{e.label} <span className="text-muted-foreground text-xs ml-2">{new Date(e.date).toLocaleDateString()}</span></div>
          <div className="col-span-3 text-muted-foreground">{e.category}</div>
          <div className="col-span-3 text-right font-medium tabular-nums">${e.amount.toFixed(2)}</div>
        </div>
      ))}

      <div className="mt-6 ml-auto max-w-xs space-y-1.5 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">${total.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Service & taxes (8%)</span><span className="tabular-nums">${tax.toFixed(2)}</span></div>
        <div className="flex justify-between pt-2 border-t font-bold text-lg"><span>Total</span><span className="tabular-nums text-gradient">${grand.toFixed(2)}</span></div>
      </div>

      <div className="mt-8 flex gap-2 justify-end print:hidden">
        <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4" /> Print</Button>
        <Button className="gradient-hero text-white shadow-glow hover:opacity-90" onClick={() => toast.success("Demo: PDF export coming soon")}><Download className="h-4 w-4" /> Download</Button>
      </div>
    </Card>
  );
}
