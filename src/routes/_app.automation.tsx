import { createFileRoute } from "@tanstack/react-router";
import { AutomationPage } from "@/features/automation/AutomationPage";
export const Route = createFileRoute("/_app/automation")({ component: AutomationPage });