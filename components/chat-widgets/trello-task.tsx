"use client"

import * as React from "react"
import {Trello, X} from "lucide-react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ChatWidgetWrapper } from "./chat-widget-wrapper"

export default function TaskCardModal() {
  return (
    <ChatWidgetWrapper app_name={"trello"} icon={<Trello/>}>
      <Card className="max-w text-neutral-500 overflow-hidden bg-background">
        <div className="relative">
          <div className="p-6 bg-background border-b">
            <img
                src="/placeholder.svg?height=120&width=600"
                alt="Simple drawing"
                className="mx-auto mb-4 max-h-32 filter grayscale"
            />
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-medium flex items-center gap-2">
              <span className="h-5 w-5 rounded-full border flex items-center justify-center">
                <span className="h-3 w-3 rounded-full bg-background"></span>
              </span>
                to delete this board
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                in list{" "}
                <Badge variant="outline" className="font-normal">
                  TO DO
                </Badge>
              </CardDescription>
            </CardHeader>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          <div className={"flex flex-row justify-between"}>
          <div>
            <h3 className="text-sm font-medium mb-2">Members</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>VK</AvatarFallback>
                </Avatar>
                <span className="text-sm">Vlad Kovalchuk</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <span className="text-sm">Anna Shevchenko</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>OP</AvatarFallback>
                </Avatar>
                <span className="text-sm">Oleksandr Petrenko</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Labels</h3>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-600 hover:bg-blue-600/90 h-6 w-12 p-0" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Notifications</h3>
            <Badge variant="outline" className="font-normal">
              Watching
            </Badge>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Due date</h3>
            <Badge variant="outline" className="font-normal">
              Mar 4, 4:02 AM
            </Badge>
          </div>
          </div>
          <Separator />

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Description</h3>
              <Button variant="ghost" size="sm" className="h-7">
                Edit
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">the most important task for today</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-2">Location</h3>
            <div className="rounded-md overflow-hidden border h-40 bg-muted">
              <img
                  src="/placeholder.svg?height=160&width=600&text=Kyiv,%20Ukraine,%2002000"
                  alt="Map showing Kyiv, Ukraine"
                  className="w-full h-full object-cover filter grayscale"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Kyiv, Ukraine, 02000</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-2">Checklist</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="item-1" />
                <label htmlFor="item-1" className="text-sm">
                  1
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="item-2" />
                <label htmlFor="item-2" className="text-sm">
                  2
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="item-3" />
                <label htmlFor="item-3" className="text-sm">
                  3
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="item-4" />
                <label htmlFor="item-4" className="text-sm">
                  double-check
                </label>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                Add an item
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Activity</h3>
              <Button variant="ghost" size="sm" className="h-7">
                Show details
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>VK</AvatarFallback>
                </Avatar>
                <Textarea placeholder="Write a comment..." className="min-h-[80px]" />
              </div>
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>VK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Vlad Kovalchuk</span> added this card to To Do
                  </p>
                  <p className="text-xs text-muted-foreground">just now</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ChatWidgetWrapper>
  )
}
