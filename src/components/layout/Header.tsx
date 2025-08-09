
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, UtensilsCrossed, User, Star, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { href: "/", label: "Menu" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Header() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.startsWith(link.href) && link.href !== '/' || pathname === link.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">Delicious Pdosi</span>
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavLinks />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
                <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center p-1">
                            {totalItems}
                        </Badge>
                    )}
                </div>
              <span className="sr-only">Open Cart</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User" />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">User Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                <span>Rewards: 125 pts</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Send Feedback</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4">
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                        <UtensilsCrossed className="h-6 w-6 text-primary" />
                        <span className="font-headline text-xl font-bold">Delicious Pdosi</span>
                    </Link>
                    <nav className="flex flex-col space-y-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            pathname.startsWith(link.href) && link.href !== '/' || pathname === link.href ? "text-primary" : "text-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
