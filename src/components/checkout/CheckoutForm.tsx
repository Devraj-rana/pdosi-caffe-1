
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

type DeliveryType = 'Home Delivery' | 'Take Away';

export default function CheckoutForm() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [deliveryType, setDeliveryType] = useState<DeliveryType>('Home Delivery');
    const [loading, setLoading] = useState(false);
    const { cartItems, getCartTotal, clearCart } = useCart();
    const router = useRouter();
    const { toast } = useToast();

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast({
                variant: 'destructive',
                title: 'Your cart is empty',
                description: 'Please add items to your cart before placing an order.',
            });
            return;
        }

        if (deliveryType === 'Home Delivery' && (!address || !pincode)) {
            toast({
                variant: 'destructive',
                title: 'Address is required',
                description: 'Please fill in your address and pincode for delivery.',
            });
            return;
        }


        setLoading(true);

        try {
            await addDoc(collection(db, 'orders'), {
                customerName: name,
                phoneNumber: phone,
                address: deliveryType === 'Home Delivery' ? address : '',
                pincode: deliveryType === 'Home Delivery' ? pincode : '',
                deliveryType: deliveryType,
                orderItems: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                totalAmount: getCartTotal(),
                paymentMethod: 'Cash on Delivery',
                orderStatus: 'Pending',
                orderDate: serverTimestamp(),
            });

            clearCart();
            router.push('/order-success');

        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Order Failed',
                description: error.message,
            });
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <form onSubmit={handlePlaceOrder}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Delivery Type</Label>
                        <RadioGroup 
                            value={deliveryType} 
                            onValueChange={(value: string) => setDeliveryType(value as DeliveryType)}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Home Delivery" id="home-delivery" />
                                <Label htmlFor="home-delivery">Home Delivery</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Take Away" id="take-away" />
                                <Label htmlFor="take-away">Take Away</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address" className={cn(deliveryType === 'Take Away' && 'text-muted-foreground')}>
                            Full Address
                        </Label>
                        <Textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required={deliveryType === 'Home Delivery'}
                            disabled={deliveryType === 'Take Away'}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pincode" className={cn(deliveryType === 'Take Away' && 'text-muted-foreground')}>
                            Pincode
                        </Label>
                        <Input
                            id="pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            required={deliveryType === 'Home Delivery'}
                            disabled={deliveryType === 'Take Away'}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? 'Placing Order...' : `Place Order (Pay ₹${getCartTotal().toFixed(2)})`}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

    