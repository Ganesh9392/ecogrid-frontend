import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function AppHeader() {
  return (
    <header className="h-16 shrink-0 border-b bg-card/70 backdrop-blur flex items-center gap-3 px-4 lg:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>
      <div className="relative flex-1 max-w-md">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search buildings, fixtures, alerts…" className="pl-9 bg-background" />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] bg-destructive text-destructive-foreground">3</Badge>
        </Button>
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">AC</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <div className="text-sm font-medium">Amelia Chen</div>
            <div className="text-[11px] text-muted-foreground">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}