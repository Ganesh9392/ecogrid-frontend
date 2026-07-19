import { useState } from "react";
import { Lightbulb, Wifi, WifiOff, Power } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fixtures as seed } from "@/mocks/data";
import type { Fixture } from "@/features/types";

function healthBadge(h: Fixture["health"]) {
  const map = {
    healthy: "bg-primary/15 text-primary",
    warning: "bg-[oklch(0.78_0.16_75)]/20 text-[oklch(0.5_0.16_75)]",
    critical: "bg-destructive/15 text-destructive",
  } as const;
  return <Badge className={map[h] + " hover:opacity-100"}>{h}</Badge>;
}

export function LightingPage() {
  const [items, setItems] = useState<Fixture[]>(seed);

  const update = (id: string, patch: Partial<Fixture>) =>
    setItems((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const bulk = (on: boolean) => {
    setItems((prev) => prev.map((f) => (f.status === "online" ? { ...f, isOn: on, brightness: on ? Math.max(f.brightness, 60) : 0 } : f)));
    toast.success(`All online fixtures turned ${on ? "ON" : "OFF"}`);
  };

  return (
    <div>
      <PageHeader
        title="Lighting Fixtures"
        description="Individual, room, floor and building-wide control with manual override."
        actions={
          <>
            <Button variant="outline" onClick={() => bulk(false)}><Power className="h-4 w-4 mr-2" />All OFF</Button>
            <Button onClick={() => bulk(true)}><Power className="h-4 w-4 mr-2" />All ON</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {items.map((f, i) => (
          <motion.div key={f.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.02}}>
            <Card className="h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-lg grid place-items-center ${f.isOn && f.status === "online" ? "bg-[oklch(0.78_0.16_75)]/20 text-[oklch(0.55_0.16_75)]" : "bg-muted text-muted-foreground"}`}>
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{f.name}</div>
                      <div className="text-[11px] text-muted-foreground">{f.buildingName} · {f.roomName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    {f.status === "online" ? <Wifi className="h-3.5 w-3.5 text-primary" /> : <WifiOff className="h-3.5 w-3.5 text-destructive" />}
                    {f.status}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-muted-foreground">Power</span>
                  <Switch
                    checked={f.isOn}
                    disabled={f.status === "offline"}
                    onCheckedChange={(c) => update(f.id, { isOn: c, brightness: c ? Math.max(f.brightness, 60) : 0 })}
                  />
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Brightness</span>
                    <span className="font-medium">{f.brightness}%</span>
                  </div>
                  <Slider
                    value={[f.brightness]}
                    max={100}
                    step={5}
                    disabled={!f.isOn || f.status === "offline"}
                    onValueChange={(v) => update(f.id, { brightness: v[0] ?? 0 })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center text-[11px]">
                  <div><div className="font-semibold text-sm">{f.powerW}W</div><div className="text-muted-foreground">Power</div></div>
                  <div><div className="font-semibold text-sm">{f.voltageV}V</div><div className="text-muted-foreground">Voltage</div></div>
                  <div><div className="font-semibold text-sm">{f.currentA}A</div><div className="text-muted-foreground">Current</div></div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t text-[11px] text-muted-foreground">
                  <span>{f.operatingHours.toLocaleString()} h</span>
                  <span>FW {f.firmware}</span>
                  {healthBadge(f.health)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}