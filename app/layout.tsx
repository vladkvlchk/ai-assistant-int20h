import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import ChatContainer from "@/components/chat-container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chat Interface",
  description:
    "A modern AI chat interface built with Next.js, Shadcn UI, and Tailwind CSS",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen">
            <ChatContainer />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

import "./globals.css";
