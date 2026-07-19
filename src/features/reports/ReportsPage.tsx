import { FileText, Download } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { reports } from "@/mocks/data";

const catalog = [
  { type: "Daily Energy", desc: "Per-building daily energy usage and savings." },
  { type: "Monthly Energy", desc: "Monthly trend, peaks and load-factor breakdown." },
  { type: "Lighting Performance", desc: "Fixture uptime, health and firmware distribution." },
  { type: "Maintenance", desc: "Preventive maintenance schedule and completions." },
  { type: "Energy Saving", desc: "Savings by automation rule and AI recommendation." },
] as const;

export function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="Generate and download operational and sustainability reports." />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {catalog.map((c) => (
          <Card key={c.type}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary grid place-items-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{c.type} Report</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.desc}</div>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => toast.success(`${c.type} report generated`)}>Generate</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent</div>
      <div className="space-y-2">
        {reports.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.generatedAt} · {r.sizeKb} KB</div>
              </div>
              <Badge variant="outline" className="font-normal">{r.type}</Badge>
              <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-2" />PDF</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}