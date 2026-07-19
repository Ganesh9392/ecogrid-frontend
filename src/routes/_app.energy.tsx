import { createFileRoute } from "@tanstack/react-router";
import { EnergyAnalyticsPage } from "@/features/energy/EnergyAnalyticsPage";
export const Route = createFileRoute("/_app/energy")({ component: EnergyAnalyticsPage });