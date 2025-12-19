import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Settings2, History, Building, Landmark, CalendarClock } from "lucide-react";
import { Link } from "wouter";

const actionLinks = [
  { label: "New Invoice", icon: Plus, color: "text-white", bg: "bg-primary", href: "/create-invoice" },
  { label: "All Invoices", icon: FileText, color: "text-blue-600", bg: "bg-blue-50 group-hover:bg-blue-100", href: "/invoices" },
  { label: "Items/Taxes", icon: Settings2, color: "text-purple-600", bg: "bg-purple-50 group-hover:bg-purple-100", href: "/items" },
  { label: "Transactions", icon: History, color: "text-orange-600", bg: "bg-orange-50 group-hover:bg-orange-100", href: "/transactions" },
  { label: "Profile", icon: Building, color: "text-slate-600", bg: "bg-slate-50 group-hover:bg-slate-100", href: "/profile" },
  { label: "Banking", icon: Landmark, color: "text-emerald-600", bg: "bg-emerald-50 group-hover:bg-emerald-100", href: "/payouts" },
];

export function QuickActions() {
  return (
    <Card className="h-full glass-card border-none shadow-sm flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-heading flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-cols-2 gap-3">
          {actionLinks.map((action, i) => (
            <Link key={action.href} href={action.href} asChild>
              <button
                className={`group flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 border border-transparent ${
                   i === 0 
                    ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90 col-span-2 flex-row gap-3 py-5" 
                    : "bg-background hover:border-border hover:shadow-sm"
                }`}
              >
                <div className={`p-2 rounded-xl mb-2 ${i===0 ? "bg-white/20 mb-0" : action.bg} ${action.color} transition-colors`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className={`text-sm font-medium ${i===0 ? "text-lg" : "text-muted-foreground group-hover:text-foreground"}`}>
                  {action.label}
                </span>
              </button>
            </Link>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm">
           <div className="flex items-center gap-2 text-muted-foreground">
             <CalendarClock className="h-4 w-4" />
             <span>Payout Schedule</span>
           </div>
           <span className="font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full text-xs">Weekly</span>
        </div>
      </CardContent>
    </Card>
  );
}
