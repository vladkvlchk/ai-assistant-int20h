import { ChatWidgetWrapper } from "@/components/chat-widgets/chat-widget-wrapper";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import img from "../../public/trainers_placeholder.webp"

export interface IProductCard {
  image?: string;
  brand: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
}

export default function ShopifyProductList(props: {products: IProductCard[] }) {
  return (
      <ChatWidgetWrapper icon={<ShoppingBagIcon/>} app_name={"shopify"}>
        <Card className={"grid  grid-cols-3 gap-2 "}>
          {props.products && props.products.map((product, index) => (<ProductCard key={index} {...product}/>))}
        </Card>
      </ChatWidgetWrapper>
  );
}

function ProductCard(props: IProductCard) {
  return (
      <div className="flex items-center text-neutral-500 justify-center min-h-[400px] p-4">
        <Card className="w-full max-w-sm overflow-hidden transition-all hover:shadow-lg">
          <div className="relative h-60 bg-gray-100">
            <Badge className="absolute top-2 right-2 z-10">New</Badge>
            <Image
                src={props.image || img.src}
                alt="Adidas Ultraboost Shoes"
                fill
                className="object-cover"
            />
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{props.brand}</p>
                <h3 className="font-bold text-lg mt-1">{props.name}</h3>
              </div>
              <div className="text-lg font-bold">{props.price}</div>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < props.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-2">({props.reviews} reviews)</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground max-h-32 overflow-hidden text-ellipsis line-clamp-5">
              {props.description}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full">Buy</Button>
          </CardFooter>
        </Card>
      </div>
  );
}



