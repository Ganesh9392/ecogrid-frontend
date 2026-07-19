import { useState } from "react";
import { Cpu, Play, Pause, Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { automationRules as seed } from "@/mocks/data";
import type { AutomationRule } from "@/features/types";

export function AutomationPage() {
  const [rules, setRules] = useState<AutomationRule[]>(seed);
  const toggle = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
    const r = rules.find((x) => x.id === id);
    if (r) toast.success(`${r.name} ${r.enabled ? "disabled" : "enabled"}`);
  };
  return (
    <div>
      <PageHeader
        title="Automation Rules"
        description="Occupancy, daylight harvesting, schedules, holiday and energy-saving modes."
        actions={<Button><Plus className="h-4 w-4 mr-2" />New rule</Button>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {rules.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`h-11 w-11 rounded-lg grid place-items-center ${r.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Scope · {r.scope}</div>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <Badge variant="outline" className="font-normal">When: {r.trigger}</Badge>
                      <Badge variant="outline" className="font-normal">Then: {r.action}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Switch checked={r.enabled} onCheckedChange={() => toggle(r.id)} />
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    {r.enabled ? <Play className="h-3 w-3 text-primary" /> : <Pause className="h-3 w-3" />}
                    {r.lastRun ?? "Never"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}