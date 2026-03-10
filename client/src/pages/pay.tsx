import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import visaLogo from "@assets/visa20_1773100930091.jpg";
import mastercardLogo from "@assets/master20_1773100930090.png";
import amexLogo from "@assets/amex20_1773100930087.png";

export default function Pay() {
  const [match, params] = useRoute("/pay/:id");
  const [amountInput, setAmountInput] = useState("121.25");
  const [selectedCrypto, setSelectedCrypto] = useState("usdt-trc20");

  // Mock invoice data
  const invoiceId = params?.id || "INV-2025-001";
  const companyName = "Webcreateres";
  const baseAmount = 115.50;
  const serviceFee = 5.78;
  const totalToPay = 121.25;

  const cryptocurrencies = [
    {
      id: "usdt-trc20",
      name: "USDT (TRC-20)",
      code: "USDTTRC20",
      network: "TRON",
      time: "~5 min",
      minAmount: 50,
    },
    {
      id: "usdt-bsc",
      name: "USDT (BSC)",
      code: "USDTBSC",
      network: "BSC",
      time: "~3 min",
      minAmount: 50,
    },
    {
      id: "usdt-solana",
      name: "USDT (Solana)",
      code: "USDTSOL",
      network: "Solana",
      time: "~1 min",
      minAmount: 50,
    },
    {
      id: "usdt-polygon",
      name: "USDT (Polygon)",
      code: "USDTMATIC",
      network: "Polygon",
      time: "~2 min",
      minAmount: 50,
    },
  ];

  const handleSelectMax = () => {
    setAmountInput(totalToPay.toString());
  };

  const handlePay = () => {
    const selected = cryptocurrencies.find(c => c.id === selectedCrypto);
    if (selected) {
      window.location.href = `${import.meta.env.BASE_URL}pay-with/${invoiceId}/${selectedCrypto}`;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center p-4">
      <main className="w-full max-w-2xl space-y-2">
        {/* Company Header */}
        <Card className="border-2 border-border/50">
          <CardContent className="pt-2 pb-2">
            <div className="space-y-0">
              <h2 className="text-sm font-bold font-heading">{companyName}</h2>
              <p className="text-[10px] text-muted-foreground leading-none">Invoice #{invoiceId}</p>
              <p className="text-xs font-semibold mt-0.5">{totalToPay.toFixed(2)} AED (Total with fee {totalToPay.toFixed(2)} AED)</p>
              <div className="flex flex-wrap gap-x-2 gap-y-0">
                <p className="text-[10px] text-muted-foreground">
                  Service fee: {serviceFee.toFixed(2)} AED
                </p>
                <p className="text-[10px] text-primary font-semibold">Remaining {totalToPay.toFixed(2)} AED</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Express Checkout */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-7 py-0 flex items-center justify-center border-2 border-border/50 hover:bg-accent/50">
            <span className="text-blue-600 font-bold italic text-[10px]">PayPal</span>
          </Button>
          <Button variant="outline" className="h-7 py-0 flex items-center justify-center border-2 border-border/50 hover:bg-accent/50">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[10px]">G Pay</span>
            </div>
          </Button>
        </div>

        {/* Amount to Pay */}
        <Card className="border-2 border-border/50">
          <CardHeader className="py-1 px-4">
            <CardTitle className="text-[9px] uppercase tracking-wide">
              Amount to Pay (AED)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 pb-2 px-4">
            <div className="flex gap-2">
              <Input
                type="number"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                placeholder={totalToPay.toString()}
                className="flex-1 border-2 border-border/50 focus:border-primary/50 h-7 text-xs"
                data-testid="input-amount-to-pay"
              />
              <Button
                onClick={handleSelectMax}
                className="bg-primary hover:bg-primary/90 h-7 px-2 text-[9px] font-semibold"
                data-testid="button-max-amount"
              >
                MAX
              </Button>
            </div>
            <p className="text-[9px] text-muted-foreground leading-none">
              Base {baseAmount.toFixed(2)} AED + Fee {serviceFee.toFixed(2)} AED = You pay {totalToPay.toFixed(2)} AED
            </p>
          </CardContent>
        </Card>

        {/* Select Cryptocurrency */}
        <Card className="border-2 border-border/50">
          <CardHeader className="py-1 px-4">
            <CardTitle className="text-[9px] uppercase tracking-wide">Select Cryptocurrency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 pb-2 px-4">
            <RadioGroup value={selectedCrypto} onValueChange={setSelectedCrypto} className="space-y-1">
              {cryptocurrencies.map((crypto) => (
                <label
                  key={crypto.id}
                  htmlFor={crypto.id}
                  className={`flex items-center gap-2 p-1.5 rounded-lg transition-all duration-300 cursor-pointer border-2 ${
                    selectedCrypto === crypto.id
                      ? "border-primary bg-primary/8"
                      : "border-border/30 bg-white/40 dark:bg-white/5"
                  } hover:border-primary/50`}
                >
                  <RadioGroupItem value={crypto.id} id={crypto.id} className="sr-only" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[10px] leading-tight">{crypto.name}</div>
                    <div className="text-[8px] text-muted-foreground leading-tight">
                      {crypto.network} • {crypto.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 px-1">
                    <img src={visaLogo} alt="Visa" className="h-5 w-auto object-contain" />
                    <img src={mastercardLogo} alt="Mastercard" className="h-5 w-auto object-contain" />
                    <img src={amexLogo} alt="Amex" className="h-5 w-auto object-contain" />
                  </div>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Pay Button */}
        <Button
          onClick={handlePay}
          className="w-full bg-black hover:bg-black/90 text-white h-8 text-[10px] font-semibold"
          data-testid="button-pay-crypto"
        >
          PAY WITH {cryptocurrencies.find(c => c.id === selectedCrypto)?.code}
        </Button>

        {/* Back Button */}
        <Link href={`/invoice/${invoiceId}`}>
          <Button
            variant="outline"
            className="w-full border-2 border-primary text-primary hover:bg-primary/5 h-8 text-[10px] font-semibold"
            data-testid="button-back-to-invoice"
          >
            BACK TO INVOICE
          </Button>
        </Link>

        {/* Footer */}
        <p className="text-[9px] text-muted-foreground text-center pb-1">
          Secure payment • Powered by SimpleBit
        </p>
      </main>
    </div>
  );
}
