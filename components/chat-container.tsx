"use client";

import { useState, useEffect } from "react";
import ChatSidebar from "@/components/chat-sidebar";
import { useSearchParams } from "next/navigation";

export default function ChatContainer() {
  const searchParams = useSearchParams();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    const chatIdFromUrl = searchParams.get("id");
    setActiveChatId(chatIdFromUrl);
  }, [searchParams]);

  return (
    <ChatSidebar
      activeChatId={activeChatId}
      setActiveChatId={setActiveChatId}
    />
  );
}
