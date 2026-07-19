import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { rooms } from "@/mocks/data";

export function RoomsPage() {
  return (
    <div>
      <PageHeader title="Rooms" description="All rooms with live occupancy and fixture counts." actions={<Button>Add room</Button>} />
      <DataTable
        rows={rooms}
        columns={[
          { key: "name", header: "Room" },
          { key: "type", header: "Type" },
          { key: "buildingName", header: "Building" },
          { key: "floorName", header: "Floor" },
          { key: "fixtures", header: "Fixtures" },
          { key: "temperatureC", header: "Temp", render: (r) => `${r.temperatureC}°C` },
          { key: "occupied", header: "Occupancy", render: (r) => (
              <Badge className={r.occupied ? "bg-primary/15 text-primary hover:bg-primary/20" : "bg-muted text-muted-foreground hover:bg-muted"}>
                {r.occupied ? "Occupied" : "Vacant"}
              </Badge>
          )},
        ]}
      />
    </div>
  );
}