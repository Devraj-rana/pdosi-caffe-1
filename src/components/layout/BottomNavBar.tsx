
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Utensils, ShoppingCart, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import useActiveOrder from '@/hooks/useActiveOrder';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dining', label: 'Dining', icon: Utensils },
  { href: '/delivery', label: 'Delivery', icon: Truck },
];

export default function BottomNavBar() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { hasActiveOrder } = useActiveOrder();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <Link href="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-accent group">
          <Home className={cn("w-6 h-6 mb-1 text-muted-foreground", { "text-primary": pathname === '/' })} />
          <span className={cn("text-xs text-muted-foreground", { "text-primary": pathname === '/' })}>Home</span>
        </Link>

        <Link href="/dining" className="inline-flex flex-col items-center justify-center px-5 hover:bg-accent group">
           <Utensils className={cn("w-6 h-6 mb-1 text-muted-foreground", { "text-primary": pathname === '/dining' })} />
           <span className={cn("text-xs text-muted-foreground", { "text-primary": pathname === '/dining' })}>Dining</span>
        </Link>
        
        <Link href="/delivery" className={cn(
          "inline-flex flex-col items-center justify-center px-5 hover:bg-accent group transition-colors duration-300",
           { 
             "bg-green-500 text-white hover:bg-green-600": hasActiveOrder,
             "text-primary": pathname === '/delivery' && !hasActiveOrder
            }
        )}>
           <Truck className={cn("w-6 h-6 mb-1", { "text-white": hasActiveOrder, "text-muted-foreground": !hasActiveOrder, "text-primary": pathname === '/delivery' && !hasActiveOrder })} />
           <span className={cn("text-xs", { "text-white": hasActiveOrder, "text-muted-foreground": !hasActiveOrder, "text-primary": pathname === '/delivery' && !hasActiveOrder })}>Delivery</span>
        </Link>

        <Link href="/cart" className="inline-flex flex-col items-center justify-center px-5 hover:bg-accent group relative">
            <ShoppingCart className={cn("w-6 h-6 mb-1 text-muted-foreground", { "text-primary": pathname === '/cart' })} />
            <span className={cn("text-xs text-muted-foreground", { "text-primary": pathname === '/cart' })}>Cart</span>
             {totalItems > 0 && (
                <Badge variant="destructive" className="absolute top-1 right-3 h-5 w-5 justify-center p-1">
                    {totalItems}
                </Badge>
            )}
        </Link>
      </div>
    </div>
  );
}
