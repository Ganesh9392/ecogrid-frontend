import { Sparkles, TrendingDown, AlertTriangle, Wrench, Activity, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { SectionCard } from "@/components/common/SectionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aiInsights, monthlyEnergy } from "@/mocks/data";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const iconFor = {
  "Energy Saving": TrendingDown,
  "Occupancy Prediction": Users,
  "Brightness Optimization": Activity,
  "Anomaly Detection": AlertTriangle,
  "Usage Trend": Activity,
  "Predictive Maintenance": Wrench,
} as const;

const impactStyle = {
  High: "bg-destructive/15 text-destructive",
  Medium: "bg-[oklch(0.78_0.16_75)]/20 text-[oklch(0.5_0.16_75)]",
  Low: "bg-primary/15 text-primary",
} as const;

export function AiInsightsPage() {
  const totalSavings = aiInsights.reduce((s, i) => s + (i.savingsUsd ?? 0), 0);
  return (
    <div>
      <PageHeader
        title="AI Insights"
        description="Predictions and recommendations from Eco-Grid's lighting intelligence engine."
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Est. Monthly Savings" value={`$${totalSavings.toLocaleString()}`} icon={DollarSign} tone="primary" />
        <StatCard label="Recommendations" value={aiInsights.length} icon={Sparkles} tone="secondary" />
        <StatCard label="Anomalies Detected" value={aiInsights.filter(i => i.category === "Anomaly Detection").length} icon={AlertTriangle} tone="destructive" />
        <StatCard label="Predictive Alerts" value={aiInsights.filter(i => i.category === "Predictive Maintenance").length} icon={Wrench} tone="warning" />
      </div>

      <SectionCard title="Projected Savings vs. Baseline (kWh)" className="mb-6">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyEnergy}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="usage" name="Baseline" stroke="oklch(0.55 0.19 250)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="saved" name="AI-Optimized" stroke="oklch(0.55 0.18 155)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {aiInsights.map((it, i) => {
          const Icon = iconFor[it.category] ?? Sparkles;
          return (
            <motion.div key={it.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}>
              <Card className="h-full">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-lg bg-secondary/10 text-secondary grid place-items-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="font-normal">{it.category}</Badge>
                        <Badge className={impactStyle[it.impact] + " hover:opacity-100"}>{it.impact} impact</Badge>
                        {it.savingsUsd ? <span className="text-xs text-primary font-medium">~${it.savingsUsd}/mo</span> : null}
                      </div>
                      <div className="font-semibold mt-2">{it.title}</div>
                      <p className="text-sm text-muted-foreground mt-1">{it.detail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}