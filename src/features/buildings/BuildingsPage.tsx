// import { motion } from "framer-motion";
// import { Building2, MapPin, Zap, Users } from "lucide-react";
// import { PageHeader } from "@/components/common/PageHeader";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { buildings } from "@/mocks/data";

// export function BuildingsPage() {
//   return (
//     <div>
//       <PageHeader
//         title="Buildings"
//         description="Every property in your Eco-Grid portfolio."
//         actions={<Button>Add building</Button>}
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {buildings.map((b, i) => (
//           <motion.div key={b.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
//             <Card className="hover:shadow-md transition-shadow h-full">
//               <CardContent className="p-5">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary grid place-items-center">
//                       <Building2 className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-foreground">{b.name}</div>
//                       <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{b.city}</div>
//                     </div>
//                   </div>
//                   <Badge variant={b.status === "online" ? "default" : "destructive"} className={b.status === "online" ? "bg-primary/15 text-primary hover:bg-primary/20" : ""}>
//                     {b.status}
//                   </Badge>
//                 </div>
//                 <div className="grid grid-cols-3 gap-3 mt-5 text-center">
//                   <div><div className="text-lg font-semibold">{b.floors}</div><div className="text-[11px] text-muted-foreground">Floors</div></div>
//                   <div><div className="text-lg font-semibold">{b.rooms}</div><div className="text-[11px] text-muted-foreground">Rooms</div></div>
//                   <div><div className="text-lg font-semibold">{b.fixtures.toLocaleString()}</div><div className="text-[11px] text-muted-foreground">Fixtures</div></div>
//                 </div>
//                 <div className="mt-4">
//                   <div className="flex items-center justify-between text-xs mb-1">
//                     <span className="text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" />Occupancy</span>
//                     <span className="font-medium">{Math.round(b.occupancyRate * 100)}%</span>
//                   </div>
//                   <Progress value={b.occupancyRate * 100} />
//                 </div>
//                 <div className="flex items-center justify-between mt-4 pt-4 border-t">
//                   <div className="flex items-center gap-1 text-sm text-muted-foreground"><Zap className="h-3.5 w-3.5" />{b.energyKwh.toLocaleString()} kWh today</div>
//                   <Button size="sm" variant="outline">Manage</Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import { Building2, MapPin, Zap, Users } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { getBuildings } from "@/api/buildings";
import type { Building } from "@/features/types";

export function BuildingsPage() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBuildings()
      .then((data) => {
        setBuildings(data);
      })
      .catch((error) => {
        console.error("Failed to fetch buildings:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6">Loading buildings...</div>;
  }

  return (
    <div>
      <PageHeader
        title="Buildings"
        description="Every property in your Eco-Grid portfolio."
        actions={<Button>Add building</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {buildings.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary grid place-items-center">
                      <Building2 className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="font-semibold text-foreground">
                        {b.name}
                      </div>

                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {b.city}
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={
                      b.status === "online" ? "default" : "destructive"
                    }
                    className={
                      b.status === "online"
                        ? "bg-primary/15 text-primary hover:bg-primary/20"
                        : ""
                    }
                  >
                    {b.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-5 text-center">
                  <div>
                    <div className="text-lg font-semibold">{b.floors}</div>
                    <div className="text-[11px] text-muted-foreground">
                      Floors
                    </div>
                  </div>

                  <div>
                    <div className="text-lg font-semibold">{b.rooms}</div>
                    <div className="text-[11px] text-muted-foreground">
                      Rooms
                    </div>
                  </div>

                  <div>
                    <div className="text-lg font-semibold">
                      {b.fixtures.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Fixtures
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Occupancy
                    </span>

                    <span className="font-medium">
                      {Math.round(b.occupancyRate * 100)}%
                    </span>
                  </div>

                  <Progress value={b.occupancyRate * 100} />
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Zap className="h-3.5 w-3.5" />
                    {b.energyKwh.toLocaleString()} kWh today
                  </div>

                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}