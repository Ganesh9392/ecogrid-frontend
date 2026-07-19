import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { orgUsers } from "@/mocks/data";

const roleTone = {
  Admin: "bg-destructive/10 text-destructive",
  Manager: "bg-secondary/10 text-secondary",
  Operator: "bg-primary/10 text-primary",
  Viewer: "bg-muted text-muted-foreground",
} as const;

export function UsersPage() {
  return (
    <div>
      <PageHeader title="Users" description="Team members with access to your Eco-Grid tenant." actions={<Button>Invite user</Button>} />
      <DataTable
        rows={orgUsers}
        columns={[
          { key: "name", header: "User", render: (u) => (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8"><AvatarFallback className="bg-secondary/10 text-secondary text-xs">{u.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
              <div>
                <div className="font-medium text-sm">{u.name}</div>
                <div className="text-xs text-muted-foreground">{u.email}</div>
              </div>
            </div>
          )},
          { key: "role", header: "Role", render: (u) => <Badge className={roleTone[u.role] + " hover:opacity-100"}>{u.role}</Badge> },
          { key: "building", header: "Scope" },
          { key: "lastActive", header: "Last active" },
          { key: "active", header: "Status", render: (u) => (
            <Badge className={u.active ? "bg-primary/15 text-primary hover:bg-primary/20" : "bg-muted text-muted-foreground hover:bg-muted"}>
              {u.active ? "Active" : "Inactive"}
            </Badge>
          )},
        ]}
      />
    </div>
  );
}