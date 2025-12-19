import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDownLeft, Clock, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecentTransactions() {
  const transactions = [
    { from: "Parveens Saini", type: "USDTBSC", date: "Sep 19", amount: "+57.75", currency: "AED", status: "expired" },
    { from: "Customer Ref#992", type: "BNBBSC", date: "Sep 10", amount: "+105.00", currency: "AED", status: "expired" },
    { from: "Parveens Saini", type: "USDTBSC", date: "Sep 10", amount: "+52.50", currency: "AED", status: "success" },
    { from: "Customer Ref#881", type: "TRX", date: "Sep 08", amount: "+12.00", currency: "AED", status: "pending" },
  ];

  return (
    <Card className="h-full glass-card border-none shadow-sm flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-heading flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
          Transactions
        </CardTitle>
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">Recent</span>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-0 flex-1">
          {transactions.map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-3 -mx-3 rounded-xl hover:bg-muted/50 transition-colors group border-b border-border/40 last:border-0 border-dashed">
              <div className="flex items-center gap-3">
                 <div className={cn("h-9 w-9 rounded-full flex items-center justify-center border",
                    tx.status === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 
                    tx.status === 'pending' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                    'bg-slate-50 border-slate-100 text-slate-400'
                 )}>
                    {tx.status === 'success' ? <ArrowDownLeft className="h-4 w-4" /> : 
                     tx.status === 'pending' ? <Clock className="h-4 w-4" /> :
                     <XCircle className="h-4 w-4" />
                    }
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{tx.from}</p>
                   <div className="flex items-center gap-2">
                     <span className="text-xs text-muted-foreground">{tx.date}</span>
                     <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                     <span className="text-[10px] font-medium uppercase text-muted-foreground tracking-wide">{tx.type}</span>
                   </div>
                 </div>
              </div>
              <div className="text-right">
                <p className={cn("text-sm font-bold", 
                  tx.status === 'success' ? 'text-emerald-600' : 
                  tx.status === 'pending' ? 'text-amber-600' : 
                  'text-muted-foreground line-through opacity-70'
                )}>{tx.amount}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-medium">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 mt-auto">
          <Button variant="ghost" className="w-full text-xs h-9 text-muted-foreground hover:text-primary">
            View History <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
