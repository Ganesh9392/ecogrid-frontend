import { createFileRoute, redirect } from "@tanstack/react-router";

// Root URL sends the operator straight to the Dashboard.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  component: () => null,
});
