import type { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <TooltipProvider delayDuration={150}>
        {children}
        <Toaster richColors position="top-right" />
      </TooltipProvider>
    </ReduxProvider>
  );
}