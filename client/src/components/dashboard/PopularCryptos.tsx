import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

export function PopularCryptos() {
  const cryptos = [
    { name: "USDT", network: "BSC", symbol: "USDTBSC", count: 5, amount: "52.50", currency: "AED", icon: "₮", color: "bg-emerald-100 text-emerald-700" },
    { name: "BNB", network: "BSC", symbol: "BNBBSC", count: 4, amount: "0.00", currency: "AED", icon: "B", color: "bg-amber-100 text-amber-700" },
    { name: "TRON", network: "TRX", symbol: "TRX", count: 2, amount: "0.00", currency: "AED", icon: "♦", color: "bg-red-100 text-red-700" },
    { name: "USDC", network: "Polygon", symbol: "USDCMATIC", count: 0, amount: "0.00", currency: "AED", icon: "$", color: "bg-blue-100 text-blue-700" },
  ];

  return (
    <Card className="h-full glass-card border-none shadow-sm flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-heading flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
          Top Crypto
        </CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          {cryptos.map((crypto, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group border border-transparent hover:border-border/50">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg ${crypto.color}`}>
                  {crypto.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-sm text-foreground">{crypto.name}</p>
                    <span className="text-[10px] font-semibold bg-muted px-1.5 rounded uppercase tracking-wide text-muted-foreground">{crypto.network}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{crypto.count} payments</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">{crypto.amount}</p>
                <p className="text-xs text-muted-foreground">{crypto.currency}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 mt-auto">
          <Button variant="outline" className="w-full text-xs h-9 border-dashed">
            View All Assets <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
