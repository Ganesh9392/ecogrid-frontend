import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  Layers,
  DoorOpen,
  Lightbulb,
  Grid3x3,
  Cpu,
  Sparkles,
  BarChart3,
  BellRing,
  FileText,
  Users,
  Settings,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpeg";

const nav = [
  { group: "Overview", items: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ]},
  { group: "Assets", items: [
    { to: "/buildings", label: "Buildings", icon: Building2 },
    { to: "/floors", label: "Floors", icon: Layers },
    { to: "/rooms", label: "Rooms", icon: DoorOpen },
  ]},
  { group: "Lighting", items: [
    { to: "/lighting", label: "Lighting", icon: Lightbulb },
    { to: "/zones", label: "Lighting Zones", icon: Grid3x3 },
    { to: "/automation", label: "Automation", icon: Cpu },
  ]},
  { group: "Intelligence", items: [
    { to: "/ai-insights", label: "AI Insights", icon: Sparkles },
    { to: "/energy", label: "Energy Analytics", icon: BarChart3 },
  ]},
  { group: "Operations", items: [
    { to: "/alerts", label: "Alerts", icon: BellRing },
    { to: "/reports", label: "Reports", icon: FileText },
    { to: "/users", label: "Users", icon: Users },
    { to: "/settings", label: "Settings", icon: Settings },
  ]},
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="h-16 flex items-center gap-2 px-5 border-b border-sidebar-border">
        <div className="h-10 w-10 rounded-lg overflow-hidden bg-white flex items-center justify-center">
          <img
            src={logo}
            alt="Eco-Grid Logo"
            className="h-8 w-8 object-contain"
          />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Eco-Grid</div>
          <div className="text-[11px] text-sidebar-foreground/60">Lighting Intelligence</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {nav.map((g) => (
          <div key={g.group}>
            <div className="px-3 text-[10px] uppercase tracking-wider text-sidebar-foreground/50 mb-2">
              {g.group}
            </div>
            <ul className="space-y-1">
              {g.items.map((it) => {
                const active = pathname === it.to || pathname.startsWith(it.to + "/");
                const Icon = it.icon;
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border text-[11px] text-sidebar-foreground/60">
        v1.0.0 · © Eco-Grid
      </div>
    </aside>
  );
}