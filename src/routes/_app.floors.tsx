import { createFileRoute } from "@tanstack/react-router";
import { FloorsPage } from "@/features/floors/FloorsPage";
export const Route = createFileRoute("/_app/floors")({ component: FloorsPage });