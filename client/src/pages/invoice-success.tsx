import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Bell, Copy, Download } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const mockQRCode = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23fff' width='200' height='200'/%3E%3Crect fill='%23000' x='20' y='20' width='20' height='20'/%3E%3Crect fill='%23000' x='160' y='20' width='20' height='20'/%3E%3Crect fill='%23000' x='20' y='160' width='20' height='20'/%3E%3C/svg%3E";

export default function InvoiceSuccess() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const invoiceIdValue = "INV-2025-001";
  const invoiceId = `#${invoiceIdValue}`;
  const invoiceLink = `https://app.simple-bit.com/invoice/${invoiceIdValue}`;
  const totalAmount = 57.75;
  const serviceFee = 2.63;
  const itemName = "1x Mob Dev";
  const expiresDate = "12/20/2025, 6:54:44 PM";
  const status = "Pending";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invoiceLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadPDF = () => {
    alert("PDF download would be triggered here");
  };

  const handleDownloadQR = () => {
    alert("QR code download would be triggered here");
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
            <h1 className="text-xl font-bold font-heading text-foreground">Invoice Created</h1>
            <p className="text-muted-foreground text-xs">Your invoice has been successfully generated</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold font-heading">Invoice Created Successfully!</h2>
            <p className="text-muted-foreground text-sm mt-2">Your invoice has been generated and is ready to share</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Invoice Details Card */}
            <Card className="border-2 border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Invoice ID:</span>
                    <span className="font-mono text-sm font-semibold">{invoiceId}</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Total:</span>
                    <div className="text-right">
                      <div className="font-semibold">{totalAmount} AED</div>
                      <div className="text-xs text-muted-foreground">+5% fee passed</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Service Fee (5%)</span>
                    <span className="text-sm font-semibold">{serviceFee} AED</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Items:</span>
                    <span className="text-sm font-semibold">{itemName}</span>
                  </div>

                  <div className="flex justify-between items-start pt-2 border-t border-border/30">
                    <span className="text-sm text-muted-foreground">Expires:</span>
                    <span className="text-sm font-semibold">{expiresDate}</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-700 border border-amber-500/20 rounded text-xs font-semibold">
                      {status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/30">
                  <p className="text-xs font-semibold text-foreground">Invoice Link</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={invoiceLink}
                      readOnly
                      className="flex-1 px-3 py-2 text-xs border border-border/50 rounded-md bg-muted/30 text-muted-foreground"
                    />
                    <Button
                      size="sm"
                      onClick={handleCopyLink}
                      className="bg-primary hover:bg-primary/90"
                      data-testid="button-copy-link"
                    >
                      {copiedLink ? "Copied" : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-foreground">Actions</p>
                  <Button
                    variant="outline"
                    onClick={handleDownloadPDF}
                    className="w-full border-2 text-primary h-10 justify-center gap-2"
                    data-testid="button-download-pdf"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownloadQR}
                    className="w-full border-2 text-primary h-10 justify-center gap-2"
                    data-testid="button-download-qr"
                  >
                    <Download className="h-4 w-4" /> Download QR
                  </Button>
                </div>

                <div className="space-y-2 pt-2">
                  <Link href="/create-invoice" className="block">
                    <Button variant="default" className="w-full bg-primary hover:bg-primary/90 h-10" data-testid="button-create-another">
                      Create Another
                    </Button>
                  </Link>
                  <Link href={`/invoice/${invoiceIdValue}`} className="block">
                    <Button variant="outline" className="w-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500/5 h-10" data-testid="button-open-invoice">
                      Open Invoice
                    </Button>
                  </Link>
                  <Link href="/invoices" className="block">
                    <Button variant="default" className="w-full bg-primary hover:bg-primary/90 h-10" data-testid="button-view-all">
                      View All Invoices
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Card */}
            <Card className="border-2 border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">QR Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex flex-col items-center">
                <div className="p-6 bg-white rounded-lg border border-border/30">
                  <img
                    src={mockQRCode}
                    alt="Invoice QR Code"
                    className="w-40 h-40"
                    data-testid="img-qr-code"
                  />
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  Customers can scan this QR code to pay the invoice
                </p>

                <Button
                  onClick={handleDownloadQR}
                  className="w-full bg-primary hover:bg-primary/90 h-10"
                  data-testid="button-download-qr-card"
                >
                  <Download className="h-4 w-4 mr-2" /> Download QR Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
