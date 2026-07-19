import { createFileRoute } from "@tanstack/react-router";
import { BuildingsPage } from "@/features/buildings/BuildingsPage";
export const Route = createFileRoute("/_app/buildings")({ component: BuildingsPage });