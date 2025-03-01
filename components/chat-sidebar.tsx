"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, MessageSquare, Trash2, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

// Type for chat history
interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
}

interface ChatSidebarProps {
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
}

export default function ChatSidebar({
  activeChatId,
  setActiveChatId,
}: ChatSidebarProps) {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const router = useRouter();

  // Load chat sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem("chatSessions");
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setChatSessions(
          parsed.map((session: any) => ({
            ...session,
            createdAt: new Date(session.createdAt),
          }))
        );
      } catch (error) {
        console.error("Failed to parse chat sessions:", error);
      }
    }
  }, []);

  // Save chat sessions to localStorage when they change
  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
  }, [chatSessions]);

  // Create a new chat session
  const createNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: `New Chat ${chatSessions.length + 1}`,
      createdAt: new Date(),
    };

    setChatSessions((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    router.push(`?id=${newChat.id}`);
  };

  // Delete a chat session
  const deleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setChatSessions((prev) => prev.filter((chat) => chat.id !== id));

    if (activeChatId === id) {
      const remainingSessions = chatSessions.filter((chat) => chat.id !== id);
      if (remainingSessions.length > 0) {
        setActiveChatId(remainingSessions[0].id);
        router.push(`?id=${remainingSessions[0].id}`);
      } else {
        setActiveChatId(null);
        router.push("/");
      }
    }

    toast.success("Chat deleted", {
      description: "The chat session has been removed",
    });
  };

  // Select a chat session
  const selectChat = (id: string) => {
    setActiveChatId(id);
    router.push(`?id=${id}`);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-3 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Chats</h2>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="p-3">
          <Button
            onClick={createNewChat}
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <Plus size={16} />
            <span>New Chat</span>
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-14rem)]">
          <SidebarMenu>
            {chatSessions.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  onClick={() => selectChat(chat.id)}
                  isActive={activeChatId === chat.id}
                  className={cn(
                    "justify-start gap-2 w-full text-left",
                    activeChatId === chat.id ? "bg-accent" : ""
                  )}
                >
                  <MessageSquare size={16} />
                  <span className="truncate">{chat.title}</span>
                </SidebarMenuButton>
                <SidebarMenuAction
                  onClick={(e) => deleteChat(chat.id, e)}
                  className="hover:text-destructive"
                  showOnHover
                >
                  <Trash2 size={16} />
                </SidebarMenuAction>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" passHref>
              <SidebarMenuButton asChild>
                <div>
                  <User size={16} />
                  <span>Profile</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/" passHref>
              <SidebarMenuButton asChild>
                <div>
                  <Settings size={16} />
                  <span>Settings</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ThemeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
