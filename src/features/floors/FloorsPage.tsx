import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { floors } from "@/mocks/data";

export function FloorsPage() {
  return (
    <div>
      <PageHeader title="Floors" description="Every floor across your portfolio, grouped by building." actions={<Button>Add floor</Button>} />
      <DataTable
        rows={floors}
        columns={[
          { key: "name", header: "Floor" },
          { key: "buildingName", header: "Building" },
          { key: "level", header: "Level" },
          { key: "rooms", header: "Rooms" },
          { key: "fixtures", header: "Fixtures" },
          { key: "energyKwh", header: "Energy (kWh)", render: (r) => r.energyKwh.toLocaleString() },
        ]}
      />
    </div>
  );
}