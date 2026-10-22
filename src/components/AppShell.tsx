"use client";

import { LoadingPage } from "@/components/LoadingPage";

export function AppShell({ children }: { children: React.ReactNode }) {
  return <><LoadingPage />{children}</>;
}
