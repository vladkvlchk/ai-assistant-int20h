import { FC, ReactNode } from "react";
import { TrelloIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

export type TAppName = "trello" | "telegram";

export const ChatWidgetWrapper: FC<{
  children: any;
  app_name: TAppName;
}> = ({ children, app_name }) => {
  return (
    <Card>
      <CardHeader className="p-2 text-neutral-500 border-b">
        <div className="flex gap-1 items-center">
          <TrelloIcon size={20} />
          {app_name}
        </div>
      </CardHeader>
      <CardContent className="p-2">{children}</CardContent>
    </Card>
  );
};
