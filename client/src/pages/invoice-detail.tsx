import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Bell, Share2, Copy } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SplitPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxAmount: number;
}

function SplitPaymentModal({ isOpen, onClose, maxAmount }: SplitPaymentModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

  const handleSelectMax = () => {
    setAmount(maxAmount.toString());
    setErrors("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    if (value && parseFloat(value) > maxAmount) {
      setErrors(`Amount cannot exceed ${maxAmount} AED`);
    } else if (value && parseFloat(value) <= 0) {
      setErrors("Amount must be greater than 0");
    } else {
      setErrors("");
    }
  };

  const handleContinue = () => {
    if (!amount) {
      setErrors("Please enter an amount");
      return;
    }
    if (errors) return;
    alert(`Split payment of ${amount} AED initiated`);
    setAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Split Payment</DialogTitle>
          <DialogDescription>
            Divide the invoice payment into multiple parts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="split-amount" className="text-sm font-medium">
              Enter Amount (AED)
            </Label>
            <Input
              id="split-amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={handleInputChange}
              className="border-2 border-border/50 focus:border-primary/50 h-10"
              data-testid="input-split-amount"
            />
            {errors && <p className="text-xs text-destructive">{errors}</p>}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSelectMax}
              className="flex-1 border-2 h-10 text-sm"
              data-testid="button-select-max"
            >
              Select Max ({maxAmount} AED)
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Maximum amount: <span className="font-semibold">{maxAmount} AED</span>
          </p>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 h-10"
              data-testid="button-split-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1 bg-primary hover:bg-primary/90 h-10"
              data-testid="button-split-continue"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function InvoiceDetail() {
  const [match, params] = useRoute("/invoice/:id");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [splitModalOpen, setSplitModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);
  const [customTip, setCustomTip] = useState("");

  // Mock invoice data
  const companyName = "Webcreateres";
  const companyLogo = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop";
  const invoiceIdValue = params?.id || "INV-2025-001";
  const invoiceId = `#${invoiceIdValue}`;
  const itemName = "1x Mob Dev";
  const itemAmount = 50.0;
  const vatPercentage = 5.0;
  const vatAmount = 2.5;
  const serviceFee = 2.5;
  const taxesTotal = 5.3;
  const totalBill = 57.75;
  const totalCharged = 60.64;
  const tip = 5.25;
  const youPay = 60.64;
  const invoiceLink = `https://app.simple-bit.com/invoice/${invoiceIdValue}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invoiceLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSelectTip = (percentage: number) => {
    setSelectedTip(percentage.toString());
    setCustomTip("");
  };

  return (
    <div className="min-h-screen bg-background font-sans flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-72 flex flex-col min-h-screen transition-all duration-300">
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
            <h1 className="text-xl font-bold font-heading text-foreground">Invoice Details</h1>
            <p className="text-muted-foreground text-xs">View and manage invoice</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-2xl mx-auto w-full space-y-6">
          {/* Company Header */}
          <Card className="border-2 border-border/50">
            <CardContent className="pt-6 flex items-center gap-4">
              <img
                src={companyLogo}
                alt={companyName}
                className="w-16 h-16 rounded-lg border border-border/30 object-cover"
                data-testid="img-company-logo"
              />
              <div>
                <h2 className="text-xl font-bold font-heading">{companyName}</h2>
                <p className="text-sm text-muted-foreground">Invoice {invoiceId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Details */}
          <Card className="border-2 border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">INVOICE</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">{itemName}</span>
                <span className="font-semibold">{itemAmount.toFixed(2)} AED</span>
              </div>

              <div className="border-t border-border/30 pt-4 space-y-3">
                <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Taxes & Fees</span>
                    <span className="text-muted-foreground">VAT ({vatPercentage}%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Service Fee</span>
                    <span className="text-sm font-semibold">{serviceFee.toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold border-t border-primary/20 pt-2">
                    <span className="text-sm">Taxes & Fees Total</span>
                    <span>{taxesTotal.toFixed(2)} AED</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Bill</span>
                    <span className="font-semibold">{totalBill.toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Charged</span>
                    <span className="font-semibold">{totalCharged.toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tip</span>
                    <span className="font-semibold">{tip.toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-border/30 pt-3 font-bold">
                    <span className="text-sm">You Pay</span>
                    <span className="text-lg">{youPay.toFixed(2)} AED</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => setSplitModalOpen(true)}
              className="w-full bg-primary hover:bg-primary/90 h-10 font-semibold"
              data-testid="button-split-bill"
            >
              SPLIT BILL
            </Button>

            <Button
              variant="outline"
              className="w-full border-2 border-primary text-primary hover:bg-primary/5 h-10 font-semibold"
              data-testid="button-mark-completed"
            >
              MARK COMPLETED
            </Button>
          </div>

          {/* Tip Section */}
          <Card className="border-2 border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm uppercase tracking-wide">Do you want to include a tip?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">All proceeds go directly to our staff</p>

              <div className="flex gap-2">
                <Button
                  variant={selectedTip === "10" ? "default" : "outline"}
                  onClick={() => handleSelectTip(10)}
                  className={`flex-1 h-10 ${selectedTip === "10" ? "bg-primary hover:bg-primary/90" : "border-2"}`}
                  data-testid="button-tip-10"
                >
                  10%
                </Button>
                <Button
                  variant={selectedTip === "25" ? "default" : "outline"}
                  onClick={() => handleSelectTip(25)}
                  className={`flex-1 h-10 ${selectedTip === "25" ? "bg-primary hover:bg-primary/90" : "border-2"}`}
                  data-testid="button-tip-25"
                >
                  25%
                </Button>
                <Button
                  variant={selectedTip === "custom" ? "default" : "outline"}
                  onClick={() => setSelectedTip("custom")}
                  className={`flex-1 h-10 ${selectedTip === "custom" ? "bg-primary hover:bg-primary/90" : "border-2"}`}
                  data-testid="button-tip-custom"
                >
                  Custom Tip
                </Button>
              </div>

              {selectedTip === "custom" && (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="5.25"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    className="flex-1 border-2 border-border/50 focus:border-primary/50 h-10 text-sm"
                    data-testid="input-custom-tip"
                  />
                  <Button
                    className="bg-primary hover:bg-primary/90 h-10 px-6"
                    data-testid="button-update-tip"
                  >
                    Update
                  </Button>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Base: <span className="font-semibold">{totalBill.toFixed(2)} AED</span> Current tip: <span className="text-primary font-semibold">{tip.toFixed(2)} AED</span>
              </p>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="border-2 border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm uppercase tracking-wide">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 border-2 border-primary/50 hover:bg-primary/5 flex flex-col items-start p-3 justify-start"
                data-testid="button-payment-crypto"
              >
                <span className="text-sm font-semibold text-primary">Crypto</span>
                <span className="text-xs text-muted-foreground">Pay with supported cryptocurrencies</span>
              </Button>

              <div className="space-y-3 opacity-50 pointer-events-none">
                <div className="p-3 border border-border/30 rounded-md">
                  <p className="text-sm font-semibold text-foreground">Apple Pay</p>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>

                <div className="p-3 border border-border/30 rounded-md">
                  <p className="text-sm font-semibold text-foreground">Samsung Pay</p>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>

                <div className="p-3 border border-border/30 rounded-md">
                  <p className="text-sm font-semibold text-foreground">Card</p>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>
              </div>

              <Button
                className="w-full bg-black hover:bg-black/90 text-white h-10 font-semibold"
                data-testid="button-pay-crypto"
              >
                PAY WITH CRYPTO
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By clicking on pay you agree with SimpleBit's terms of use
              </p>
            </CardContent>
          </Card>

          {/* Share Section */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-2 h-10 gap-2"
              onClick={handleCopyLink}
              data-testid="button-copy-link"
            >
              <Copy className="h-4 w-4" /> {copiedLink ? "Copied" : "Copy Link"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-2 h-10 gap-2"
              data-testid="button-share-invoice"
            >
              <Share2 className="h-4 w-4" /> Share Invoice
            </Button>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted-foreground text-center pb-8">
            Powered by SimpleBit
          </p>
        </main>
      </div>

      <SplitPaymentModal
        isOpen={splitModalOpen}
        onClose={() => setSplitModalOpen(false)}
        maxAmount={youPay}
      />
    </div>
  );
}
