"use client";

import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Suspense, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={true}>
        <Suspense fallback={null}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </NextThemesProvider>
        </Suspense>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
