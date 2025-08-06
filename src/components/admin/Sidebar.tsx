import Link from "next/link";
import { UtensilsCrossed, LayoutDashboard, Utensils, ClipboardList, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/menu", label: "Manage Menu", icon: Utensils },
    { href: "/admin/orders", label: "Manage Orders", icon: ClipboardList },
    { href: "/admin/add-item", label: "Add New Item", icon: PlusCircle },
]

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="h-16 flex items-center justify-center border-b border-gray-700">
                <Link href="/admin" className="flex items-center space-x-2">
                    <UtensilsCrossed className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold">Delicious Pdosi</span>
                </Link>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className={cn(
                        "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                        pathname === link.href ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    )}>

                        <link.icon className="mr-3 h-5 w-5" />
                        {link.label}

                    </Link>
                ))}
            </nav>
        </aside>
    )
}
