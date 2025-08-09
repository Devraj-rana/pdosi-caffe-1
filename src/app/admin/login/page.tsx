
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent, loginType: 'email' | 'phone') => {
        e.preventDefault();
        setLoading(true);

        if (loginType === 'phone') {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Phone number login is not yet supported.",
            });
            setLoading(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin');
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
             <div className="flex justify-center mb-6">
                <UtensilsCrossed className="h-10 w-10 text-primary" />
            </div>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>Welcome back, please login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="email" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="email">Email</TabsTrigger>
                            <TabsTrigger value="phone">Phone</TabsTrigger>
                        </TabsList>
                        <TabsContent value="email">
                            <form onSubmit={(e) => handleLogin(e, 'email')} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder="admin@example.com" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password-email">Password</Label>
                                    <Input 
                                        id="password-email" 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login with Email'}
                                </Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="phone">
                            <form onSubmit={(e) => handleLogin(e, 'phone')} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input 
                                        id="phone" 
                                        type="tel" 
                                        placeholder="+91 12345 67890" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password-phone">Password</Label>
                                    <Input 
                                        id="password-phone" 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login with Phone'}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
