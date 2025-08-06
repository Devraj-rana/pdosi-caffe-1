import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactMap from "@/components/contact/Map";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-7xl font-bold">Get In Touch</h1>
        <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-muted-foreground">
          We&apos;d love to hear from you! Visit us, give us a call, or send a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-2 h-fit shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Our Address</h3>
                <p className="text-muted-foreground">123 Cafe Street, Foodie Town, Yum City 12345</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Phone Number</h3>
                <p className="text-muted-foreground">+91 12345 67890</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Email Address</h3>
                <p className="text-muted-foreground">contact@pdosi.cafe</p>
              </div>
            </div>
            <Separator />
            <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button size="lg" className="w-full">
                <MessageCircle className="mr-2 h-5 w-5" /> Order on WhatsApp
              </Button>
            </a>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 rounded-lg overflow-hidden shadow-lg min-h-[400px] lg:min-h-full">
          <ContactMap />
        </div>
      </div>
    </div>
  );
}
