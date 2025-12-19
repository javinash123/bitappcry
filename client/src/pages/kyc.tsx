import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Bell, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KYC() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <h1 className="text-xl font-bold font-heading text-foreground">KYC Verification</h1>
            <p className="text-muted-foreground text-xs">Identity verification status</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-3xl mx-auto w-full space-y-6">
          <div>
            <h2 className="text-2xl font-bold font-heading">KYC Verification</h2>
            <p className="text-muted-foreground text-sm mt-1">Complete your identity verification to unlock all platform features</p>
          </div>

          {/* Current KYC Status */}
          <Card className="border-2 border-emerald-500/30 bg-emerald-500/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  <CardTitle>Current KYC Status</CardTitle>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold text-emerald-700">✓ Approved</p>
                <p className="text-sm text-muted-foreground">Submitted on September 6, 2025</p>
              </div>
            </CardContent>
          </Card>

          {/* Verification Complete */}
          <Card className="border-2 border-emerald-500/30 bg-white">
            <CardContent className="pt-12 pb-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <CheckCircle2 className="h-12 w-12 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-foreground">KYC Verification Complete</h3>
                <p className="text-muted-foreground text-sm mt-2">Your identity has been successfully verified. You now have full access to all platform features.</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-foreground/70">
                  <span className="font-semibold text-foreground">Verified on:</span> September 6, 2025
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 h-10" data-testid="button-view-kyc">
                View Full Details
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
