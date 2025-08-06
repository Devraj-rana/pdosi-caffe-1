import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MenuCategory } from "@/types";

const menuData: MenuCategory[] = [
  {
    name: "Patty",
    items: [
      { id: "p1", name: "Aloo Patty", description: "Classic potato patty, spiced and baked to perfection.", price: 25, image: "https://placehold.co/600x400.png", hint: "potato patty" },
      { id: "p2", name: "Paneer Patty", description: "Flaky pastry filled with savory paneer masala.", price: 35, image: "https://placehold.co/600x400.png", hint: "paneer patty" },
    ],
  },
  {
    name: "Waffle",
    items: [
      { id: "w1", name: "Classic Waffle", description: "Golden waffle with maple syrup and butter.", price: 120, image: "https://placehold.co/600x400.png", hint: "classic waffle" },
      { id: "w2", name: "Chocolate Overload", description: "Waffle topped with chocolate sauce, chips, and ice cream.", price: 180, image: "https://placehold.co/600x400.png", hint: "chocolate waffle" },
    ],
  },
  {
    name: "Sandwich",
    items: [
      { id: "s1", name: "Veg Club Sandwich", description: "Triple-layered sandwich with fresh veggies and coleslaw.", price: 150, image: "https://placehold.co/600x400.png", hint: "club sandwich" },
      { id: "s2", name: "Grilled Cheese", description: "A classic grilled cheese sandwich with a gooey center.", price: 100, image: "https://placehold.co/600x400.png", hint: "grilled cheese" },
    ],
  },
  {
    name: "Coffee",
    items: [
      { id: "c1", name: "Espresso", description: "A strong shot of coffee.", price: 80, image: "https://placehold.co/600x400.png", hint: "espresso shot" },
      { id: "c2", name: "Cappuccino", description: "Espresso with steamed milk foam.", price: 120, image: "https://placehold.co/600x400.png", hint: "cappuccino coffee" },
      { id: "c3", name: "Iced Latte", description: "Chilled coffee with milk over ice.", price: 140, image: "https://placehold.co/600x400.png", hint: "iced latte" },
    ],
  },
   {
    name: "Milkshakes",
    items: [
      { id: "m1", name: "Chocolate Shake", description: "Rich and creamy chocolate milkshake.", price: 150, image: "https://placehold.co/600x400.png", hint: "chocolate milkshake" },
      { id: "m2", name: "Strawberry Shake", description: "Made with fresh strawberries and ice cream.", price: 160, image: "https://placehold.co/600x400.png", hint: "strawberry milkshake" },
    ],
  },
];


const MenuItemCard = ({ item }: { item: MenuCategory['items'][0] }) => (
  <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
    <CardHeader className="p-0">
      <div className="relative aspect-video w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          data-ai-hint={item.hint}
        />
      </div>
    </CardHeader>
    <CardContent className="flex-grow p-4">
      <CardTitle className="font-headline text-xl mb-2">{item.name}</CardTitle>
      <CardDescription>{item.description}</CardDescription>
    </CardContent>
    <CardFooter className="flex justify-between items-center p-4 pt-0">
      <p className="text-lg font-bold text-primary">₹{item.price.toFixed(2)}</p>
      <Button>Add to Cart</Button>
    </CardFooter>
  </Card>
);


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center my-12">
        <h1 className="font-headline text-5xl md:text-7xl font-bold">Welcome to Podosi</h1>
        <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-muted-foreground">
          Discover a world of flavor with our handcrafted cakes, freshly brewed coffee, and savory delights.
        </p>
      </section>

      <section>
        <h2 className="font-headline text-4xl text-center mb-8">Our Menu</h2>
        <Tabs defaultValue={menuData[0].name} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto">
            {menuData.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>{category.name}</TabsTrigger>
            ))}
          </TabsList>
          {menuData.map((category) => (
            <TabsContent key={category.name} value={category.name} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
