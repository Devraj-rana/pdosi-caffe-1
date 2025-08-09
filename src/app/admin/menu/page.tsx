'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import type { MenuCategory } from '@/types';
import { Badge } from '@/components/ui/badge';

// This is temporary static data. We will replace this with a Firestore query.
const menuData: MenuCategory[] = [
    {
        name: "Patty",
        items: [
            { id: "p1", name: "Aloo Patty", description: "Classic potato patty, spiced and baked to perfection.", price: 25, image: "https://placehold.co/600x400.png", hint: "aloo patty" },
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

const allMenuItems = menuData.flatMap(category => 
    category.items.map(item => ({...item, category: category.name}))
);

export default function ManageMenuPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Menu</h1>
            <div className="rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allMenuItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                        className="rounded-md object-cover"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{item.category}</Badge>
                                </TableCell>
                                <TableCell>₹{item.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="mr-2">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
