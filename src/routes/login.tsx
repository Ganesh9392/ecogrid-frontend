// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createFileRoute('/login')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/login"!</div>
// }

import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/features/auth/LoginPage";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});