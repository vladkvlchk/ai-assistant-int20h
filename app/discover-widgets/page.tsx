import { TrelloBoardColumns } from "@/components/chat-widgets/trello-board-columns";
import TelegramMessage from "@/components/chat-widgets/telegram-message";

export default function DiscoverWidgetsPage() {
  return (
    <div className="grid grid-cols-1 p-4 gap-4">
      <TrelloBoardColumns
        name={"Homeworks & family"}
        success={true}
        url="https://google.com"
        data={[
          {
            name: "Todo",
            items_amount: 45,
          },
          {
            name: "In progress",
            items_amount: 1,
          },
          {
            name: "Done",
            items_amount: 0,
          },
          {
            name: "Todo 2",
            items_amount: 45,
          },
          {
            name: "In progress 2",
            items_amount: 1,
          },
          {
            name: "Done 2",
            items_amount: 0,
          },
        ]}
      />
      <TelegramMessage
          send_time={"16:54"}
          recipient_name={"Tramp Bidenovsky"}
          text="повідомленняповідомленняповідомленняповідомлення"
      />
    </div>
  );
}
