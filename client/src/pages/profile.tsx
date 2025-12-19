import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Bell, Upload, Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const mockBankAccounts = [
  { id: 1, bankName: "Emirates NBD", accountHolder: "Parveen Saini", accountNumber: "*****1111", status: "Active" },
];

export default function Profile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bankFormOpen, setBankFormOpen] = useState(false);
  const [bankAccounts, setBankAccounts] = useState(mockBankAccounts);
  const [bankForm, setBankForm] = useState({ bankName: "", accountHolder: "", accountNumber: "", iban: "", swiftCode: "" });
  const [bankErrors, setBankErrors] = useState<Record<string, string>>({});
  const [profileForm, setProfileForm] = useState({ firstName: "", lastName: "", businessName: "", businessAddress: "", businessPhone: "", website: "", description: "" });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  const validateBank = () => {
    const newErrors: Record<string, string> = {};
    if (!bankForm.bankName) newErrors.bankName = "Bank name is required";
    if (!bankForm.accountHolder) newErrors.accountHolder = "Account holder name is required";
    if (!bankForm.accountNumber) newErrors.accountNumber = "Account number is required";
    if (!bankForm.iban) newErrors.iban = "IBAN is required";
    if (!bankForm.swiftCode) newErrors.swiftCode = "Swift code is required";
    setBankErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfile = () => {
    const newErrors: Record<string, string> = {};
    if (!profileForm.firstName) newErrors.firstName = "First name is required";
    if (!profileForm.lastName) newErrors.lastName = "Last name is required";
    if (!profileForm.businessName) newErrors.businessName = "Business name is required";
    if (!profileForm.businessAddress) newErrors.businessAddress = "Business address is required";
    if (!profileForm.businessPhone) newErrors.businessPhone = "Business phone is required";
    if (profileForm.website && !/^https?:\/\/.+/.test(profileForm.website)) newErrors.website = "Invalid URL format";
    setProfileErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBank = () => {
    if (validateBank()) {
      setBankAccounts([...bankAccounts, {
        id: Math.max(...bankAccounts.map(b => b.id)) + 1,
        bankName: bankForm.bankName,
        accountHolder: bankForm.accountHolder,
        accountNumber: bankForm.accountNumber,
        status: "Active"
      }]);
      setBankForm({ bankName: "", accountHolder: "", accountNumber: "", iban: "", swiftCode: "" });
      setBankErrors({});
      setBankFormOpen(false);
    }
  };

  const handleSaveProfile = () => {
    if (validateProfile()) {
      setProfileForm({ firstName: "", lastName: "", businessName: "", businessAddress: "", businessPhone: "", website: "", description: "" });
      setProfileErrors({});
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
            <h1 className="text-xl font-bold font-heading text-foreground">Business Profile</h1>
            <p className="text-muted-foreground text-xs">Manage your business information</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full space-y-6">
          <div>
            <h2 className="text-2xl font-bold font-heading">Merchant Profile</h2>
            <p className="text-muted-foreground text-sm mt-1">Manage your business information and settings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Business Information */}
            <Card className="md:col-span-2 border-2 border-border/50">
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">First Name</Label>
                    <Input placeholder="Parveen" className="h-10 border-2 border-border/50 focus:border-primary/50" value={profileForm.firstName} onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})} data-testid="input-first-name" />
                    {profileErrors.firstName && <p className="text-xs text-destructive">{profileErrors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Last Name</Label>
                    <Input placeholder="Saini" className="h-10 border-2 border-border/50 focus:border-primary/50" value={profileForm.lastName} onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})} data-testid="input-last-name" />
                    {profileErrors.lastName && <p className="text-xs text-destructive">{profileErrors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Business Name</Label>
                  <Input placeholder="Your Business" className="h-10 border-2 border-border/50 focus:border-primary/50" value={profileForm.businessName} onChange={(e) => setProfileForm({...profileForm, businessName: e.target.value})} data-testid="input-business-name" />
                  {profileErrors.businessName && <p className="text-xs text-destructive">{profileErrors.businessName}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Business Address</Label>
                  <Input placeholder="Your Address" className="h-10 border-2 border-border/50 focus:border-primary/50" value={profileForm.businessAddress} onChange={(e) => setProfileForm({...profileForm, businessAddress: e.target.value})} data-testid="input-business-address" />
                  {profileErrors.businessAddress && <p className="text-xs text-destructive">{profileErrors.businessAddress}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Business Phone</Label>
                    <Input placeholder="+971234567890" className="h-10 border-2 border-border/50 focus:border-primary/50" value={profileForm.businessPhone} onChange={(e) => setProfileForm({...profileForm, businessPhone: e.target.value})} data-testid="input-business-phone" />
                    {profileErrors.businessPhone && <p className="text-xs text-destructive">{profileErrors.businessPhone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Website</Label>
                    <Input placeholder="https://yoursite.com" className="h-10 border-2 border-border/50 focus:border-primary/50" value={profileForm.website} onChange={(e) => setProfileForm({...profileForm, website: e.target.value})} data-testid="input-website" />
                    {profileErrors.website && <p className="text-xs text-destructive">{profileErrors.website}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Business Description</Label>
                  <Textarea placeholder="Describe your business" className="border-2 border-border/50 focus:border-primary/50 resize-none h-28" value={profileForm.description} onChange={(e) => setProfileForm({...profileForm, description: e.target.value})} data-testid="textarea-business-description" />
                </div>
                <Button className="bg-primary hover:bg-primary/90 h-10" onClick={handleSaveProfile} data-testid="button-save-changes">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Logo & KYC */}
            <div className="space-y-6">
              {/* Business Logo */}
              <Card className="border-2 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Business Logo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="w-full h-32 rounded-lg bg-muted border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors" onClick={() => document.getElementById('logo-upload')?.click()}>
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-1" />
                      <span className="text-xs text-muted-foreground">Click to upload</span>
                    </div>
                  </div>
                  <input
                    id="logo-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    className="hidden"
                    data-testid="input-logo-upload"
                  />
                  <Button variant="outline" size="sm" className="w-full border-2 border-primary h-9" onClick={() => document.getElementById('logo-upload')?.click()} data-testid="button-choose-logo">
                    Choose Logo
                  </Button>
                  <p className="text-xs text-muted-foreground">Max 5MB. JPG, PNG, GIF, JPEG</p>
                </CardContent>
              </Card>

              {/* KYC Status */}
              <Card className="border-2 border-emerald-500/30 bg-emerald-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    KYC Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-emerald-600 font-medium">✓ Verified</div>
                  <Button variant="outline" size="sm" className="w-full border-2 h-9" data-testid="button-view-kyc">
                    View KYC
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bank Accounts */}
          <Card className="border-2 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Bank Accounts</CardTitle>
              <Dialog open={bankFormOpen} onOpenChange={setBankFormOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 h-9 text-sm" data-testid="button-add-bank">
                    + Add Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Bank Account</DialogTitle>
                    <DialogDescription>Add a bank account to receive payouts</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Bank Name *</Label>
                      <Input
                        placeholder="e.g. Emirates NBD"
                        className="h-9 border-2 border-border/50 focus:border-primary/50"
                        value={bankForm.bankName}
                        onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                        data-testid="input-bank-name"
                      />
                      {bankErrors.bankName && <p className="text-xs text-destructive">{bankErrors.bankName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Account Holder Name *</Label>
                      <Input
                        placeholder="Full Name"
                        className="h-9 border-2 border-border/50 focus:border-primary/50"
                        value={bankForm.accountHolder}
                        onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                        data-testid="input-account-holder"
                      />
                      {bankErrors.accountHolder && <p className="text-xs text-destructive">{bankErrors.accountHolder}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Account Number *</Label>
                      <Input
                        placeholder="Account Number"
                        className="h-9 border-2 border-border/50 focus:border-primary/50"
                        value={bankForm.accountNumber}
                        onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                        data-testid="input-account-number"
                      />
                      {bankErrors.accountNumber && <p className="text-xs text-destructive">{bankErrors.accountNumber}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">IBAN *</Label>
                      <Input
                        placeholder="IBAN"
                        className="h-9 border-2 border-border/50 focus:border-primary/50"
                        value={bankForm.iban}
                        onChange={(e) => setBankForm({ ...bankForm, iban: e.target.value })}
                        data-testid="input-iban"
                      />
                      {bankErrors.iban && <p className="text-xs text-destructive">{bankErrors.iban}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Swift Code *</Label>
                      <Input
                        placeholder="Swift Code"
                        className="h-9 border-2 border-border/50 focus:border-primary/50"
                        value={bankForm.swiftCode}
                        onChange={(e) => setBankForm({ ...bankForm, swiftCode: e.target.value })}
                        data-testid="input-swift-code"
                      />
                      {bankErrors.swiftCode && <p className="text-xs text-destructive">{bankErrors.swiftCode}</p>}
                    </div>
                    <div className="flex gap-3 justify-end pt-2">
                      <Button variant="outline" onClick={() => setBankFormOpen(false)} className="h-9">Cancel</Button>
                      <Button className="bg-primary hover:bg-primary/90 h-9" onClick={handleAddBank} data-testid="button-confirm-add-bank">Add Account</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 bg-muted/30">
                      <TableHead className="font-semibold text-foreground">Bank Name</TableHead>
                      <TableHead className="font-semibold text-foreground">Account Holder</TableHead>
                      <TableHead className="font-semibold text-foreground">Account Number</TableHead>
                      <TableHead className="font-semibold text-foreground">Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankAccounts.map((bank) => (
                      <TableRow key={bank.id} className="border-border/50 hover:bg-muted/20 transition-colors" data-testid={`row-bank-${bank.id}`}>
                        <TableCell className="font-medium text-foreground text-sm">{bank.bankName}</TableCell>
                        <TableCell className="text-foreground/70 text-sm">{bank.accountHolder}</TableCell>
                        <TableCell className="font-mono text-foreground/70 text-sm">{bank.accountNumber}</TableCell>
                        <TableCell className="text-sm font-medium text-emerald-600">{bank.status}</TableCell>
                        <TableCell className="text-right">
                          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 text-destructive hover:bg-destructive/10" data-testid={`button-delete-bank-${bank.id}`}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Bank Account</DialogTitle>
                                <DialogDescription>Are you sure? You cannot undo this action.</DialogDescription>
                              </DialogHeader>
                              <div className="flex gap-3 justify-end">
                                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                                <Button className="bg-destructive hover:bg-destructive/90" onClick={() => setDeleteDialogOpen(false)}>Delete</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Bank Account Information */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Bank Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Bank accounts are used for receiving payouts from your transactions</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Only active accounts can receive payouts</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Ensure account details are accurate to avoid payment delays</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> You can have multiple bank accounts but only one can be active at a time</li>
                <li className="flex gap-2"><span className="text-primary font-bold">•</span> Minimum payout amount and processing times may apply</li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
