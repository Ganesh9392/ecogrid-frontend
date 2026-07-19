import { createFileRoute } from "@tanstack/react-router";
import { ZonesPage } from "@/features/zones/ZonesPage";
export const Route = createFileRoute("/_app/zones")({ component: ZonesPage });