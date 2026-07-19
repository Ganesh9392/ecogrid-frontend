import { createFileRoute } from "@tanstack/react-router";
import { AiInsightsPage } from "@/features/ai/AiInsightsPage";
export const Route = createFileRoute("/_app/ai-insights")({ component: AiInsightsPage });