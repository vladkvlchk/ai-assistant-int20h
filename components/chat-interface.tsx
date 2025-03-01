"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Loader2, Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MessageList from "@/components/message-list";
import { useQueryClient } from "@tanstack/react-query";
import type { Message } from "ai";

interface ChatInterfaceProps {
  chatId?: string | null;
}

export default function ChatInterface({ chatId }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);

  // Initialize chat with saved messages if they exist
  const initialMessages = chatId ? loadMessages(chatId) : [];

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    reload,
    stop,
  } = useChat({
    id: chatId || undefined,
    initialMessages,
    onFinish: (message) => {
      if (chatId) {
        // Save the updated messages to localStorage
        const updatedMessages = [...messages, message];
        saveMessages(chatId, updatedMessages);

        // Update the chat title based on the first user message
        updateChatTitle(chatId, updatedMessages);
      }
    },
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Save messages when they change
    if (chatId && messages.length > 0) {
      saveMessages(chatId, messages);
    }
  }, [messages, chatId]);

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Load messages from localStorage
  function loadMessages(chatId: string): Message[] {
    try {
      const saved = localStorage.getItem(`chat-messages-${chatId}`);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load messages:", error);
      return [];
    }
  }

  // Save messages to localStorage
  function saveMessages(chatId: string, messages: Message[]) {
    localStorage.setItem(`chat-messages-${chatId}`, JSON.stringify(messages));
  }

  // Update chat title based on the first user message
  function updateChatTitle(chatId: string, messages: Message[]) {
    const firstUserMessage = messages.find((m) => m.role === "user");
    if (!firstUserMessage) return;

    // Get chat sessions from localStorage
    const savedSessions = localStorage.getItem("chatSessions");
    if (!savedSessions) return;

    try {
      const sessions = JSON.parse(savedSessions);
      const updatedSessions = sessions.map((session: any) => {
        if (session.id === chatId) {
          // Use first 30 chars of first message as title
          const title =
            firstUserMessage.content.length > 30
              ? `${firstUserMessage.content.substring(0, 30)}...`
              : firstUserMessage.content;
          return { ...session, title };
        }
        return session;
      });

      localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
    } catch (error) {
      console.error("Failed to update chat title:", error);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;

    await handleSubmit(e);

    // Invalidate queries to refresh data if needed
    queryClient.invalidateQueries({ queryKey: ["chat-history"] });
  };

  return (
    <div className="flex flex-col h-screen flex-2">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">
          {chatId ? "Chat Session" : "New Chat"}
        </h2>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => reload()}
            disabled={isLoading}
          >
            <RefreshCw size={16} className="mr-2" />
            Regenerate
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <Card className="h-full flex flex-col border-0 rounded-none">
          <CardContent className="flex-1 overflow-y-auto p-4">
            <MessageList messages={messages} />
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="border-t p-4 bg-background">
            <form onSubmit={onSubmit} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || input.trim() === ""}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
