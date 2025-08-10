
'use client';

import { useCart } from '@/context/CartContext';
import { formatINRSimple } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace('/cart');
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-center mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div className="lg:col-span-1">
          <Card className="shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-currency">{formatINRSimple(item.price * item.quantity)}</span>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-currency">{formatINRSimple(getCartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Charges</span>
                <span className="font-currency">{formatINRSimple(0)}</span>
              </div>
               <div className="flex justify-between text-primary">
                <span>Payment Method</span>
                <span>Cash on Delivery</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span className="font-currency">{formatINRSimple(getCartTotal())}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
