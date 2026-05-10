// @ts-nocheck
import { createServerFn } from "@tanstack/react-start";
import { PrismaClient } from "@prisma/client";

// Keep a persistent single instance
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getServerState = createServerFn({ method: "GET" }).handler(async () => {
  try {
    // For a fully working prototype, we fetch all data from relational Prisma DB.
    // We will assume a single global view for demo purposes if no auth system is active.
    
    const dbTrips = await prisma.trip.findMany();
    const dbStops = await prisma.tripStop.findMany();
    const dbActivities = await prisma.activity.findMany();
    const dbExpenses = await prisma.expense.findMany();
    const dbChecklists = await prisma.packingItem.findMany();
    const dbNotes = await prisma.journalEntry.findMany();

    const trips = dbTrips.map(t => ({
      ...t,
      tags: JSON.parse(t.tags),
      startDate: t.startDate.toISOString(),
      endDate: t.endDate.toISOString(),
      cover: t.cover || "",
      description: t.description || "",
      status: t.status as "planning" | "upcoming" | "completed"
    }));

    const stops = dbStops.map(s => ({ ...s, arrivalDate: s.arrivalDate.toISOString(), notes: s.notes || undefined }));
    const expenses = dbExpenses.map(e => ({ ...e, date: e.date.toISOString() }));
    const notes = dbNotes.map(n => ({ ...n, date: n.date.toISOString(), userId: undefined }));

    // Let's get the first user to simulate logged in state if one exists
    const firstUser = await prisma.user.findFirst();

    return {
      user: firstUser ? { email: firstUser.email, name: firstUser.name || "User", avatar: firstUser.avatar || "", city: firstUser.city || undefined, country: firstUser.country || undefined } : null,
      trips,
      stops,
      activities: dbActivities,
      expenses,
      checklist: dbChecklists,
      notes,
      theme: "dark"
    };
  } catch (err) {
    console.error("Prisma read failed:", err);
    return null;
  }
});

export const saveServerState = createServerFn({ method: "POST" })
  .inputValidator((state: any) => state)
  .handler(async ({ data: state }) => {
    try {
      if (!state) return { success: false };

      // Ensure user exists before mapping records
      let userRecord = null;
      if (state.user?.email) {
        userRecord = await prisma.user.upsert({
          where: { email: state.user.email },
          update: { name: state.user.name ?? state.user.email, avatar: state.user.avatar, city: state.user.city, country: state.user.country },
          create: { email: state.user.email, name: state.user.name ?? state.user.email, avatar: state.user.avatar, city: state.user.city, country: state.user.country }
        });
      } else {
        // Create a default demo user if the app hasn't logged in yet so relationships persist.
        userRecord = await prisma.user.upsert({
          where: { email: "demo@traveloop.app" },
          update: {},
          create: { email: "demo@traveloop.app", name: "Demo User", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Demo" }
        });
      }

      // Upsert all trips
      for (const trip of state.trips || []) {
        await prisma.trip.upsert({
          where: { id: trip.id },
          create: {
            id: trip.id,
            title: trip.title,
            destination: trip.destination,
            cover: trip.cover || "",
            startDate: new Date(trip.startDate),
            endDate: new Date(trip.endDate),
            budget: trip.budget || 0,
            travelers: trip.travelers || 1,
            status: trip.status || "planning",
            description: trip.description || "",
            tags: JSON.stringify(trip.tags || []),
            shared: trip.shared || false,
            userId: userRecord.id
          },
          update: {
            title: trip.title,
            destination: trip.destination,
            cover: trip.cover || "",
            startDate: new Date(trip.startDate),
            endDate: new Date(trip.endDate),
            budget: trip.budget || 0,
            travelers: trip.travelers || 1,
            status: trip.status || "planning",
            description: trip.description || "",
            tags: JSON.stringify(trip.tags || []),
            shared: trip.shared || false,
          }
        });
      }

      // Upsert stops
      for (const stop of state.stops || []) {
        await prisma.tripStop.upsert({
          where: { id: stop.id },
          create: { ...stop, arrivalDate: new Date(stop.arrivalDate) },
          update: { ...stop, arrivalDate: new Date(stop.arrivalDate) }
        });
      }

      // Upsert activities
      for (const act of state.activities || []) {
        // Activity model has stopId? No, Activity model doesn't have stopId in schema!
        // We omit stopId if the schema doesn't support it to prevent DB errors.
        const { stopId, ...actData } = act;
        await prisma.activity.upsert({
          where: { id: actData.id },
          create: actData,
          update: actData
        });
      }

      // Upsert expenses
      for (const exp of state.expenses || []) {
        await prisma.expense.upsert({
          where: { id: exp.id },
          create: { ...exp, date: new Date(exp.date) },
          update: { ...exp, date: new Date(exp.date) }
        });
      }

      // Upsert packing items
      for (const pack of state.checklist || []) {
        await prisma.packingItem.upsert({
          where: { id: pack.id },
          create: pack,
          update: pack
        });
      }

      // Upsert notes
      for (const note of state.notes || []) {
        await prisma.journalEntry.upsert({
          where: { id: note.id },
          create: { ...note, date: new Date(note.date), userId: userRecord.id },
          update: { ...note, date: new Date(note.date), userId: userRecord.id }
        });
      }

      return { success: true };
    } catch (err) {
      console.error("Prisma write failed:", err);
      return { success: false };
    }
  });
