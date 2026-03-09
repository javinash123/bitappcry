import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChevronDown,
  ChevronUp,
  Lock,
  Smartphone,
  CreditCard,
  Copy,
  Download,
} from "lucide-react";
import expressButtonImage from "@assets/expressbutton_1773056777079.jpg";
import cardLogosImage from "@assets/cardlogos_1773056777082.jpg";
import applePayImage from "@assets/ChatGPT_Image_Mar_10,_2026,_03_34_44_AM_1773094087203.png";
import googlePayImage from "@assets/ChatGPT_Image_Mar_10,_2026,_03_33_18_AM_1773094087204.png";
import cardsImage from "@assets/cards_1773094087200.png";

interface SplitPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxAmount: number;
}

function SplitPaymentModal({ isOpen, onClose, maxAmount }: SplitPaymentModalProps) {
  const [amount, setAmount] = useState<string>("0.00");
  const [errors, setErrors] = useState<string>("");

  const handleSelectPercent = (percent: number) => {
    const calculated = (maxAmount * percent / 100).toFixed(2);
    setAmount(calculated);
    setErrors("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Allow empty string or single zero/decimal while typing
    if (value === "" || value === "0" || value === "0." || value === ".") {
      setAmount(value);
      return;
    }

    setAmount(value);
    
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      if (numericValue > maxAmount) {
        setErrors(`Amount cannot exceed ${maxAmount.toFixed(2)} AED`);
      } else if (numericValue <= 0) {
        setErrors("Amount must be greater than 0");
      } else {
        setErrors("");
      }
    }
  };

  const handleBlur = () => {
    const numericValue = parseFloat(amount);
    if (!isNaN(numericValue)) {
      setAmount(numericValue.toFixed(2));
    } else {
      setAmount("0.00");
    }
  };

  const handleContinue = () => {
    if (!amount) {
      setErrors("Please enter an amount");
      return;
    }
    if (errors) return;
    alert(`Split payment of ${parseFloat(amount).toFixed(2)} AED initiated`);
    setAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ backdropFilter: "blur(4px)" }}>
        <DialogHeader>
          <DialogTitle>Split Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 75, 100].map((percent) => (
              <Button key={percent} variant="outline" onClick={() => handleSelectPercent(percent)}>
                {percent}%
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="split-amount">Custom Amount</Label>
            <div className="flex items-center border bg-[#F8F9FA] dark:bg-muted/30 rounded-md focus-within:ring-1 focus-within:ring-[#A020F0]">
              <span className="text-sm font-medium text-muted-foreground px-3 py-3 whitespace-nowrap">AED</span>
              <Input
                id="split-amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="0.00"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:outline-none p-3 text-left flex-1"
              />
            </div>
            {errors && <p className="text-xs text-destructive">{errors}</p>}
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleContinue} className="flex-1 bg-[#A020F0] hover:bg-[#8A1BD1] text-white font-bold">
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddTipModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (amount: number) => void }) {
  const [tipAmount, setTipAmount] = useState("0.00");

  const handleBlur = () => {
    const numericValue = parseFloat(tipAmount);
    if (!isNaN(numericValue)) {
      setTipAmount(numericValue.toFixed(2));
    } else {
      setTipAmount("0.00");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || value === "0" || value === "0." || value === ".") {
      setTipAmount(value);
      return;
    }
    setTipAmount(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ backdropFilter: "blur(4px)" }}>
        <DialogHeader>
          <DialogTitle>Add Tip</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            {[5, 10, 15].map((percent) => (
              <Button key={percent} variant="outline" onClick={() => setTipAmount((100 * percent / 100).toFixed(2))}>
                {percent}%
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Custom Amount</Label>
            <div className="flex items-center border bg-[#F8F9FA] dark:bg-muted/30 rounded-md focus-within:ring-1 focus-within:ring-[#A020F0]">
              <span className="text-sm font-medium text-muted-foreground px-3 py-3 whitespace-nowrap">AED</span>
              <Input 
                type="number" 
                step="0.01"
                value={tipAmount} 
                onChange={handleInputChange} 
                onBlur={handleBlur}
                placeholder="0.00" 
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:outline-none p-3 text-left flex-1" 
              />
            </div>
          </div>
          <Button className="w-full bg-[#A020F0] hover:bg-[#8A1BD1] text-white font-bold" onClick={() => { onAdd(Number(tipAmount)); onClose(); }}>Add Tip</Button>
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

            {/* Split & Tip Buttons - Centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="secondary" className="bg-[#F8F9FA] dark:bg-muted/50 text-foreground hover:bg-muted/70 hover:border-2 hover:border-[#A020F0] h-12 font-semibold border-2 border-transparent transition-colors" onClick={() => setSplitModalOpen(true)} data-testid="button-split-bill">
                  Split Bill
                </Button>
                <Button variant="secondary" className="bg-[#F8F9FA] dark:bg-muted/50 text-foreground hover:bg-muted/70 hover:border-2 hover:border-[#A020F0] h-12 font-semibold border-2 border-transparent transition-colors" onClick={() => setTipModalOpen(true)} data-testid="button-add-tip">
                  Add Tip
                </Button>
              </div>
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
              <div className="space-y-3">
                <button 
                  className="w-full h-[72px] rounded-lg overflow-hidden flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 transition-all hover:border-[#A020F0] focus:outline-none focus:border-[#A020F0]"
                  data-testid="button-google-pay"
                >
                  <img src={googlePayImage} alt="Google Pay" className="h-16 w-auto object-contain" />
                </button>
                <button 
                  className="w-full h-[72px] rounded-lg overflow-hidden flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 transition-all hover:border-[#A020F0] focus:outline-none focus:border-[#A020F0]"
                  data-testid="button-apple-pay"
                >
                  <img src={applePayImage} alt="Apple Pay" className="h-16 w-auto object-contain" />
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <p className="text-base font-bold text-foreground uppercase">PAYMENT METHOD</p>
              <RadioGroup value="card" defaultValue="card">
                <div className="border-2 border-[#A020F0] bg-[#F8F9FA] dark:bg-muted/30 p-4 rounded-lg flex-col sm:flex-row flex sm:items-center gap-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="card" id="card-option" />
                    <Label htmlFor="card-option" className="text-sm text-[#7F8589] font-medium cursor-pointer flex-1 m-0 whitespace-nowrap">Card</Label>
                  </div>
                  <div className="flex items-center ml-auto">
                    <img src={cardsImage} alt="Visa, Mastercard, Amex" className="h-10 sm:h-12 w-auto object-contain" />
                  </div>
                </div>
              </RadioGroup>
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
                  className="bg-[#F8F9FA] dark:bg-muted/30 border-none h-12 pl-10 pr-4" 
                  data-testid="input-card-number" 
                />
                <CreditCard className="absolute left-3 top-3 w-6 h-6 text-muted-foreground" />
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
        <Button className="w-full max-w-sm bg-[#A020F0] hover:bg-[#8A1BD1] text-white h-16 text-xl font-bold rounded-xl" data-testid="button-place-order">
          Place Order
        </Button>
      </div>

      {/* Sticky Place Order Button - Desktop */}
      <div className="hidden md:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Button className="bg-[#A020F0] hover:bg-[#8A1BD1] text-white px-20 h-16 text-xl font-bold rounded-xl" data-testid="button-place-order-sticky">
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
      <div className="border-b border-gray-300 dark:border-gray-600 pb-4 space-y-3">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <div className="text-muted-foreground">{item.name}</div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs font-bold">X{item.qty}</span>
              <span className="text-muted-foreground">AED</span>
              <span className="text-muted-foreground min-w-16 text-right">{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-b border-gray-300 dark:border-gray-600 pb-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Total</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">AED</span>
            <span className="text-muted-foreground min-w-16 text-right">{orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">VAT</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">AED</span>
            <span className="text-muted-foreground min-w-16 text-right">{taxVat.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Service Fee</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">AED</span>
            <span className="text-muted-foreground min-w-16 text-right">190.00</span>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300 dark:border-gray-600 pb-4 space-y-2">
        <div className="flex justify-between items-center text-sm font-bold">
          <span className="text-foreground">Grand Total</span>
          <div className="flex items-center gap-2">
            <span className="text-foreground">AED</span>
            <span className="text-foreground min-w-16 text-right">{customerOrderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Paid by Customer</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">AED</span>
            <span className="text-muted-foreground min-w-16 text-right">{paidByCustomer.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm font-bold">
          <span className="text-foreground">Outstanding Balance</span>
          <div className="flex items-center gap-2">
            <span className="text-[#A020F0]">AED</span>
            <span className="text-[#A020F0] min-w-16 text-right">{outstandingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
