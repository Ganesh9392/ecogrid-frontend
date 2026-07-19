import { createFileRoute } from "@tanstack/react-router";
import { RoomsPage } from "@/features/rooms/RoomsPage";
export const Route = createFileRoute("/_app/rooms")({ component: RoomsPage });