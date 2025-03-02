import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  MessageCircle, ShoppingBagIcon,
  Trello,
} from "lucide-react"

export default function ServicesScroll(props: {
  onServiceToggle: (name: string) => void,
  activeServices: string[],
}) {
  const services = [
    { name: "Trello", icon: <Trello className="h-4 w-4 mr-2" /> },
    { name: "Telegram", icon: <MessageCircle className="h-4 w-4 mr-2" /> },
    { name: "Shopify", icon: <ShoppingBagIcon className="h-4 w-4 mr-2" /> },
  ]

  return (
      <Card className="p-2 w-full mx-auto border-0 h-10 flex items-center">
        <ScrollArea className="w-full">
          <div className="flex space-x-2">
            {services.map((service) => {
              const isActive = props.activeServices.includes(service.name);
              return (
                  <Button
                      key={service.name}
                      variant="outline"
                      size="sm"
                      onClick={() => props.onServiceToggle(service.name)}
                      className={`h-8 flex items-center whitespace-nowrap shrink-0 rounded-full
                  ${isActive ? "bg-primary text-primary-foreground border-primary" : ""}
                  hover:bg-transparent hover:border-border
                `}
                  >
                    {service.icon}
                    <span>{service.name}</span>
                  </Button>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
  )
}

