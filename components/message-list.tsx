import type { Message } from "ai"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"
import Markdown from "react-markdown"

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  if (!messages.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 text-zinc-500">
        <Bot className="h-12 w-12 mb-4 text-zinc-300" />
        <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
        <p className="text-sm">Ask me anything and I'll do my best to assist you.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex gap-3 text-sm", message.role === "user" ? "flex-row-reverse" : "flex-row")}
        >
          <Avatar className={cn("h-8 w-8", message.role === "user" ? "bg-primary" : "bg-zinc-800")}>
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
              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
            )}
          >
            <div className="prose prose-sm dark:prose-invert">
              <Markdown>{message.content}</Markdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

