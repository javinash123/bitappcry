import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { PopularCryptos } from "@/components/dashboard/PopularCryptos";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { BusinessInfo } from "@/components/dashboard/BusinessInfo";
import { Menu, Bell, Search } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen transition-all duration-300">
        
        {/* Top Header */}
        <header className="h-20 border-b border-border/40 bg-white/50 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 md:hidden">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-muted rounded-md">
                  <Menu className="h-6 w-6 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-r-0 bg-transparent">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <div className="font-bold font-heading text-lg">SimpleBit</div>
          </div>

          <div className="hidden md:flex flex-col">
            <h1 className="text-xl font-bold font-heading text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-xs">Overview of your business</p>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex relative w-64">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input placeholder="Search transactions..." className="pl-9 h-9 bg-background/50 border-border/50 focus:bg-background transition-all" />
             </div>
             
             <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
               <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
               <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
             </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          <StatsCards />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
               <QuickActions />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
               <PopularCryptos />
               <RecentTransactions />
            </div>
          </div>

          <BusinessInfo />
        </main>
      </div>
    </div>
  );
}
