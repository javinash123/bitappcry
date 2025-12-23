import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, Wallet, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
      {/* Hero Card - Available Balance */}
      <Card className="md:col-span-5 relative overflow-hidden border-none shadow-glow bg-primary text-primary-foreground">
        <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-24 bg-black/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />
        
        <CardContent className="relative p-8 flex flex-col justify-between h-full min-h-[220px]">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-primary-foreground/80 text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>+12.5%</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
          
          <div>
            <p className="text-primary-foreground/70 font-medium mb-1">Available Balance</p>
            <h2 className="text-5xl font-bold font-heading tracking-tight">52.50 <span className="text-2xl font-medium opacity-60">AED</span></h2>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Cards Grid */}
      <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <Card className="glass-card hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-purple-500/10 rounded-xl">
                <Receipt className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">Items</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold font-heading text-foreground">127</h3>
              <p className="text-sm text-muted-foreground mt-1">Total Items</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-blue-500/10 rounded-xl">
                <Receipt className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Invoices</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold font-heading text-foreground">12</h3>
              <span className="text-sm text-muted-foreground">Generated</span>
            </div>
             <p className="text-sm text-muted-foreground mt-1">1 Paid today</p>
          </CardContent>
        </Card>

        <Card className="glass-card sm:col-span-2 flex items-center justify-between p-6">
           <div className="flex items-center gap-4">
             <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center border-4 border-white shadow-sm">
                <span className="text-xl">🏆</span>
             </div>
             <div>
               <p className="font-bold text-foreground">Complete Payment</p>
               <p className="text-sm text-muted-foreground">1 payment successfully completed</p>
             </div>
           </div>
           <div className="text-right">
             <p className="text-2xl font-bold text-foreground">100%</p>
             <p className="text-xs text-muted-foreground">Success Rate</p>
           </div>
        </Card>
      </div>
    </div>
  );
}
