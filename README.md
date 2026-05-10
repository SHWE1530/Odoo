# Traveloop - Premium SaaS Travel Platform

Traveloop is a production-ready, SaaS platform designed to completely automate and structure complex multi-city itineraries. 

Built with the "Obsidian Orbit" design system, it features high-tier glassmorphism UI, a robust authenticated Node.js backbone, and an interactive state-of-the-art trip planner matching leading tech giants.

## 🚀 Ecosystem Architecture
The application runs on an Enterprise Monolithic scale across two primary environments:

*   **Frontend (Next.js 14 + Tailwind + Shadcn UI):** Implements server-side rendering, routing boundaries, layout-guarding, and the master UI design.
*   **Backend (Express + Prisma + PostgreSQL):** A fully engineered API managing user schemas, JWT Access/Refresh tokens, bcrypt encryption, and relational ORM querying.

## 🛠 Prerequisites
You must have the following installed locally:
- Node.js (v18.0+)
- PostgreSQL (or an equivalent connection string like Neon/Supabase)

## 📦 Run Instructions

### 1. Database & Backend Setup
1. Open a terminal and navigate to the backend: `cd backend`
2. Install dependencies: `npm install`
3. Enter your PostgreSQL connection string into `backend/.env`:
   `DATABASE_URL="postgres://user:password@localhost:5432/traveloop"`
4. Run migrations strictly via Prisma: `npx prisma migrate dev --name init`
5. Turn on the server: `npm run dev`

*(The API will be available on `http://localhost:5000`)*

### 2. Premium Frontend Setup
1. Open another terminal and navigate to the frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Launch the environment on an available port (Default is 3000): 
   `npm run dev`

*(You can now explore the full Traveloop dashboard visually at `http://localhost:3000`)*

## ✨ Features Redesigned
*   **Auth System:** Beautiful split-screen animated JWT onboarding.
*   **User Dashboard:** Full layout grid, widget-based data mapping.
*   **Trip Command Center:** Real-time chronological Day/Night timeline, drag-n-drop packing checklists, and analytical interactive pie-graph budget tabs.
*   **Explore:** Community-driven global SaaS marketplace simulation.
