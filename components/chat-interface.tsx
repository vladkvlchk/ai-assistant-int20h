"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Loader2, Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MessageList from "@/components/message-list";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import ServicesScroll from "@/components/app-widgets/services-scroll";

interface ITrelloColumn {
  cards?: any[];
  items_amount: number;
  name: string;
}

interface IErrorResponse {
  response: { data: { message: string } };
}

interface ISuccessResponse {
  data: {
    task_type: "new-trello-board";
    name: string;
    data: ITrelloColumn[];
    url: string;
    result?: string;
  };
}

interface ChatInterfaceProps {
  chatId?: string | null;
}

export default function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]); //TODO: type IMessageItem
  const [services, setServices] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationKey: ["messages", chatId],
    //@ts-ignore
    mutationFn: async (message: { input: string; apps?: string[] }) => {
      return axiosInstance.post("", {
        llm_request: message.input,
      }) as Promise<IErrorResponse | ISuccessResponse>;
    },
    onSuccess: (data: ISuccessResponse) => {
      console.log(data);
      const task_type = data.data.task_type;
      if (data.data.result) {
        return setMessages((prev) => [
          ...prev,
          { role: "agent", isSuccess: true, content: data.data.result },
        ]);
      }
      if (task_type === "new-trello-board") {
        return setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            isSuccess: true,
            content: `Congrats! New Trello board "${data.data.name}" was created`,
            widgets: [
              {
                type: "trello-board-columns",
                name: data.data.name,
                url: data.data.url,
                data: data.data.data,
              },
            ],
          },
        ]);
      }
      if (data.data.task === "new-purchase") {
        console.log("new-purchase");
        return setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            isSuccess: true,
            content: `Almost done! just fill the form and submit. Please, double-check the information that I filled automatically`,
            widgets: [
              {
                type: "submit-form",
                address: data.data.purchase_address || "",
                title: data.data.purchase_item || "",
                item: data.data.purchase_from || "",
                amount: data.data.purchase_amount_of_items || "",
              },
            ],
          },
        ]);
      }
    },
    onError: (data: IErrorResponse) => {
      const content = data.response.data.message;
      setMessages((prev) => [
        ...prev,
        { role: "agent", isSuccess: false, content },
      ]);
    },
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatId]);

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
  };

  return (
    <div className="flex flex-col h-screen flex-2">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">
          {chatId ? "Chat Session" : "New Chat"}
        </h2>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" disabled={isLoading}>
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
            {messages.length &&
            messages[messages.length - 1] &&
            messages[messages.length - 1]?.widgets &&
            messages[messages.length - 1]?.widgets.length &&
            messages[messages.length - 1]?.widgets[0].type === "submit-form" ? (
              <Button className="w-full">Submit</Button>
            ) : (
              <form onSubmit={onSubmit} className="flex w-full gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || input.trim() === ""}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            )}
            <ServicesScroll
              onServiceToggle={onServiceToggle}
              activeServices={services}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
