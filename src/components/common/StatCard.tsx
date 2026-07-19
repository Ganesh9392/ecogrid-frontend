import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  tone?: "primary" | "secondary" | "warning" | "destructive" | "muted";
  delay?: number;
}

const toneMap: Record<NonNullable<Props["tone"]>, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  warning: "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.55_0.16_75)]",
  destructive: "bg-destructive/10 text-destructive",
  muted: "bg-muted text-muted-foreground",
};

export function StatCard({ label, value, icon: Icon, hint, tone = "primary", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <Card className="border-border/70 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-5 flex items-center gap-4">
          <div className={cn("h-11 w-11 rounded-lg grid place-items-center", toneMap[tone])}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
            <div className="text-2xl font-semibold text-foreground truncate">{value}</div>
            {hint ? <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div> : null}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}