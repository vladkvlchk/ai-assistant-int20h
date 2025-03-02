import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import Markdown from "react-markdown";
import { TrelloBoardColumns } from "./chat-widgets/trello-board-columns";
import FillForm from "./chat-widgets/fill-form";

interface MessageListProps {
  messages: any[];
}

export default function MessageList({ messages }: MessageListProps) {
  if (!messages.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 text-zinc-500">
        <Bot className="h-12 w-12 mb-4 text-zinc-300" />
        <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
        <p className="text-sm">
          Ask me anything and I'll do my best to assist you.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {messages.map((message, i) => (
        <React.Fragment key={message.content + i}>
          <div
            key={message.content + i}
            className={cn(
              "flex flex-col gap-3 text-sm",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <Avatar
              className={cn(
                "h-8 w-8",
                message.role === "user" ? "bg-primary" : "bg-zinc-800"
              )}
            >
              {message.role === "user" ? (
                <>
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                </>
              ) : (
                <>
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                </>
              )}
            </Avatar>
            <div
              className={cn(
                "rounded-lg px-4 py-3 max-w-[80%]",
                message.role === "user"
                  ? "bg-blue-200 dark:bg-blue-500 text-white"
                  : "bg-muted text-foreground",
                message.isSuccess
                  ? ""
                  : "text-red-500 bg-red-200 dark:bg-red-800 light:text-red-400"
              )}
            >
              <div className="prose prose-sm dark:prose-invert">
                <Markdown>{message.content}</Markdown>
              </div>
            </div>
          </div>
          {message.widgets &&
            message.widgets.map((widget: any, i: number) => {
              if (widget.type === "trello-board-columns" && widget.name) {
                return <TrelloBoardColumns key={widget.url + i} {...widget} />;
              }
              if (widget.type === "submit-form") {
                return (
                  <FillForm
                    key={i}
                    title={widget.item}
                    fields={[
                      {
                        type: "text",
                        name: "address",
                        label: "Address",
                        placeholder: "Enter your address",
                        value: widget.address,
                      },
                      {
                        type: "email",
                        name: "email",
                        label: "Email",
                        placeholder: "example@email",
                      },
                      {
                        type: "textarea",
                        name: "comment",
                        label: "Comment",
                        placeholder: "Tell us more...",
                      },
                      {
                        type: "select",
                        name: "size (US)",
                        label: "Size",
                        placeholder: "Pick a size",
                        options: ["7", "7,5", "8", "8,5", "9", "9,5", "10"],
                      },
                    ]}
                  />
                );
              }
              return <></>;
            })}
        </React.Fragment>
      ))}
    </div>
  );
}
