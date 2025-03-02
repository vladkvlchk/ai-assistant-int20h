"use client"

import type React from "react"
import { cloneElement, type FC, isValidElement, type ReactNode, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"

export type TAppName = "trello" | "telegram" | "shopify"
const PAGE_START = 0;

export const ChatWidgetWrapper: FC<{
  children: any
  app_name: TAppName
  icon?: ReactNode
}> = ({ children, app_name, icon }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = PAGE_START;
    }
  }, [])

  return (
      <Card className="max-h-[600px] flex flex-col">
        <CardHeader className="p-2 text-neutral-500 border-b shrink-0">
          <div className="flex gap-1 items-center">
            {icon && isValidElement(icon) ? cloneElement(icon as React.ReactElement, { size: 20 }) : icon}
            {app_name}
          </div>
        </CardHeader>
        <CardContent ref={contentRef} className="p-2 overflow-y-auto flex-grow">
          {children}
        </CardContent>
      </Card>
  )
}


