import { ChatWidgetWrapper } from "@/components/chat-widgets/chat-widget-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import img from "@/public/avatar-placeholder.png";
import { Check, SendIcon } from "lucide-react";

export interface ITelegramMessage {
  user_avatar_url?: string;
  recipient_avatar_url?: string;
  recipient_name: string;
  send_time: string;
  text: string;
}

export default function TelegramMessage(props: ITelegramMessage) {
  return (
    <ChatWidgetWrapper icon={<SendIcon/>} app_name="telegram">
      <Card className={"text-neutral-500"}>
        <CardHeader className={"flex p-3 flex-row border-b items-center gap-2"}>
          <Avatar className={"grayscale"}>
            <AvatarImage src={props.user_avatar_url || img.src} alt="avatar" />
          </Avatar>
          {props.recipient_name}
        </CardHeader>
        <CardContent className="flex flex-wrap p-6 gap-2 justify-end items-center">
          <div className="flex text-sm flex-col items-center self-end text-[14px] min-w-[50px]">
            <Check size={14} />
            {props.send_time}
          </div>
          <span className="break-words max-w-[60%]">{props.text}</span>
          <Avatar className="grayscale min-w-[40px]">
            <AvatarImage src={props.user_avatar_url || img.src} alt="avatar" />
          </Avatar>
        </CardContent>
      </Card>
    </ChatWidgetWrapper>
  )
}
