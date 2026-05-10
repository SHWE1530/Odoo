// Mock data store using React context + localStorage. Will be swapped to Supabase later.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Trip = {
  id: string;
  title: string;
  destination: string;
  cover: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  status: "planning" | "upcoming" | "completed";
  description: string;
  tags: string[];
  shared: boolean;
  authorName?: string;
};

export type Stop = {
  id: string; tripId: string; city: string; country: string;
  arrivalDate: string; nights: number; notes?: string; order: number;
};
export type Activity = {
  id: string; tripId: string; stopId?: string; title: string; category: string;
  day: number; time: string; cost: number; location: string; done: boolean;
};
export type Expense = { id: string; tripId: string; label: string; category: string; amount: number; date: string; };
export type ChecklistItem = { id: string; tripId: string; label: string; category: string; packed: boolean; };
export type Note = { id: string; tripId: string; day: number; title: string; body: string; date: string; };

const uid = () => Math.random().toString(36).slice(2, 10);

const seedTrips: Trip[] = [
  { id: "t1", title: "Bali Soul Reset", destination: "Bali, Indonesia", cover: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=70", startDate: "2026-06-12", endDate: "2026-06-22", budget: 2400, travelers: 2, status: "upcoming", description: "Beaches, temples, rice terraces — slow mornings & sunset surfs.", tags: ["beach","wellness","food"], shared: true, authorName: "You" },
  { id: "t2", title: "Tokyo Neon Week", destination: "Tokyo, Japan", cover: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=70", startDate: "2026-09-04", endDate: "2026-09-11", budget: 3200, travelers: 1, status: "planning", description: "Ramen crawl, Shibuya nights, day trip to Hakone.", tags: ["city","food","culture"], shared: false },
  { id: "t3", title: "Iceland Ring Road", destination: "Reykjavík, Iceland", cover: "https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?w=1200&q=70", startDate: "2025-11-02", endDate: "2025-11-12", budget: 4100, travelers: 2, status: "completed", description: "Glaciers, geysers, Northern lights along the full ring road.", tags: ["adventure","nature"], shared: true, authorName: "You" },
];

const seedStops: Stop[] = [
  { id: "s1", tripId: "t1", city: "Canggu", country: "Indonesia", arrivalDate: "2026-06-12", nights: 4, order: 0, notes: "Surf + cafés" },
  { id: "s2", tripId: "t1", city: "Ubud", country: "Indonesia", arrivalDate: "2026-06-16", nights: 3, order: 1, notes: "Yoga & rice terraces" },
  { id: "s3", tripId: "t1", city: "Uluwatu", country: "Indonesia", arrivalDate: "2026-06-19", nights: 3, order: 2, notes: "Cliffside sunsets" },
];
const seedActivities: Activity[] = [
  { id: "a1", tripId: "t1", title: "Sunrise surf at Batu Bolong", category: "Adventure", day: 1, time: "06:00", cost: 25, location: "Canggu", done: true },
  { id: "a2", tripId: "t1", title: "Smoothie bowl at Crate Café", category: "Food", day: 1, time: "09:00", cost: 12, location: "Canggu", done: false },
  { id: "a3", tripId: "t1", title: "Tegallalang rice terrace walk", category: "Nature", day: 5, time: "08:00", cost: 8, location: "Ubud", done: false },
  { id: "a4", tripId: "t1", title: "Uluwatu temple + Kecak dance", category: "Culture", day: 8, time: "17:00", cost: 18, location: "Uluwatu", done: false },
];
const seedExpenses: Expense[] = [
  { id: "e1", tripId: "t1", label: "Flights", category: "Transport", amount: 820, date: "2026-05-01" },
  { id: "e2", tripId: "t1", label: "Villa - Canggu", category: "Stay", amount: 480, date: "2026-06-12" },
  { id: "e3", tripId: "t1", label: "Scooter rental", category: "Transport", amount: 60, date: "2026-06-13" },
  { id: "e4", tripId: "t1", label: "Food week 1", category: "Food", amount: 210, date: "2026-06-18" },
  { id: "e5", tripId: "t1", label: "Activities", category: "Activities", amount: 180, date: "2026-06-20" },
];
const seedChecklist: ChecklistItem[] = [
  { id: "c1", tripId: "t1", label: "Passport", category: "Documents", packed: true },
  { id: "c2", tripId: "t1", label: "Reef-safe sunscreen", category: "Toiletries", packed: false },
  { id: "c3", tripId: "t1", label: "Swimwear x3", category: "Clothing", packed: true },
  { id: "c4", tripId: "t1", label: "Universal adapter", category: "Tech", packed: false },
  { id: "c5", tripId: "t1", label: "GoPro + charger", category: "Tech", packed: false },
];
const seedNotes: Note[] = [
  { id: "n1", tripId: "t1", day: 1, title: "Arrival vibes", body: "Got in late, scooter to villa. Warm rain, frangipani everywhere.", date: "2026-06-12" },
  { id: "n2", tripId: "t1", day: 5, title: "Ubud morning", body: "Yoga at Yoga Barn, then jungle walk. Iced coconut by 11.", date: "2026-06-16" },
];

type State = {
  user: { name: string; email: string; avatar: string; city?: string; country?: string } | null;
  trips: Trip[]; stops: Stop[]; activities: Activity[];
  expenses: Expense[]; checklist: ChecklistItem[]; notes: Note[];
  theme: "light" | "dark";
};

type Ctx = State & {
  login: (email: string, name?: string, city?: string, country?: string) => void;
  logout: () => void;
  toggleTheme: () => void;
  addTrip: (t: Omit<Trip, "id">) => Trip;
  updateTrip: (id: string, patch: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addStop: (s: Omit<Stop, "id">) => void;
  removeStop: (id: string) => void;
  addActivity: (a: Omit<Activity, "id">) => void;
  toggleActivity: (id: string) => void;
  removeActivity: (id: string) => void;
  addExpense: (e: Omit<Expense, "id">) => void;
  removeExpense: (id: string) => void;
  addChecklist: (c: Omit<ChecklistItem, "id">) => void;
  togglePacked: (id: string) => void;
  removeChecklist: (id: string) => void;
  addNote: (n: Omit<Note, "id">) => void;
  removeNote: (id: string) => void;
};

const StoreContext = createContext<Ctx | null>(null);

const KEY = "traveloop:v1";

import { getServerState, saveServerState } from "./api";

function loadInitial(): State {
  if (typeof window === "undefined") {
    return { user: null, trips: seedTrips, stops: seedStops, activities: seedActivities, expenses: seedExpenses, checklist: seedChecklist, notes: seedNotes, theme: "light" };
  }
  return { user: null, trips: seedTrips, stops: seedStops, activities: seedActivities, expenses: seedExpenses, checklist: seedChecklist, notes: seedNotes, theme: "light" };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(loadInitial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchState = () => {
      getServerState().then((serverState) => {
        if (serverState) {
          setState((prev) => {
            // Only update if the user hasn't changed actively, ignoring mock auth edge cases
            if (prev.user?.email !== serverState.user?.email && prev.user) return prev;
            return { ...prev, ...serverState, user: prev.user || serverState.user };
          });
        }
        setLoaded(true);
      }).catch(() => setLoaded(true));
    };
    
    fetchState();
    const intervalId = setInterval(fetchState, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveServerState({ data: state }).catch(() => {});
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", state.theme === "dark");
    }
  }, [state, loaded]);

  const value: Ctx = {
    ...state,
    login: (email, name, city, country) => setState(s => {
      const isRegister = !!name;
      const shouldClear = isRegister || (s.user && s.user.email !== email && email !== "hello@traveloop.app");
      return {
        ...s,
        user: { email, name: name ?? email.split("@")[0], avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name ?? email)}`, city, country },
        ...(shouldClear ? { trips: [], stops: [], activities: [], expenses: [], checklist: [], notes: [] } : {})
      };
    }),
    logout: () => setState(s => ({ ...s, user: null })),
    toggleTheme: () => setState(s => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" })),
    addTrip: (t) => {
      const trip = { ...t, id: uid() };
      setState(s => ({ ...s, trips: [trip, ...s.trips] }));
      return trip;
    },
    updateTrip: (id, patch) => setState(s => ({ ...s, trips: s.trips.map(t => t.id === id ? { ...t, ...patch } : t) })),
    deleteTrip: (id) => setState(s => ({ ...s, trips: s.trips.filter(t => t.id !== id) })),
    addStop: (st) => setState(s => ({ ...s, stops: [...s.stops, { ...st, id: uid() }] })),
    removeStop: (id) => setState(s => ({ ...s, stops: s.stops.filter(x => x.id !== id) })),
    addActivity: (a) => setState(s => ({ ...s, activities: [...s.activities, { ...a, id: uid() }] })),
    toggleActivity: (id) => setState(s => ({ ...s, activities: s.activities.map(a => a.id === id ? { ...a, done: !a.done } : a) })),
    removeActivity: (id) => setState(s => ({ ...s, activities: s.activities.filter(a => a.id !== id) })),
    addExpense: (e) => setState(s => ({ ...s, expenses: [...s.expenses, { ...e, id: uid() }] })),
    removeExpense: (id) => setState(s => ({ ...s, expenses: s.expenses.filter(e => e.id !== id) })),
    addChecklist: (c) => setState(s => ({ ...s, checklist: [...s.checklist, { ...c, id: uid() }] })),
    togglePacked: (id) => setState(s => ({ ...s, checklist: s.checklist.map(c => c.id === id ? { ...c, packed: !c.packed } : c) })),
    removeChecklist: (id) => setState(s => ({ ...s, checklist: s.checklist.filter(c => c.id !== id) })),
    addNote: (n) => setState(s => ({ ...s, notes: [{ ...n, id: uid() }, ...s.notes] })),
    removeNote: (id) => setState(s => ({ ...s, notes: s.notes.filter(n => n.id !== id) })),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
