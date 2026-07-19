import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { SectionCard } from "@/components/common/SectionCard";
import { Zap, Leaf, Cloud, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { dailyEnergy, monthlyEnergy, buildingComparison } from "@/mocks/data";

const pie = [
  { name: "Offices", value: 42, color: "oklch(0.55 0.19 250)" },
  { name: "Meeting Rooms", value: 18, color: "oklch(0.55 0.18 155)" },
  { name: "Corridors", value: 14, color: "oklch(0.65 0.18 75)" },
  { name: "Warehouse", value: 20, color: "oklch(0.55 0.2 300)" },
  { name: "Other", value: 6, color: "oklch(0.6 0.22 27)" },
];

export function EnergyAnalyticsPage() {
  return (
    <div>
      <PageHeader title="Energy Analytics" description="Track consumption, savings and CO₂ reduction across the portfolio." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Usage" value="18,400 kWh" icon={Zap} tone="warning" />
        <StatCard label="Saved" value="2,840 kWh" icon={Leaf} tone="primary" />
        <StatCard label="CO₂ Avoided" value="1,642 kg" icon={Cloud} tone="secondary" />
        <StatCard label="MoM Efficiency" value="+8.4%" icon={TrendingUp} tone="primary" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <SectionCard title="Daily Load Curve" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={dailyEnergy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="kwh" name="Usage" stroke="oklch(0.55 0.19 250)" fill="oklch(0.55 0.19 250 / 0.25)" />
              <Area type="monotone" dataKey="saved" name="Saved" stroke="oklch(0.55 0.18 155)" fill="oklch(0.55 0.18 155 / 0.3)" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Consumption by Space">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pie} dataKey="value" nameKey="name" outerRadius={90} innerRadius={55}>
                {pie.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <SectionCard title="Monthly Trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyEnergy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Line dataKey="usage" stroke="oklch(0.55 0.19 250)" strokeWidth={2} />
              <Line dataKey="saved" stroke="oklch(0.55 0.18 155)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard title="Building Comparison">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={buildingComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="usage" fill="oklch(0.55 0.19 250)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}