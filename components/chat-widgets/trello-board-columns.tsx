"use client";

import React, { FC } from "react";
import { ChatWidgetWrapper } from "./chat-widget-wrapper";
import { Card, CardContent, CardHeader } from "../ui/card";
import { EllipsisIcon } from "lucide-react";
import { Button } from "../ui/button";

interface ITrelloColumn {
  cards?: any[];
  items_amount: number;
  name: string;
}

export interface ITrelloBoardColumns {
  name: string;
  success: boolean;
  task_type?: string;
  url?: string;
  data: ITrelloColumn[];
}

const TrelloColumn: FC<ITrelloColumn> = ({ name, items_amount }) => {
  return (
    <Card className="h-min w-[272px] min-w-[272px]">
      <CardHeader className="p-3 dark:text-neutral-400 text-neutral-600">
        <div className="flex justify-between items-center">
          {name}{" "}
          <Button variant="outline" size="icon" disabled>
            <EllipsisIcon size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="m-3 p-3 h-12 text-sm dark:bg-neutral-900 bg-neutral-200 rounded-lg dark:text-neutral-400 text-neutral-600">
        {`(${items_amount} cards)`}
      </CardContent>
    </Card>
  );
};

export const TrelloBoardColumns: FC<ITrelloBoardColumns> = ({
  name,
  data,
  url,
}) => {
  const openUrlInNewTab = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <ChatWidgetWrapper app_name="trello">
      <div onClick={openUrlInNewTab} className="cursor-pointer">
        <CardHeader className="dark:text-neutral-400 text-neutral-600">
          {name}
        </CardHeader>
        <div className="p-4 flex overflow-x-scroll flex-nowrap gap-3">
          {data.map((col, i) => (
            <TrelloColumn
              name={col.name}
              key={col.name + i}
              items_amount={col.items_amount}
            />
          ))}
        </div>
      </div>
    </ChatWidgetWrapper>
  );
};
