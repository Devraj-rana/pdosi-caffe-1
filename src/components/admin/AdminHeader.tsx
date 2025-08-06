import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </div>
      <div>
        <Button variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
