import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Bell, Search, ChevronUp, ChevronDown, ChevronsUpDown, Lightbulb } from "lucide-react";
import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const mockPayouts = [
  { id: 1, dateRequested: "Dec 19, 2025, 10:48 AM", amount: 11, status: "Pending", bankAccount: "aaa ****1111", processedBy: "-", processedDate: "-" },
  { id: 2, dateRequested: "Dec 10, 2025, 02:30 PM", amount: 150, status: "Completed", bankAccount: "aaa ****1111", processedBy: "Admin", processedDate: "Dec 17, 2025" },
  { id: 3, dateRequested: "Dec 01, 2025, 09:15 AM", amount: 200, status: "Processing", bankAccount: "aaa ****1111", processedBy: "-", processedDate: "-" },
];

const statusColors = {
  Pending: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  Processing: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  Completed: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  Rejected: "bg-red-500/10 text-red-700 border-red-500/20",
};

type SortField = "dateRequested" | "amount" | "status";
type SortOrder = "asc" | "desc";

export default function Payouts() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("dateRequested");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({ amount: "", bankAccount: "", notes: "" });
  const [requestErrors, setRequestErrors] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    let result = mockPayouts.filter(payout =>
      payout.dateRequested.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.amount.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.bankAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.processedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.processedDate.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronsUpDown className="h-4 w-4 opacity-40" />;
    return sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const validateRequest = () => {
    const newErrors: Record<string, string> = {};
    if (!requestForm.amount) newErrors.amount = "Amount is required";
    else if (parseFloat(requestForm.amount) < 100) newErrors.amount = "Minimum payout is 100 AED";
    if (!requestForm.bankAccount) newErrors.bankAccount = "Bank account is required";
    setRequestErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestPayout = () => {
    if (validateRequest()) {
      setRequestForm({ amount: "", bankAccount: "", notes: "" });
      setRequestDialogOpen(false);
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
            <h1 className="text-xl font-bold font-heading text-foreground">Payouts</h1>
            <p className="text-muted-foreground text-xs">Manage your payout requests</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 overflow-x-hidden">
          <div className="flex justify-between items-start md:items-center gap-4 flex-col md:flex-row">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">Payout History</h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">Track all your payout requests and their status</p>
            </div>
            <div className="flex flex-row md:flex-row gap-4 items-center justify-between w-full md:w-auto">
              <div className="text-left md:text-right">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Balance</p>
                <p className="font-bold text-foreground text-base sm:text-lg">41.50 AED</p>
                <p className="text-[10px] sm:text-xs text-amber-600 font-medium whitespace-nowrap">Pending: 11.00 AED</p>
              </div>
              <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 h-9 sm:h-10 text-xs sm:text-sm" data-testid="button-request-payout">
                    Request Payout
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-md rounded-2xl p-4 sm:p-6">
                  <DialogHeader className="mb-2">
                    <DialogTitle className="text-lg">Request Payout</DialogTitle>
                    <DialogDescription className="text-xs">Request a payout to your bank account</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="payout-amount" className="text-xs sm:text-sm font-medium">Amount (AED) *</Label>
                      <Input
                        id="payout-amount"
                        type="number"
                        placeholder="0.00"
                        min="100"
                        className="h-9 sm:h-10 border-2 border-border/50 focus:border-primary/50 text-sm"
                        value={requestForm.amount}
                        onChange={(e) => setRequestForm({ ...requestForm, amount: e.target.value })}
                        data-testid="input-payout-amount"
                      />
                      {requestErrors.amount && <p className="text-[10px] text-destructive">{requestErrors.amount}</p>}
                      <p className="text-[10px] text-muted-foreground">Available balance: 52.50 AED</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bank-account" className="text-xs sm:text-sm font-medium">Bank Account *</Label>
                      <Select value={requestForm.bankAccount} onValueChange={(val) => setRequestForm({ ...requestForm, bankAccount: val })}>
                        <SelectTrigger className="h-9 sm:h-10 border-2 border-border/50 focus:border-primary/50 text-sm" data-testid="select-payout-bank">
                          <SelectValue placeholder="Select bank account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank1">Emirates NBD ****1111</SelectItem>
                          <SelectItem value="bank2">FAB ****2222</SelectItem>
                        </SelectContent>
                      </Select>
                      {requestErrors.bankAccount && <p className="text-[10px] text-destructive">{requestErrors.bankAccount}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payout-notes" className="text-xs sm:text-sm font-medium">Notes</Label>
                      <Textarea
                        id="payout-notes"
                        placeholder="Add any notes (optional)"
                        className="h-20 sm:h-24 border-2 border-border/50 focus:border-primary/50 resize-none text-sm"
                        value={requestForm.notes}
                        onChange={(e) => setRequestForm({ ...requestForm, notes: e.target.value })}
                        data-testid="textarea-payout-notes"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end pt-2">
                      <Button variant="outline" onClick={() => setRequestDialogOpen(false)} className="h-9 sm:h-10 order-2 sm:order-1">Cancel</Button>
                      <Button className="bg-primary hover:bg-primary/90 h-9 sm:h-10 order-1 sm:order-2" onClick={handleRequestPayout} data-testid="button-confirm-payout">
                        Confirm Payout
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              placeholder="Search history..."
              className="pl-9 sm:pl-10 h-10 sm:h-11 border-2 border-border/50 bg-background/50 focus:border-primary/50 transition-colors text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              data-testid="input-search-payouts"
            />
          </div>

          {/* Payouts Table Container */}
          <div className="border border-border/50 rounded-xl overflow-hidden bg-card shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 bg-muted/30 hover:bg-muted/30">
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors text-[10px] sm:text-xs" 
                      onClick={() => handleSort("dateRequested")}
                      data-testid="header-date-requested"
                    >
                      <div className="flex items-center gap-1">
                        Date Requested
                        <SortIcon field="dateRequested" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors text-right text-[10px] sm:text-xs" 
                      onClick={() => handleSort("amount")}
                      data-testid="header-amount"
                    >
                      <div className="flex items-center gap-1 justify-end">
                        Amount
                        <SortIcon field="amount" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors text-[10px] sm:text-xs" 
                      onClick={() => handleSort("status")}
                      data-testid="header-status"
                    >
                      <div className="flex items-center gap-1">
                        Status
                        <SortIcon field="status" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-foreground hidden md:table-cell text-[10px] sm:text-xs">Bank Account</TableHead>
                    <TableHead className="font-semibold text-foreground hidden sm:table-cell text-[10px] sm:text-xs">Processed By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((payout) => (
                    <TableRow key={payout.id} className="border-border/50 hover:bg-muted/20 transition-colors" data-testid={`row-payout-${payout.id}`}>
                      <TableCell className="text-foreground text-[10px] sm:text-xs py-2 sm:py-4">{payout.dateRequested}</TableCell>
                      <TableCell className="text-right text-foreground font-medium text-[10px] sm:text-xs py-2 sm:py-4">{payout.amount} AED</TableCell>
                      <TableCell className="py-2 sm:py-4">
                        <Badge className={`${statusColors[payout.status as keyof typeof statusColors]} border text-[9px] sm:text-[10px] px-1.5 py-0`}>
                          {payout.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground/70 hidden md:table-cell text-[10px] sm:text-xs py-2 sm:py-4">{payout.bankAccount}</TableCell>
                      <TableCell className="text-foreground/70 hidden sm:table-cell text-[10px] sm:text-xs py-2 sm:py-4">{payout.processedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-muted-foreground">
              Page <span className="font-medium text-foreground">{currentPage}</span> of <span className="font-medium text-foreground">{totalPages}</span>
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                data-testid="button-prev-page"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                data-testid="button-next-page"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Payout Information */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-start gap-3 pb-4 p-4 sm:p-6">
              <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
              <CardTitle className="text-base sm:text-lg">Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3 text-xs sm:text-sm">Payout Process:</h4>
                <ul className="space-y-2 text-[10px] sm:text-sm text-foreground/70">
                  <li className="flex gap-2"><span className="text-primary">•</span> Min payout: 100.00 AED</li>
                  <li className="flex gap-2"><span className="text-primary">•</span> Processing: 7 business days</li>
                  <li className="flex gap-2"><span className="text-primary">•</span> Fee: 15 AED processing fee applies</li>
                </ul>
              </div>
              <div className="border-t border-border/30 pt-6">
                <h4 className="font-semibold text-foreground mb-3 text-xs sm:text-sm">Status Meanings:</h4>
                <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-sm text-foreground/70">
                  <div className="flex flex-col"><span className="font-medium text-amber-600">Pending</span><span>Awaiting review</span></div>
                  <div className="flex flex-col"><span className="font-medium text-blue-600">Processing</span><span>In progress</span></div>
                  <div className="flex flex-col"><span className="font-medium text-emerald-600">Completed</span><span>Transferred</span></div>
                  <div className="flex flex-col"><span className="font-medium text-red-600">Rejected</span><span>Declined</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
