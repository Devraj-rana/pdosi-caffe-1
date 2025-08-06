import { UtensilsCrossed, Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-accent/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl font-bold">Delicious Pdosi</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your favorite spot for cakes, coffee, and comfort food.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary">Menu</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@deliciouspdosi.cafe</span>
              </li>
               <li className="flex items-center justify-center md:justify-start gap-2">
                 <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span>Chat on WhatsApp</span>
                 </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Delicious Pdosi. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
