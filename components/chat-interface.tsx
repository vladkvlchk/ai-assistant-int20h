"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Loader2, Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MessageList from "@/components/message-list";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import ServicesScroll from "@/components/app-widgets/services-scroll";

interface ChatInterfaceProps {
  chatId?: string | null;
}

export default function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]); //TODO: type IMessageItem
  const [services, setServices] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["messages", chatId],
    mutationFn: async (message: { input: string; apps?: string[] }) => {
      return axiosInstance.post("", { llm_request: message.input }) as Promise<{
        response: { data: { message: string } };
      }>;
    },
    onSuccess: (data: { response: { data: { message: string } } }) => {
      console.log("success ", data);
      const content = data.response.data.message;
      setMessages((prev) => [...prev, { role: "", isSuccess: true, content }]);
    },
    onError: (data: { response: { data: { message: string } } }) => {
      const content = data.response.data.message;
      setMessages((prev) => [...prev, { role: "", isSuccess: false, content }]);
    },
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setInput(e.target.value);
  };

  const { isLoading, reload } = useChat();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatId]);

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input, isSuccess: true },
    ]);
    await mutateAsync({ input, apps: [] });
    setInput("");
  };

  const onServiceToggle = (name: string) => {
    if (services.includes(name)) {
      setServices((prev) => prev.filter((service) => service !== name));
    } else {
      setServices((prev) => [...prev, name]);
    }
  }

  return (
      <div className="flex flex-col h-screen flex-2">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">{chatId ? "Chat Session" : "New Chat"}</h2>
          {messages.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => reload()} disabled={isLoading}>
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

            <CardFooter className="border-t p-4 bg-background flex flex-col gap-3">
              <form onSubmit={onSubmit} className="flex w-full gap-2">
                <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || input.trim() === ""}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
              <ServicesScroll onServiceToggle={onServiceToggle} activeServices={services} />
            </CardFooter>
          </Card>
        </div>
      </div>
  )
}
