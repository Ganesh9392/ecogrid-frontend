import { useState } from "react";
import { AlertTriangle, Info, XCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { alerts as seed } from "@/mocks/data";
import type { Alert } from "@/features/types";

const sevIcon = { critical: XCircle, warning: AlertTriangle, info: Info } as const;
const sevTone = {
  critical: "bg-destructive/10 text-destructive",
  warning: "bg-[oklch(0.78_0.16_75)]/20 text-[oklch(0.5_0.16_75)]",
  info: "bg-secondary/10 text-secondary",
} as const;

export function AlertsPage() {
  const [items, setItems] = useState<Alert[]>(seed);
  const ack = (id: string) => {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
    toast.success("Alert acknowledged");
  };
  return (
    <div>
      <PageHeader
        title="Alerts"
        description="Fixture, energy, communication, voltage and maintenance alerts across all buildings."
        actions={<Button variant="outline">Configure thresholds</Button>}
      />
      <div className="space-y-3">
        {items.map((a) => {
          const Icon = sevIcon[a.severity];
          return (
            <Card key={a.id} className={a.acknowledged ? "opacity-70" : ""}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`h-11 w-11 rounded-lg grid place-items-center ${sevTone[a.severity]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground">{a.type}</span>
                    <Badge variant="outline" className="font-normal capitalize">{a.severity}</Badge>
                    {a.acknowledged ? <Badge className="bg-primary/15 text-primary hover:bg-primary/20"><CheckCircle2 className="h-3 w-3 mr-1" />ACK</Badge> : null}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.source} · {a.building} · {a.createdAt}</div>
                </div>
                {!a.acknowledged ? (
                  <Button size="sm" variant="outline" onClick={() => ack(a.id)}>Acknowledge</Button>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}