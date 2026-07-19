import { createFileRoute } from "@tanstack/react-router";
import { LightingPage } from "@/features/lighting/LightingPage";
export const Route = createFileRoute("/_app/lighting")({ component: LightingPage });