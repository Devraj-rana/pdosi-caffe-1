import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed } from "lucide-react";

export default function AdminLoginPage() {
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
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="admin@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <Button className="w-full">Login</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
