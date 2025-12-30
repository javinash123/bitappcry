import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, CheckCircle } from "lucide-react";

export default function PayWith() {
  const [match, params] = useRoute("/pay-with/:id/:crypto");
  const [copiedQRCode, setCopiedQRCode] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  // Mock data
  const invoiceId = params?.id || "INV-2025-001";
  const cryptoType = params?.crypto || "usdt-trc20";
  
  const paymentDetails = {
    reference: "payment_60049f3-9356-4eec-a733-c504d1dd223",
    baseAmount: 115.50,
    serviceFee: 5.78,
    youPay: 121.28,
    cryptoAmount: 56.69,
    cryptoCurrency: "USDT (TRC-20) (USDTTRC20)",
    expectedConfirmations: 20,
    confirmationTime: "min",
    amountToSend: 56.69,
    walletAddress: "TRyJEQxDQqKP32waHKRy5uF7Jt3a5aHz",
  };

  const mockQRCode = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect fill='%23fff' width='250' height='250'/%3E%3Crect fill='%23000' x='20' y='20' width='30' height='30'/%3E%3Crect fill='%23000' x='200' y='20' width='30' height='30'/%3E%3Crect fill='%23000' x='20' y='200' width='30' height='30'/%3E%3Crect fill='%23000' x='90' y='100' width='20' height='20'/%3E%3C/svg%3E";

  const handleCopyQRCode = () => {
    navigator.clipboard.writeText(paymentDetails.walletAddress);
    setCopiedQRCode(true);
    setTimeout(() => setCopiedQRCode(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(paymentDetails.walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(paymentDetails.amountToSend.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleDownloadPDF = () => {
    alert("PDF download would be triggered here");
  };

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center p-4">
      <main className="w-full max-w-2xl space-y-6">
        {/* Status Alert */}
        <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-4 flex gap-3 items-start">
          <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <div className="font-semibold text-sm text-emerald-900 dark:text-emerald-100">Payment Initiated successfully!</div>
            <div className="text-xs text-emerald-700 dark:text-emerald-200">Send the exact amount to the address below</div>
          </div>
        </div>

        {/* Payment Details Section */}
        <Card className="border-2 border-border/50">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xs sm:text-sm uppercase tracking-wide font-semibold">PAYMENT DETAILS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Reference */}
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold">Reference</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono mt-1">{paymentDetails.reference}</p>
            </div>

            {/* Base Amount */}
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold">BASE AMOUNT (AED)</p>
              <p className="text-lg sm:text-xl font-bold text-foreground mt-1">{paymentDetails.baseAmount.toFixed(2)} AED</p>
            </div>

            {/* Service Fee */}
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold">SERVICE FEE</p>
              <p className="text-base sm:text-lg font-semibold text-foreground mt-1">{paymentDetails.serviceFee.toFixed(2)} AED</p>
            </div>

            {/* You Pay */}
            <div className="border-t border-border/30 pt-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold">YOU PAY (AED)</p>
              <p className="text-base sm:text-lg font-bold text-foreground mt-1">{paymentDetails.youPay.toFixed(2)} AED</p>
            </div>

            {/* This (YOU) */}
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold">THIS (YOU)</p>
              <p className="text-base sm:text-lg font-semibold text-foreground mt-1">{paymentDetails.youPay.toFixed(2)}</p>
            </div>

            {/* Crypto Amount */}
            <div className="border-t border-border/30 pt-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold">CRYPTO AMOUNT</p>
              <p className="text-base sm:text-lg font-semibold text-foreground mt-1">{paymentDetails.cryptoAmount.toFixed(2)} USDTTRC20</p>
            </div>

            {/* Cryptocurrency */}
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold">CRYPTOCURRENCY</p>
              <p className="text-sm font-semibold text-foreground mt-1">{paymentDetails.cryptoCurrency}</p>
            </div>

            {/* Expected Confirmations Time */}
            <div className="bg-primary/5 p-3 rounded-lg space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold">EXPECTED CONFIRMATIONS TIME</p>
                  <p className="text-lg font-bold text-foreground mt-1">{paymentDetails.expectedConfirmations}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">~{paymentDetails.confirmationTime}</p>
            </div>
          </CardContent>
        </Card>

        {/* QR Code and Amount Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR Code */}
          <Card className="border-2 border-border/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg border border-border/30">
                  <img
                    src={mockQRCode}
                    alt="Payment QR Code"
                    className="w-48 h-48"
                    data-testid="img-payment-qr"
                  />
                </div>
              </div>
              <Button
                onClick={handleCopyQRCode}
                variant="outline"
                className="w-full border-2 border-primary text-primary hover:bg-primary/5 h-10 text-sm"
                data-testid="button-download-qr"
              >
                {copiedQRCode ? "Downloaded QR Code" : "Download QR Code"}
              </Button>
            </CardContent>
          </Card>

          {/* Amount to Send */}
          <Card className="border-2 border-border/50">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold">AMOUNT TO SEND</p>
                <div className="p-3 bg-primary/5 rounded-lg border border-border/30">
                  <p className="text-2xl font-bold text-foreground">{paymentDetails.amountToSend.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Tap to copy amount</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold">SEND TO ADDRESS</p>
                <div className="p-3 bg-muted/30 rounded-lg border border-border/30 break-all">
                  <p className="text-xs font-mono text-foreground">{paymentDetails.walletAddress}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">Tap to copy address</p>
                </div>
              </div>

              <Button
                onClick={handleCopyAddress}
                variant="outline"
                className="w-full border-2 h-10 text-sm"
                data-testid="button-copy-address"
              >
                <Copy className="h-4 w-4 mr-2" /> {copiedAddress ? "Address Copied" : "Copy Address"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Payment Instructions */}
        <Card className="border-2 border-border/50 bg-primary/5">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xs sm:text-sm font-semibold">Payment Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-semibold">•</span>
                <span>Send exactly {paymentDetails.cryptoAmount.toFixed(2)} USDTTRC20</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">•</span>
                <span>Use a personal wallet (avoid direct exchange withdrawals)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">•</span>
                <span>Wait for {paymentDetails.expectedConfirmations} confirmations</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">•</span>
                <span>This page updates automatically</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">•</span>
                <span>Don't close until completed</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Download PDF */}
        <Button
          onClick={handleDownloadPDF}
          className="w-full bg-primary hover:bg-primary/90 h-11 text-sm font-semibold gap-2"
          data-testid="button-download-pdf"
        >
          <Download className="h-4 w-4" /> DOWNLOAD PDF
        </Button>

        {/* Need Help Section */}
        <Card className="border-2 border-border/50">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-sm font-semibold">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground">Payment not showing? Wait a few minutes</p>
              <p className="text-xs text-muted-foreground">Contact Support</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground">Wrong amount sent? Contact support</p>
              <p className="text-xs text-muted-foreground">Email: contact@simple-bit.com</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground">Expired? Create a new payment</p>
              <p className="text-xs text-primary">Reference: {paymentDetails.reference}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground">Issues? Check status page</p>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <Link href={`/invoice/${invoiceId}`}>
          <Button
            variant="outline"
            className="w-full border-2 h-11 text-sm font-semibold"
            data-testid="button-back-to-invoice"
          >
            BACK TO INVOICE
          </Button>
        </Link>

        {/* Footer */}
        <p className="text-xs text-muted-foreground text-center pb-4">
          Powered by SimpleBit
        </p>
      </main>
    </div>
  );
}
