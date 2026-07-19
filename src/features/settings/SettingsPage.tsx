import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { API_BASE_URL } from "@/lib/api/client";

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});
type ProfileValues = z.infer<typeof profileSchema>;

export function SettingsPage() {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "Amelia Chen", email: "amelia.chen@ecogrid.io", phone: "+1 415 555 0102" },
  });

  return (
    <div>
      <PageHeader title="Settings" description="Profile, organization, theme, notifications, and API configuration." />
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="org">Organization</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card><CardContent className="p-6 max-w-xl space-y-4">
            <form onSubmit={form.handleSubmit((v) => toast.success(`Saved profile for ${v.name}`))} className="space-y-4">
              <div className="space-y-1.5"><Label>Full name</Label><Input {...form.register("name")} />{form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}</div>
              <div className="space-y-1.5"><Label>Email</Label><Input type="email" {...form.register("email")} />{form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}</div>
              <div className="space-y-1.5"><Label>Phone</Label><Input {...form.register("phone")} /></div>
              <Button type="submit">Save changes</Button>
            </form>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="org">
          <Card><CardContent className="p-6 max-w-xl space-y-4">
            <div className="space-y-1.5"><Label>Organization name</Label><Input defaultValue="Acme Facilities Co." /></div>
            <div className="space-y-1.5"><Label>Timezone</Label><Input defaultValue="America/Los_Angeles" /></div>
            <div className="space-y-1.5"><Label>Currency</Label><Input defaultValue="USD" /></div>
            <Button onClick={() => toast.success("Organization updated")}>Save</Button>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="theme">
          <Card><CardContent className="p-6 max-w-xl space-y-4">
            <div className="flex items-center justify-between"><div><div className="text-sm font-medium">Compact tables</div><div className="text-xs text-muted-foreground">Higher density for large portfolios.</div></div><Switch /></div>
            <Separator />
            <div className="flex items-center justify-between"><div><div className="text-sm font-medium">Reduce motion</div><div className="text-xs text-muted-foreground">Minimize UI animations.</div></div><Switch /></div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card><CardContent className="p-6 max-w-xl space-y-4">
            {["Critical alerts","Warnings","Daily energy summary","Maintenance reminders","Weekly AI report"].map((n) => (
              <div key={n} className="flex items-center justify-between"><div className="text-sm">{n}</div><Switch defaultChecked /></div>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="api">
          <Card><CardContent className="p-6 max-w-xl space-y-4">
            <div className="space-y-1.5"><Label>API Base URL</Label><Input value={API_BASE_URL} readOnly /><p className="text-xs text-muted-foreground">Configured via <code>VITE_API_BASE_URL</code>. Ready for your Django REST backend.</p></div>
            <div className="space-y-1.5"><Label>Personal API token</Label><Input type="password" defaultValue="sk_live_••••••••••••" /></div>
            <Button onClick={() => toast.success("API settings saved")}>Save</Button>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}