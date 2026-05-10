import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Heart, Plane, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/app/profile")({ component: Profile });

function Profile() {
  const { user, trips, login, theme, toggleTheme } = useStore();
  const saved = ["Bali", "Tokyo", "Lisbon", "Reykjavík", "Marrakech"];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-5">
      <Card className="p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
        <Avatar className="h-20 w-20"><AvatarImage src={user?.avatar} /><AvatarFallback>{(user?.name ?? "G").slice(0, 1)}</AvatarFallback></Avatar>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user?.name ?? "Guest explorer"}</h2>
          <p className="text-sm text-muted-foreground">{user?.email ?? "Sign in to sync"}</p>
          <div className="flex gap-3 mt-3 text-sm">
            <Badge variant="secondary" className="gap-1"><Plane className="h-3 w-3" /> {trips.length} trips</Badge>
            <Badge variant="secondary" className="gap-1"><MapPin className="h-3 w-3" /> {new Set(trips.map(t => t.destination)).size} places</Badge>
            <Badge variant="secondary" className="gap-1"><Heart className="h-3 w-3" /> {saved.length} saved</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Preferences</h3>
        <form
          className="grid md:grid-cols-2 gap-4"
          onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}
        >
          <div className="space-y-2">
            <Label>Display name</Label>
            <Input defaultValue={user?.name ?? ""} onBlur={(e) => user && login(user.email, e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user?.email ?? ""} type="email" />
          </div>
          <div className="space-y-2">
            <Label>Home base</Label>
            <Input placeholder="San Francisco" />
          </div>
          <div className="space-y-2">
            <Label>Default currency</Label>
            <Input defaultValue="USD" />
          </div>
          <div className="md:col-span-2 flex items-center justify-between p-3 rounded-lg bg-muted/40">
            <div>
              <div className="font-medium text-sm">Dark mode</div>
              <div className="text-xs text-muted-foreground">Easier on the eyes for late-night planning.</div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" className="gradient-hero text-white shadow-glow hover:opacity-90">Save changes</Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Saved destinations</h3>
        <div className="flex flex-wrap gap-2">
          {saved.map(s => <Badge key={s} variant="outline" className="px-3 py-1.5">{s}</Badge>)}
        </div>
      </Card>
    </div>
  );
}
