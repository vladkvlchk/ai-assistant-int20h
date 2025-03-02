"use client";

import { TrelloBoardColumns } from "@/components/chat-widgets/trello-board-columns";
import TelegramMessage from "@/components/chat-widgets/telegram-message";
import ShopifyProductList from "@/components/chat-widgets/shopify-product-list";
import TrelloTask from "@/components/chat-widgets/trello-task";
import FillForm from "@/components/chat-widgets/fill-form";

const products = [
  {
    name: "Adidas Ultraboost Shoes",
    brand: "Adidas",
    price: 120,
    rating: 3,
    reviews: 12,
    description: "The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between. The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between."
  },
  {
    name: "Adidas Ultraboost Shoes",
    brand: "Adidas",
    price: 120,
    rating: 3,
    reviews: 12,
    description: "The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between. The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between."
  },
  {
    name: "Adidas Ultraboost Shoes",
    brand: "Adidas",
    price: 120,
    rating: 3,
    reviews: 12,
    description: "The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between. The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between."
  },
  {
    name: "Adidas Ultraboost Shoes",
    brand: "Adidas",
    price: 120,
    rating: 3,
    reviews: 12,
    description: "The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between. The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between."
  },
  {
    name: "Adidas Ultraboost Shoes",
    brand: "Adidas",
    price: 120,
    rating: 3,
    reviews: 12,
    description: "The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between. The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between."
  },
  {
    name: "Adidas Ultraboost Shoes",
    brand: "Adidas",
    price: 120,
    rating: 3,
    reviews: 12,
    description: "The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between. The Adidas Ultraboost shoes are the best running shoes you can find. They are comfortable, stylish, and durable. They are perfect for long runs, short runs, and everything in between."
  },
]

export default function DiscoverWidgetsPage() {
  return (
    <div className="grid grid-cols-1 p-4 gap-4">
      <TrelloBoardColumns
        name={"Homeworks & family"}
        url="https://google.com"
        data={[
          { name: "Todo", items_amount: 45 },
          { name: "In progress", items_amount: 1 },
          { name: "Done", items_amount: 0 },
        ]}
      />

      <TelegramMessage
        send_time={"16:54"}
        recipient_name={"Tramp Bidenovsky"}
        text="Long test message..."
      />

      <FillForm
        title="Nike Air Force"
        fields={[
          {
            type: "text",
            name: "fullName",
            label: "Full Name",
            placeholder: "Enter your name",
          },
          {
            type: "email",
            name: "email",
            label: "Email",
            placeholder: "example@email",
          },
          {
            type: "textarea",
            name: "description",
            label: "Description",
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
      <ShopifyProductList products={products}/>
      <TrelloTask/>
    </div>
  );
}
