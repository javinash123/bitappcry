import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      window.location.href = `/pay-with/${invoiceId}/${selectedCrypto}`;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center p-4">
      <main className="w-full max-w-2xl space-y-6">
        {/* Company Header */}
        <Card className="border-2 border-border/50">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-bold font-heading">{companyName}</h2>
              <p className="text-sm text-muted-foreground">Invoice #{invoiceId}</p>
              <p className="text-sm font-semibold">{totalToPay.toFixed(2)} AED (Total with fee {totalToPay.toFixed(2)} AED)</p>
              <p className="text-xs text-muted-foreground">
                Service fee: {serviceFee.toFixed(2)} AED - Total charged {totalToPay.toFixed(2)} AED
              </p>
              <p className="text-xs text-primary font-semibold">Remaining {totalToPay.toFixed(2)} AED</p>
            </div>
          </CardContent>
        </Card>

        {/* Amount to Pay */}
        <Card className="border-2 border-border/50">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xs sm:text-sm uppercase tracking-wide">
              Amount to Pay (AED) (Enter total you want to pay incl. fee)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="number"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                placeholder={totalToPay.toString()}
                className="flex-1 border-2 border-border/50 focus:border-primary/50 h-10 text-base"
                data-testid="input-amount-to-pay"
              />
              <Button
                onClick={handleSelectMax}
                className="bg-primary hover:bg-primary/90 h-10 px-4 text-xs sm:text-sm font-semibold"
                data-testid="button-max-amount"
              >
                MAX
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Leave blank or use MAX to pay remaining balance.
            </p>
            <p className="text-xs text-muted-foreground">
              Base {baseAmount.toFixed(2)} AED + Fee {serviceFee.toFixed(2)} AED = You pay {totalToPay.toFixed(2)} AED
            </p>
          </CardContent>
        </Card>

        {/* Select Cryptocurrency */}
        <Card className="border-2 border-border/50">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xs sm:text-sm uppercase tracking-wide">Select Cryptocurrency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup value={selectedCrypto} onValueChange={setSelectedCrypto} className="space-y-2">
              {cryptocurrencies.map((crypto) => (
                <label
                  key={crypto.id}
                  htmlFor={crypto.id}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 cursor-pointer border-2 ${
                    selectedCrypto === crypto.id
                      ? "border-primary bg-primary/8"
                      : "border-border/30 bg-white/40 dark:bg-white/5"
                  } hover:border-primary/50`}
                >
                  <RadioGroupItem value={crypto.id} id={crypto.id} className="sr-only" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{crypto.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {crypto.network} • {crypto.time} • Min {crypto.minAmount} AED
                    </div>
                  </div>
                  <div className="text-sm font-bold text-primary">B</div>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Pay Button */}
        <Button
          onClick={handlePay}
          className="w-full bg-black hover:bg-black/90 text-white h-11 text-sm sm:text-base font-semibold"
          data-testid="button-pay-crypto"
        >
          PAY WITH {cryptocurrencies.find(c => c.id === selectedCrypto)?.code}
        </Button>

        {/* Back Button */}
        <Link href={`/invoice/${invoiceId}`}>
          <Button
            variant="outline"
            className="w-full border-2 border-primary text-primary hover:bg-primary/5 h-11 text-sm font-semibold"
            data-testid="button-back-to-invoice"
          >
            BACK TO INVOICE
          </Button>
        </Link>

        {/* Footer */}
        <p className="text-xs text-muted-foreground text-center pb-4">
          Secure payment • Powered by SimpleBit
        </p>
      </main>
    </div>
  );
}
