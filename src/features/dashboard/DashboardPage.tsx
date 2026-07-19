import {
  dailyEnergy,
  monthlyEnergy,
  buildingComparison,
  floorComparison,
  occupancyTrend,
} from "@/mocks/data";

import { useEffect, useState } from "react";
import { getAnalyticsSummary } from "@/api/analytics";
import type { DashboardSummary } from "@/features/types";
import { PageHeader } from "@/components/common/PageHeader";
import { motion } from "framer-motion";
// import { Building2, MapPin, Zap, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getBuildings } from "@/api/buildings";
import type { Building } from "@/features/types";
// import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { SectionCard } from "@/components/common/SectionCard";
import {
  Building2,
  Layers,
  DoorOpen,
  Lightbulb,
  Wifi,
  WifiOff,
  Zap,
  Users,
  Leaf,
  Cloud,
  BellRing,
  UserX,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const axis = { fontSize: 11, tick: { fill: "hsl(var(--muted-foreground))" } } as const;
const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsSummary()
      .then((data) => {
        setSummary(data);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard summary:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const s = {
    totalBuildings: summary?.totalBuildings ?? 0,
    totalFloors: summary?.totalFloors ?? 0,
    totalRooms: summary?.totalRooms ?? 0,
    totalFixtures: summary?.totalFixtures ?? 0,
    onlineFixtures: summary?.onlineFixtures ?? 0,
    offlineFixtures: summary?.offlineFixtures ?? 0,
    energyKwh: summary?.energyKwh ?? 0,
    energySavedKwh: summary?.energySavedKwh ?? 0,
    carbonReducedKg: summary?.carbonReducedKg ?? 0,
    activeAlerts: summary?.activeAlerts ?? 0,
    occupiedRooms: summary?.occupiedRooms ?? 0,
    vacantRooms: summary?.vacantRooms ?? 0,
  };
  return (
    <div>
      <PageHeader
        title="Operations Dashboard"
        description="Real-time overview of every building, floor and fixture across your portfolio."
        actions={
          <>
            <Button variant="outline">Last 24h</Button>
            <Button>Export report</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard label="Buildings" value={s.totalBuildings} icon={Building2} tone="primary" delay={0.02} />
        <StatCard label="Floors" value={s.totalFloors} icon={Layers} tone="secondary" delay={0.04} />
        <StatCard label="Rooms" value={s.totalRooms} icon={DoorOpen} tone="muted" delay={0.06} />
        <StatCard label="Fixtures" value={s.totalFixtures.toLocaleString()} icon={Lightbulb} tone="primary" delay={0.08} />
        <StatCard label="Online" value={s.onlineFixtures.toLocaleString()} icon={Wifi} tone="secondary" hint={`${((s.onlineFixtures / (s.onlineFixtures + s.offlineFixtures)) * 100).toFixed(1)}% uptime`} delay={0.1} />
        <StatCard label="Offline" value={s.offlineFixtures} icon={WifiOff} tone="destructive" delay={0.12} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard label="Energy (kWh)" value={s.energyKwh.toLocaleString()} icon={Zap} tone="warning" delay={0.02} />
        <StatCard label="Energy Saved" value={`${s.energySavedKwh.toLocaleString()} kWh`} icon={Leaf} tone="primary" delay={0.04} />
        <StatCard label="CO₂ Reduced" value={`${s.carbonReducedKg.toLocaleString()} kg`} icon={Cloud} tone="secondary" delay={0.06} />
        <StatCard label="Active Alerts" value={s.activeAlerts} icon={BellRing} tone="destructive" delay={0.08} />
        <StatCard label="Occupied Rooms" value={s.occupiedRooms} icon={Users} tone="primary" delay={0.1} />
        <StatCard label="Vacant Rooms" value={s.vacantRooms} icon={UserX} tone="muted" delay={0.12} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <SectionCard title="Daily Energy Usage (kWh)" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={dailyEnergy}>
              <defs>
                <linearGradient id="gEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.19 250)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="oklch(0.55 0.19 250)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" {...axis} />
              <YAxis {...axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="kwh" stroke="oklch(0.55 0.19 250)" fill="url(#gEnergy)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Occupancy Trend (weekly avg %)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={occupancyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" {...axis} />
              <YAxis {...axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="occupancy" stroke="oklch(0.55 0.18 155)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Monthly Energy Trend">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyEnergy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" {...axis} />
              <YAxis {...axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="usage" name="Usage" stroke="oklch(0.55 0.19 250)" fill="oklch(0.55 0.19 250 / 0.2)" />
              <Area type="monotone" dataKey="saved" name="Saved" stroke="oklch(0.55 0.18 155)" fill="oklch(0.55 0.18 155 / 0.25)" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Building Comparison (kWh)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={buildingComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" {...axis} />
              <YAxis {...axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="usage" name="Usage" fill="oklch(0.55 0.19 250)" radius={[4,4,0,0]} />
              <Bar dataKey="saved" name="Saved" fill="oklch(0.55 0.18 155)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Floor Comparison (kWh)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={floorComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" {...axis} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="usage" fill="oklch(0.65 0.18 75)" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}