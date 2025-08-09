
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg text-center p-8 shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full h-20 w-20 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold mt-6">Order Placed Successfully!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. You will receive updates via SMS. For deliveries, please keep cash ready.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/orders">Track Order</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
