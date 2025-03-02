import React, { cloneElement, FC, isValidElement, ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

export type TAppName = "trello" | "telegram";

export const ChatWidgetWrapper: FC<{
  children: ReactNode;
  app_name: TAppName;
  icon?: ReactNode;
}> = ({ children, app_name, icon}) => {
  return (
      <Card>
        <CardHeader className="p-2 text-neutral-500 border-b">
          <div className="flex gap-1 items-center">
            {icon && isValidElement(icon)
                ? cloneElement(icon as React.ReactElement, { size: 20 })
                : icon}
            {app_name}
          </div>
        </CardHeader>
        <CardContent className="p-2">{children}</CardContent>
      </Card>
  );
};
