import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app")({ component: AppLayout });

function AppLayout() {
  const path = useRouterState({ select: r => r.location.pathname });
  const title = (() => {
    if (path.startsWith("/app/dashboard")) return "Dashboard";
    if (path === "/app/trips/new") return "Create new trip";
    if (path.startsWith("/app/trips/")) return "Trip details";
    if (path.startsWith("/app/trips")) return "My trips";
    if (path.startsWith("/app/explore")) return "Explore";
    if (path.startsWith("/app/community")) return "Community";
    if (path.startsWith("/app/profile")) return "Profile";
    if (path.startsWith("/app/admin")) return "Admin analytics";
    return "Traveloop";
  })();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-14 border-b bg-background/80 backdrop-blur flex items-center gap-3 px-4">
            <SidebarTrigger />
            <h1 className="font-semibold text-sm md:text-base">{title}</h1>
            <div className="flex-1" />
            <div className="hidden md:flex relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search trips, cities, activities…" className="pl-9 h-9 bg-muted/40 border-transparent focus-visible:bg-background" />
            </div>
            <Button size="icon" variant="ghost"><Bell className="h-4 w-4" /></Button>
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
