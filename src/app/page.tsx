
'use client';

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
import type { MenuCategory, MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const menuData: MenuCategory[] = [
    {
        name: "Patty",
        items: [
            { id: "p1", name: "Aloo Patty", description: "Classic potato patty, spiced and baked to perfection.", price: 25, image: "/aloo-patty.jpg", hint: "aloo patty" },
            { id: "p2", name: "Paneer Patty", description: "Flaky pastry filled with savory paneer masala.", price: 35, image: "https://placehold.co/600x400.png", hint: "paneer patty" },
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
        name: "Waffle",
        items: [
            { id: "w1", name: "Classic Waffle", description: "Golden waffle with maple syrup and butter.", price: 120, image: "https://placehold.co/600x400.png", hint: "classic waffle" },
            { id: "w2", name: "Chocolate Overload", description: "Waffle topped with chocolate sauce, chips, and ice cream.", price: 180, image: "https://placehold.co/600x400.png", hint: "chocolate waffle" },
        ],
    },
    {
        name: "Sweet Corn",
        items: [
            { id: "sc1", name: "Classic Butter Corn", description: "Sweet corn kernels tossed in butter and salt.", price: 60, image: "https://placehold.co/600x400.png", hint: "butter corn" },
            { id: "sc2", name: "Spicy Masala Corn", description: "Corn with a tangy and spicy masala mix.", price: 70, image: "https://placehold.co/600x400.png", hint: "masala corn" },
        ],
    },
    {
        name: "Burger",
        items: [
            { id: "b1", name: "Veggie Burger", description: "A delicious vegetable patty in a soft bun.", price: 100, image: "https://placehold.co/600x400.png", hint: "veggie burger" },
            { id: "b2", name: "Paneer Burger", description: "Crispy paneer patty with lettuce and mayo.", price: 130, image: "https://placehold.co/600x400.png", hint: "paneer burger" },
        ],
    },
    {
        name: "Maggi",
        items: [
            { id: "mg1", name: "Classic Maggi", description: "Your favorite instant noodles, perfectly cooked.", price: 50, image: "https://placehold.co/600x400.png", hint: "classic maggi" },
            { id: "mg2", name: "Vegetable Maggi", description: "Maggi loaded with fresh, crunchy vegetables.", price: 70, image: "https://placehold.co/600x400.png", hint: "vegetable maggi" },
        ],
    },
    {
        name: "Pasta",
        items: [
            { id: "pa1", name: "Red Sauce Pasta", description: "Penne pasta in a tangy tomato and herb sauce.", price: 160, image: "https://placehold.co/600x400.png", hint: "red sauce pasta" },
            { id: "pa2", name: "White Sauce Pasta", description: "Creamy and cheesy pasta with vegetables.", price: 170, image: "https://placehold.co/600x400.png", hint: "white sauce pasta" },
        ],
    },
    {
        name: "Snacks",
        items: [
            { id: "sn1", name: "French Fries", description: "Crispy, golden-fried potato sticks.", price: 90, image: "https://placehold.co/600x400.png", hint: "french fries" },
            { id: "sn2", name: "Chilli Garlic Pops", description: "Spicy potato bites with a garlic kick.", price: 110, image: "https://placehold.co/600x400.png", hint: "chilli garlic pops" },
        ],
    },
    {
        name: "Milkshake",
        items: [
            { id: "m1", name: "Chocolate Shake", description: "Rich and creamy chocolate milkshake.", price: 150, image: "https://placehold.co/600x400.png", hint: "chocolate milkshake" },
            { id: "m2", name: "Strawberry Shake", description: "Made with fresh strawberries and ice cream.", price: 160, image: "https://placehold.co/600x400.png", hint: "strawberry milkshake" },
        ],
    },
    {
        name: "Chai",
        items: [
            { id: "ch1", name: "Masala Chai", description: "Aromatic tea with a blend of Indian spices.", price: 40, image: "https://placehold.co/600x400.png", hint: "masala chai" },
            { id: "ch2", name: "Ginger Chai", description: "Zesty tea infused with fresh ginger.", price: 40, image: "https://placehold.co/600x400.png", hint: "ginger chai" },
        ],
    },
    {
        name: "Mojito",
        items: [
            { id: "mo1", name: "Virgin Mojito", description: "A refreshing mix of mint, lime, and soda.", price: 120, image: "https://placehold.co/600x400.png", hint: "virgin mojito" },
            { id: "mo2", name: "Green Apple Mojito", description: "A tangy twist with green apple flavor.", price: 130, image: "https://placehold.co/600x400.png", hint: "green apple mojito" },
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
];

const MenuItemCard = ({ item, categoryName }: { item: Omit<MenuItem, 'category'>, categoryName: MenuCategory['name'] }) => {
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleAddToCart = () => {
        const itemToAdd: MenuItem = {
            ...item,
            category: categoryName,
        };
        addToCart(itemToAdd);
        toast({
            title: "Added to cart",
            description: `${item.name} has been added to your cart.`,
        });
    };

    return (
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
                <Button onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <section className="text-center my-12">
            <h1 className="font-headline text-5xl md:text-7xl font-bold">Welcome to Delicious Pdosi</h1>
            <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-muted-foreground">
              Discover a world of flavor with our handcrafted cakes, freshly brewed coffee, and savory delights.
            </p>
             <Button size="lg" className="mt-6" asChild>
                <Link href="#menu">Explore Menu</Link>
             </Button>
          </section>

          <section id="menu">
            <h2 className="font-headline text-4xl text-center mb-8">Our Menu</h2>
            <Tabs defaultValue={menuData[0].name} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 h-auto flex-wrap">
                {menuData.map((category) => (
                  <TabsTrigger key={category.name} value={category.name}>{category.name}</TabsTrigger>
                ))}
              </TabsList>
              {menuData.map((category) => (
                <TabsContent key={category.name} value={category.name} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.items.map((item) => (
                      <MenuItemCard key={item.id} item={item} categoryName={category.name} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </div>
      </main>
    </>
  );
}
