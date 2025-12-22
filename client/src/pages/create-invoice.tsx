import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Bell, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockItems = [
  { id: 1, name: "Web Development", price: 100 },
  { id: 2, name: "Mobile App", price: 200 },
  { id: 3, name: "Consulting", price: 150 },
  { id: 4, name: "Design Services", price: 250 },
  { id: 5, name: "Hosting", price: 50 },
];

export default function CreateInvoice() {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [items, setItems] = useState([{ itemId: "", quantity: "1" }]);
  const [municipalityTax, setMunicipalityTax] = useState(false);
  const [customerPaysFee, setCustomerPaysFee] = useState(true);
  const [customerEmail, setCustomerEmail] = useState("");
  const [expiresIn, setExpiresIn] = useState("24");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addItem = () => {
    setItems([...items, { itemId: "", quantity: "1" }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const selectedItems = items.filter(item => item.itemId);
    if (selectedItems.length === 0) newErrors.items = "Please select at least one item";
    if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Redirect to success page
      setLocation("/invoice-success");
    }
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
            <h1 className="text-xl font-bold font-heading text-foreground">Create Invoice</h1>
            <p className="text-muted-foreground text-xs">Build a new invoice with items</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-2xl mx-auto w-full overflow-x-hidden">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold font-heading">Create Invoice</h2>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1">Select items to build an invoice. VAT always included, Municipality optional.</p>
          </div>

          <Card className="border-2 border-border/50">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Select Items</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Item Rows */}
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end p-3 sm:p-4 bg-muted/20 rounded-lg border border-border/30 relative">
                    <div className="flex-1 min-w-0">
                      <Label className="text-[10px] sm:text-xs font-semibold text-foreground mb-1 sm:mb-2 block">Item</Label>
                      <Select value={item.itemId} onValueChange={(val) => updateItem(index, "itemId", val)}>
                        <SelectTrigger className="border-2 border-border/50 focus:border-primary/50 h-9 sm:h-10 text-sm" data-testid={`select-item-${index}`}>
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockItems.map((opt) => (
                            <SelectItem key={opt.id} value={opt.id.toString()}>
                              {opt.name} - {opt.price} AED
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1 sm:w-24">
                        <Label className="text-[10px] sm:text-xs font-semibold text-foreground mb-1 sm:mb-2 block">Qty</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, "quantity", e.target.value)}
                          className="border-2 border-border/50 focus:border-primary/50 h-9 sm:h-10 text-sm"
                          data-testid={`input-quantity-${index}`}
                        />
                      </div>
                      {items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          className="text-destructive hover:bg-destructive/10 h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                          data-testid={`button-remove-item-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Item Button */}
              <Button
                variant="outline"
                onClick={addItem}
                className="w-full border-2 border-primary text-primary hover:bg-primary/5 h-10"
                data-testid="button-add-item"
              >
                + Add Item
              </Button>

              {/* Checkboxes */}
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="municipality"
                    checked={municipalityTax}
                    onCheckedChange={(checked) => setMunicipalityTax(checked as boolean)}
                    data-testid="checkbox-municipality"
                    className="h-5 w-5"
                  />
                  <Label htmlFor="municipality" className="text-xs sm:text-sm font-medium cursor-pointer">Apply Municipality Tax (5.00%)</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="service-fee"
                    checked={customerPaysFee}
                    onCheckedChange={(checked) => setCustomerPaysFee(checked as boolean)}
                    data-testid="checkbox-service-fee"
                    className="h-5 w-5"
                  />
                  <Label htmlFor="service-fee" className="text-xs sm:text-sm font-medium cursor-pointer">Customer Pays Service Fee</Label>
                </div>
              </div>

              {/* Customer Email */}
              <div className="space-y-2 pt-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Customer Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@example.com"
                  className="border-2 border-border/50 focus:border-primary/50 h-9 sm:h-10 text-sm"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  data-testid="input-customer-email"
                />
                <p className="text-[10px] sm:text-xs text-muted-foreground">If provided, the customer will receive payment notifications</p>
              </div>

              {/* Expires In */}
              <div className="space-y-2">
                <Label htmlFor="expires" className="text-xs sm:text-sm font-medium">Expires In</Label>
                <Select value={expiresIn} onValueChange={setExpiresIn}>
                  <SelectTrigger className="border-2 border-border/50 focus:border-primary/50 h-9 sm:h-10 text-sm" data-testid="select-expires">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 Hours</SelectItem>
                    <SelectItem value="48">48 Hours</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Invoice will automatically expire after this duration</p>
              </div>

              {errors.items && <p className="text-[10px] text-destructive">{errors.items}</p>}
              {errors.email && <p className="text-[10px] text-destructive">{errors.email}</p>}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/invoices" className="w-full sm:flex-1">
                  <Button variant="outline" className="w-full border-2 h-9 sm:h-10 text-sm" data-testid="button-cancel">
                    Cancel
                  </Button>
                </Link>
                <Button onClick={handleCreate} className="w-full sm:flex-1 bg-primary hover:bg-primary/90 h-9 sm:h-10 text-sm" data-testid="button-create">
                  Create Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
