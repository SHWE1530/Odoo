import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Map, Compass, Users, User, BarChart3,
  Plus, LogOut, Sparkles, Sun, Moon
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const main = [
  { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "Trips", url: "/app/trips", icon: Map },
  { title: "Explore", url: "/app/explore", icon: Compass },
  { title: "Community", url: "/app/community", icon: Users },
];
const account = [
  { title: "Profile", url: "/app/profile", icon: User },
  { title: "Admin", url: "/app/admin", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: r => r.location.pathname });
  const { user, logout, theme, toggleTheme } = useStore();
  const navigate = useNavigate();
  const isActive = (u: string) => path === u || path.startsWith(u + "/");

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="px-3 py-4">
        <Link to="/" className="flex items-center gap-2.5 px-1">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-hero shadow-glow">
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base tracking-tight">Traveloop</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">plan beautifully</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {!collapsed && (
          <div className="px-2 pb-3">
            <Button onClick={() => navigate({ to: "/app/trips/new" })} className="w-full gradient-hero text-white shadow-glow hover:opacity-90">
              <Plus className="h-4 w-4" /> New trip
            </Button>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {account.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{(user?.name ?? "G").slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{user?.name ?? "Guest"}</div>
                <div className="text-xs text-muted-foreground truncate">{user?.email ?? "Sign in to sync"}</div>
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button size="icon" variant="ghost" onClick={() => { logout(); navigate({ to: "/" }); }} aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
