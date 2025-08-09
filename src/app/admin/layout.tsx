
'use client';
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import useAuth from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (pathname === '/admin/login') {
      if (user) {
        router.replace('/admin');
      }
    } else {
      if (!user) {
        router.replace('/admin/login');
      }
    }
  }, [user, loading, pathname, router]);


  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    )
  }

  if (pathname === '/admin/login' && !user) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {children}
        </div>
    )
  }
  
  if (!user && pathname !== '/admin/login') {
    return null; // Don't render anything while redirecting
  }

  if (user && pathname === '/admin/login') {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
