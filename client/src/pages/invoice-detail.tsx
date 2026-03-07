import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  ChevronUp,
  Lock,
  Smartphone,
  CreditCard,
  Copy,
  Download,
} from "lucide-react";

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
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="split-amount">Enter Amount (AED)</Label>
            <Input
              id="split-amount"
              type="number"
              value={amount}
              onChange={handleInputChange}
              placeholder="0.00"
            />
            {errors && <p className="text-xs text-destructive">{errors}</p>}
          </div>
          <Button variant="outline" onClick={handleSelectMax} className="w-full">
            Select Max ({maxAmount} AED)
          </Button>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleContinue} className="flex-1 bg-[#A020F0] hover:bg-[#8A1BD1] text-white">
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddTipModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (amount: number) => void }) {
  const [tipAmount, setTipAmount] = useState("");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Tip</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            {[5, 10, 15].map((percent) => (
              <Button key={percent} variant="outline" onClick={() => setTipAmount((100 * percent / 100).toString())}>
                {percent}%
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Custom Amount (AED)</Label>
            <Input type="number" value={tipAmount} onChange={(e) => setTipAmount(e.target.value)} placeholder="0.00" />
          </div>
          <Button className="w-full bg-[#A020F0] hover:bg-[#8A1BD1] text-white" onClick={() => { onAdd(Number(tipAmount)); onClose(); }}>Add Tip</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function InvoiceDetail() {
  const [, params] = useRoute("/invoice/:id");
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [splitModalOpen, setSplitModalOpen] = useState(false);
  const [tipModalOpen, setTipModalOpen] = useState(false);

  const companyName = "Rent Any Car Dubai";
  const companyId = "7122976";
  const amountToPay = 100.00;
  const currency = "AED";

  const invoiceItems = [
    { name: "Mercedes G63 Car Rental", qty: 1, price: 2500.00 }
  ];
  const orderTotal = 2625.00;
  const taxVat = 125.00;
  const customerOrderTotal = 2625.00;
  const paidByCustomer = 0.00;
  const outstandingBalance = 2625.00;

  return (
    <div className="min-h-screen bg-white md:bg-[#F8F9FA] dark:bg-background font-sans p-0 md:p-8 flex flex-col">
      <div className="max-w-6xl mx-auto bg-white dark:bg-card md:rounded-xl md:shadow-sm md:border md:border-border/40 overflow-hidden flex flex-col flex-1">
        {/* Header */}
        <div className="p-4 md:p-6 flex justify-between items-start border-b border-border/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#8B734B] rounded flex items-center justify-center text-white text-3xl font-bold">
              R
            </div>
            <div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-medium">
                <Lock className="w-3 h-3" /> Secure Checkout
              </div>
              <h1 className="text-xl font-bold text-foreground">{companyName}</h1>
              <p className="text-xs text-muted-foreground">ID: {companyId}</p>
            </div>
          </div>
          <button className="text-xs font-medium text-foreground underline flex items-center gap-1">
             Switch Language
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1">
          {/* Left Column: Summary & Actions */}
          <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 md:border-r border-border/10">
            {/* Amount Display */}
            <div className="bg-[#F8F9FA] dark:bg-muted/30 rounded-xl p-4 md:p-8 text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Amount to Pay:</p>
              <h2 className="text-4xl font-black text-foreground">{currency} {amountToPay.toFixed(2)}</h2>
            </div>

            {/* View Details (Mobile Only Collapse) */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                className="w-full flex justify-center items-center gap-2 text-sm font-medium py-2 bg-[#F8F9FA] dark:bg-muted/30"
                onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                data-testid="button-view-details"
              >
                View Details {isDetailsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
              {isDetailsExpanded && (
                <div className="mt-4 space-y-4 px-2 animate-in fade-in slide-in-from-top-2">
                  <InvoiceSummary items={invoiceItems} orderTotal={orderTotal} taxVat={taxVat} customerOrderTotal={customerOrderTotal} paidByCustomer={paidByCustomer} outstandingBalance={outstandingBalance} />
                </div>
              )}
            </div>

            {/* Split & Tip Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" className="bg-[#F8F9FA] dark:bg-muted/50 text-foreground hover:bg-muted/70 h-12 font-semibold" onClick={() => setSplitModalOpen(true)} data-testid="button-split-bill">
                Split Bill
              </Button>
              <Button variant="outline" className="border-2 border-[#00A3FF] text-foreground hover:bg-[#00A3FF]/5 h-12 font-semibold" onClick={() => setTipModalOpen(true)} data-testid="button-add-tip">
                Add Tip
              </Button>
            </div>

            {/* Desktop Invoice Summary */}
            <div className="hidden md:block space-y-4">
               <InvoiceSummary items={invoiceItems} orderTotal={orderTotal} taxVat={taxVat} customerOrderTotal={customerOrderTotal} paidByCustomer={paidByCustomer} outstandingBalance={outstandingBalance} />
            </div>

            {/* QR Section (Desktop) */}
            <div className="hidden md:block pt-8 border-t border-border/10">
              <p className="text-base font-bold text-foreground mb-4 uppercase">PAY FROM ANOTHER DEVICE</p>
              <div className="flex items-center gap-6">
                <div className="p-2 border border-border/20 rounded-lg bg-white">
                  {/* Placeholder for QR Code */}
                  <div className="w-24 h-24 bg-foreground/5 flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  <p className="text-xs text-muted-foreground">Scan to open invoice</p>
                  <Button variant="outline" className="w-full justify-start gap-2 h-10 text-xs font-semibold hover:bg-[#A020F0] hover:text-white hover:border-[#A020F0] transition-colors" data-testid="button-copy-link">
                    <Copy className="w-4 h-4" /> Copy link
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 h-10 text-xs font-semibold hover:bg-[#A020F0] hover:text-white hover:border-[#A020F0] transition-colors" data-testid="button-download-qr">
                    <Download className="w-4 h-4" /> Download QR
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-8 pb-32 md:pb-8 flex flex-col">
            {/* Express Checkout */}
            <div className="space-y-4">
              <p className="text-base font-bold text-foreground uppercase">EXPRESS CHECKOUT</p>
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-black hover:bg-black/80 text-white h-14 md:h-16 gap-2 flex items-center justify-center font-semibold rounded-lg transition-colors" data-testid="button-apple-pay">
                  Apple Pay
                </Button>
                <Button className="bg-[#5F6368] hover:bg-[#4F6368] text-white h-14 md:h-16 gap-2 flex items-center justify-center font-semibold rounded-lg transition-colors" data-testid="button-google-pay">
                  Google Pay
                </Button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <p className="text-base font-bold text-foreground uppercase">PAYMENT METHOD</p>
              <div className="bg-[#F8F9FA] dark:bg-muted/30 p-4 rounded-lg flex items-center justify-between">
                <span className="text-sm font-medium">Card</span>
              </div>
            </div>

            {/* Your Details */}
            <div className="space-y-4">
              <p className="text-base font-bold text-foreground uppercase">YOUR DETAILS</p>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="First Name" className="bg-[#F8F9FA] dark:bg-muted/30 border-none h-12" data-testid="input-first-name" />
                <Input placeholder="Last Name" className="bg-[#F8F9FA] dark:bg-muted/30 border-none h-12" data-testid="input-last-name" />
              </div>
              <Input placeholder="Email" className="bg-[#F8F9FA] dark:bg-muted/30 border-none h-12" data-testid="input-email" />
              <Input placeholder="Phone Number" className="bg-[#F8F9FA] dark:bg-muted/30 border-none h-12" data-testid="input-phone" />
            </div>

            {/* Payment Details */}
            <div className="space-y-4 flex-1">
              <p className="text-base font-bold text-foreground uppercase">PAYMENT DETAILS</p>
              <div className="relative">
                <Input 
                  placeholder="Card Number" 
                  className="bg-[#F8F9FA] dark:bg-muted/30 border-none h-12 pl-10 pr-16" 
                  data-testid="input-card-number" 
                />
                <CreditCard className="absolute left-3 top-3 w-6 h-6 text-muted-foreground" />
                <span className="absolute right-4 top-3 text-xs font-semibold text-muted-foreground">VISA</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Expiry" className="bg-[#F8F9FA] dark:bg-muted/30 border-none h-12" data-testid="input-card-expiry" />
                <Input placeholder="CVC" className="bg-[#F8F9FA] dark:bg-muted/30 border-none h-12" data-testid="input-card-cvc" />
              </div>

              <div className="space-y-4 pt-4">
                <p className="text-[8px] text-center text-muted-foreground leading-relaxed px-4">
                  By completing this purchase, you are agreeing to the <span className="underline">terms and conditions</span> and <span className="underline">returns & refunds policy</span> of this transaction. This experience is powered by <span className="text-[#A020F0] font-bold">Simplebit.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Place Order Button - Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-card border-t border-border/10 p-4 flex justify-center">
        <Button className="w-full max-w-sm bg-[#A020F0] hover:bg-[#8A1BD1] text-white h-14 text-lg font-bold rounded-xl" data-testid="button-place-order">
          Place Order
        </Button>
      </div>

      {/* Sticky Place Order Button - Desktop */}
      <div className="hidden md:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Button className="bg-[#A020F0] hover:bg-[#8A1BD1] text-white px-16 h-14 text-lg font-bold rounded-xl" data-testid="button-place-order-sticky">
          Place Order
        </Button>
      </div>

      <SplitPaymentModal isOpen={splitModalOpen} onClose={() => setSplitModalOpen(false)} maxAmount={amountToPay} />
      <AddTipModal isOpen={tipModalOpen} onClose={() => setTipModalOpen(false)} onAdd={(amount) => console.log('Tip added:', amount)} />
    </div>
  );
}

function InvoiceSummary({ items, orderTotal, taxVat, customerOrderTotal, paidByCustomer, outstandingBalance }: any) {
  return (
    <div className="space-y-4">
      <p className="text-base font-bold text-foreground uppercase">INVOICE SUMMARY</p>
      <div className="space-y-3">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="flex flex-col text-sm gap-1">
            <span className="text-muted-foreground">{item.name} <span className="text-xs">x{item.qty}</span></span>
            <span className="font-bold">AED {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border/5 space-y-2">
        <div className="flex flex-col text-xs gap-1">
          <span className="text-muted-foreground">Order Total</span>
          <span className="font-medium">AED {orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex flex-col text-xs gap-1">
          <span className="text-muted-foreground">Tax/VAT</span>
          <span className="font-medium">AED {taxVat.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex flex-col text-sm font-bold pt-1 gap-1">
          <span>CUSTOMER ORDER TOTAL</span>
          <span>AED {customerOrderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
      <div className="pt-4 space-y-2">
        <div className="flex flex-col text-xs gap-1">
          <span className="text-muted-foreground">Paid by Customer</span>
          <span className="font-medium">AED {paidByCustomer.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex flex-col text-sm font-bold text-[#A020F0] gap-1">
          <span>OUTSTANDING BALANCE</span>
          <span>AED {outstandingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
}
