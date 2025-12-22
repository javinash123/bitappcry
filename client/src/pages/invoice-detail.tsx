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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("crypto");

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
    <div className="min-h-screen bg-background font-sans flex items-center justify-center p-4">
      <main className="w-full max-w-2xl space-y-4 sm:space-y-6">
        {/* Company Header */}
        <Card className="border-2 border-border/50">
          <CardContent className="pt-6 flex flex-row items-center gap-4">
            <img
              src={companyLogo}
              alt={companyName}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border border-border/30 object-cover"
              data-testid="img-company-logo"
            />
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-bold font-heading truncate">{companyName}</h2>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Invoice {invoiceId}</p>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Details */}
        <Card className="border-2 border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg">INVOICE</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-foreground">{itemName}</span>
              <span className="text-sm sm:text-base font-semibold">{itemAmount.toFixed(2)} AED</span>
            </div>

            <div className="border-t border-border/30 pt-4 space-y-3">
              <div className="bg-primary/5 p-3 sm:p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center text-[10px] sm:text-sm">
                  <span>Taxes & Fees</span>
                  <span className="text-muted-foreground">VAT ({vatPercentage}%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] sm:text-xs text-muted-foreground">Service Fee</span>
                  <span className="text-xs sm:text-sm font-semibold">{serviceFee.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between items-center font-semibold border-t border-primary/20 pt-2">
                  <span className="text-[10px] sm:text-sm">Taxes & Fees Total</span>
                  <span className="text-xs sm:text-sm">{taxesTotal.toFixed(2)} AED</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-medium">Total Bill</span>
                  <span className="font-semibold">{totalBill.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-medium">Total Charged</span>
                  <span className="font-semibold">{totalCharged.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-medium">Tip</span>
                  <span className="font-semibold">{tip.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between items-center border-t border-border/30 pt-3 font-bold">
                  <span className="text-xs sm:text-sm">You Pay</span>
                  <span className="text-base sm:text-lg">{youPay.toFixed(2)} AED</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setSplitModalOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 h-9 sm:h-10 font-semibold text-xs sm:text-base"
            data-testid="button-split-bill"
          >
            SPLIT BILL
          </Button>

          <Button
            variant="outline"
            className="w-full border-2 border-primary text-primary hover:bg-primary/5 h-9 sm:h-10 font-semibold text-xs sm:text-base"
            data-testid="button-mark-completed"
          >
            COMPLETED
          </Button>
        </div>

        {/* Tip Section */}
        <Card className="border-2 border-border/50">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xs sm:text-sm uppercase tracking-wide">Do you want to include a tip?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[10px] sm:text-sm text-muted-foreground">All proceeds go directly to our staff</p>

            <div className="flex flex-row gap-2 sm:gap-3">
              <Button
                variant={selectedTip === "10" ? "default" : "outline"}
                onClick={() => handleSelectTip(10)}
                className={`flex-1 min-w-0 h-9 sm:h-10 text-[10px] sm:text-sm ${selectedTip === "10" ? "bg-primary hover:bg-primary/90" : "border-2"}`}
                data-testid="button-tip-10"
              >
                10%
              </Button>
              <Button
                variant={selectedTip === "25" ? "default" : "outline"}
                onClick={() => handleSelectTip(25)}
                className={`flex-1 min-w-0 h-9 sm:h-10 text-[10px] sm:text-sm ${selectedTip === "25" ? "bg-primary hover:bg-primary/90" : "border-2"}`}
                data-testid="button-tip-25"
              >
                25%
              </Button>
              <Button
                variant={selectedTip === "custom" ? "default" : "outline"}
                onClick={() => setSelectedTip("custom")}
                className={`flex-1 min-w-0 h-9 sm:h-10 text-[10px] sm:text-sm ${selectedTip === "custom" ? "bg-primary hover:bg-primary/90" : "border-2"}`}
                data-testid="button-tip-custom"
              >
                Custom
              </Button>
            </div>

            {selectedTip === "custom" && (
              <div className="flex gap-2 flex-row">
                <Input
                  type="number"
                  placeholder="5.25"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="flex-1 border-2 border-border/50 focus:border-primary/50 h-9 sm:h-10 text-sm"
                  data-testid="input-custom-tip"
                />
                <Button
                  className="bg-primary hover:bg-primary/90 h-9 sm:h-10 px-4 text-xs sm:text-sm"
                  data-testid="button-update-tip"
                >
                  Update
                </Button>
              </div>
            )}

            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Base: <span className="font-semibold">{totalBill.toFixed(2)} AED</span> Tip: <span className="text-primary font-semibold">{tip.toFixed(2)} AED</span>
            </p>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="border-2 border-border/50">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xs sm:text-sm uppercase tracking-wide">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="grid grid-cols-2 gap-3">
              <label
                htmlFor="crypto"
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 cursor-pointer border-2 ${
                  selectedPaymentMethod === "crypto"
                    ? "border-primary bg-primary/8 shadow-sm"
                    : "border-border/30 bg-white/40 dark:bg-white/5"
                } hover:border-primary/50 hover:shadow-md`}
              >
                <RadioGroupItem value="crypto" id="crypto" className="sr-only" />
                <p className="text-xs sm:text-sm font-semibold text-foreground">Crypto</p>
              </label>

              <label
                htmlFor="apple"
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 cursor-pointer border-2 ${
                  selectedPaymentMethod === "apple"
                    ? "border-primary bg-primary/8 shadow-sm"
                    : "border-border/30 bg-white/40 dark:bg-white/5"
                } hover:border-primary/50 hover:shadow-md`}
              >
                <RadioGroupItem value="apple" id="apple" className="sr-only" />
                <p className="text-xs sm:text-sm font-semibold text-foreground">Apple Pay</p>
              </label>

              <label
                htmlFor="samsung"
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 cursor-pointer border-2 ${
                  selectedPaymentMethod === "samsung"
                    ? "border-primary bg-primary/8 shadow-sm"
                    : "border-border/30 bg-white/40 dark:bg-white/5"
                } hover:border-primary/50 hover:shadow-md`}
              >
                <RadioGroupItem value="samsung" id="samsung" className="sr-only" />
                <p className="text-xs sm:text-sm font-semibold text-foreground">Samsung Pay</p>
              </label>

              <label
                htmlFor="card"
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 cursor-pointer border-2 ${
                  selectedPaymentMethod === "card"
                    ? "border-primary bg-primary/8 shadow-sm"
                    : "border-border/30 bg-white/40 dark:bg-white/5"
                } hover:border-primary/50 hover:shadow-md`}
              >
                <RadioGroupItem value="card" id="card" className="sr-only" />
                <p className="text-xs sm:text-sm font-semibold text-foreground">Card</p>
              </label>
            </RadioGroup>

            <Button
              className="w-full bg-black hover:bg-black/90 text-white h-10 text-xs sm:text-sm font-semibold transition-all duration-300"
              data-testid="button-pay-method"
            >
              PAY {selectedPaymentMethod === "crypto" ? "WITH CRYPTO" : `WITH ${selectedPaymentMethod === "apple" ? "APPLE PAY" : selectedPaymentMethod === "samsung" ? "SAMSUNG PAY" : "CARD"}`}
            </Button>

            <p className="text-[10px] text-muted-foreground text-center">
              By clicking on pay you agree with SimpleBit's terms of use
            </p>
          </CardContent>
        </Card>

        {/* Share Section */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full border-2 h-9 sm:h-10 gap-2 text-[10px] sm:text-sm"
            onClick={handleCopyLink}
            data-testid="button-copy-link"
          >
            <Copy className="h-3.5 w-3.5" /> {copiedLink ? "Copied" : "Copy Link"}
          </Button>
          <Button
            variant="outline"
            className="w-full border-2 h-9 sm:h-10 gap-2 text-[10px] sm:text-sm"
            data-testid="button-share-invoice"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>
        </div>

        {/* Footer */}
        <p className="text-[10px] text-muted-foreground text-center pb-8">
          Powered by SimpleBit
        </p>
      </main>

      <SplitPaymentModal
        isOpen={splitModalOpen}
        onClose={() => setSplitModalOpen(false)}
        maxAmount={youPay}
      />
    </div>
  );
}
