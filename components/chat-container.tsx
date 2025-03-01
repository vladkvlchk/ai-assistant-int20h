"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import ChatSidebar from "@/components/chat-sidebar"
import { useSearchParams } from "next/navigation"

export default function ChatContainer() {
  const searchParams = useSearchParams()
  const chatIdFromUrl = searchParams.get("id")
  const [activeChatId, setActiveChatId] = useState<string | null>(chatIdFromUrl)

  return (
    <SidebarProvider defaultOpen={true}>
      <ChatSidebar activeChatId={activeChatId} setActiveChatId={setActiveChatId} />
    </SidebarProvider>
  )
}

