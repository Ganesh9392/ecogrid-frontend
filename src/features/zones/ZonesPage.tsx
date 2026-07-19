import { useState } from "react";
import { Grid3x3, Power } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zones as seed } from "@/mocks/data";
import type { Zone } from "@/features/types";

const scenes: Zone["scene"][] = ["Work", "Meeting", "Evening", "Off", "Custom"];

export function ZonesPage() {
  const [items, setItems] = useState<Zone[]>(seed);
  const update = (id: string, patch: Partial<Zone>) =>
    setItems((prev) => prev.map((z) => (z.id === id ? { ...z, ...patch } : z)));

  return (
    <div>
      <PageHeader
        title="Lighting Zones"
        description="Group control across floors, wings and buildings — apply scenes in one action."
        actions={<Button>Create zone</Button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((z) => (
          <Card key={z.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-lg bg-secondary/10 text-secondary grid place-items-center">
                    <Grid3x3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{z.name}</div>
                    <div className="text-[11px] text-muted-foreground">{z.buildingName} · {z.fixtureCount} fixtures</div>
                  </div>
                </div>
                <Badge className="bg-muted text-muted-foreground hover:bg-muted">{z.scene}</Badge>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Power className="h-3.5 w-3.5" />Master</span>
                <Switch checked={z.isOn} onCheckedChange={(c) => { update(z.id, { isOn: c, brightness: c ? Math.max(z.brightness, 60) : 0 }); toast.success(`${z.name} turned ${c ? "ON" : "OFF"}`); }} />
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Brightness</span>
                  <span className="font-medium">{z.brightness}%</span>
                </div>
                <Slider value={[z.brightness]} max={100} step={5} disabled={!z.isOn} onValueChange={(v) => update(z.id, { brightness: v[0] ?? 0 })} />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Scene</span>
                <Select value={z.scene} onValueChange={(v) => update(z.id, { scene: v as Zone["scene"] })}>
                  <SelectTrigger className="h-8 w-40 ml-auto text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>{scenes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}