import { Link, useLocation } from "wouter";
import { 
  LayoutGrid, 
  FileText, 
  Package, 
  ArrowRightLeft, 
  Wallet, 
  Building2, 
  PlusCircle, 
  Settings, 
  ShieldCheck, 
  Lock, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutGrid, label: "Dashboard", href: "/" },
    { icon: FileText, label: "Invoices", href: "/invoices" },
    { icon: Package, label: "Items & Taxes", href: "/items" },
    { icon: ArrowRightLeft, label: "Transactions", href: "/transactions" },
    { icon: Wallet, label: "Payouts", href: "/payouts" },
    { icon: Building2, label: "Business Profile", href: "/profile" },
  ];

  const quickActions = [
    { icon: PlusCircle, label: "Create Invoice", href: "/create-invoice" },
    { icon: Settings, label: "Manage Items", href: "/manage-items" },
  ];

  const accountItems = [
    { icon: ShieldCheck, label: "KYC Verification", href: "/kyc" },
    { icon: Lock, label: "Change Password", href: "/password" },
  ];

  return (
    <div className="w-72 bg-sidebar h-screen flex flex-col fixed left-0 top-0 border-r border-sidebar-border/60 z-50 transition-all duration-300">
      <div className="p-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight">SimpleBit</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
        <div className="space-y-6">
          <div>
            <h3 className="text-[11px] font-bold text-sidebar-foreground/50 uppercase tracking-widest mb-4 px-4 font-heading">Menu</h3>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <a className={cn(
                      "group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-primary/5 text-primary shadow-sm ring-1 ring-primary/10" 
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-foreground"
                    )}>
                      <div className="flex items-center gap-3">
                        <item.icon className={cn("h-[18px] w-[18px] transition-colors", isActive ? "text-primary" : "text-sidebar-foreground/50 group-hover:text-foreground")} />
                        {item.label}
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
                    </a>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <h3 className="text-[11px] font-bold text-sidebar-foreground/50 uppercase tracking-widest mb-4 px-4 font-heading">Actions</h3>
            <nav className="space-y-1">
              {quickActions.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-foreground transition-all duration-200">
                    <div className="p-1.5 rounded-lg bg-background border border-border shadow-xs group-hover:border-primary/30 group-hover:text-primary transition-colors">
                      <item.icon className="h-3.5 w-3.5" />
                    </div>
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[11px] font-bold text-sidebar-foreground/50 uppercase tracking-widest mb-4 px-4 font-heading">Security</h3>
            <nav className="space-y-1">
              {accountItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-foreground transition-all duration-200">
                    <item.icon className="h-[18px] w-[18px] opacity-70" />
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="p-4 m-4 mt-2 rounded-2xl bg-sidebar-accent/30 border border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary to-purple-400 p-[2px] ring-2 ring-background">
             <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-primary font-bold text-sm">
                PS
             </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground truncate">Parveens Saini</p>
            <p className="text-xs text-muted-foreground truncate">Merchant Account</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-9 px-2">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
