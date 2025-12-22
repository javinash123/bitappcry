import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Bell, Search, ChevronUp, ChevronDown, ChevronsUpDown, Copy, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ResponsivePagination } from "@/components/dashboard/ResponsivePagination";

const mockInvoices = [
  { id: 1, invoice: "#INV-2025-001", customer: "John Doe", amount: 2500, status: "Paid", created: "Dec 18, 2025" },
  { id: 2, invoice: "#INV-2025-002", customer: "Jane Smith", amount: 1800, status: "Pending", created: "Dec 17, 2025" },
  { id: 3, invoice: "#INV-2025-003", customer: "Ahmed Ali", amount: 3200, status: "Expired", created: "Dec 16, 2025" },
  { id: 4, invoice: "#INV-2025-004", customer: "Sarah Johnson", amount: 950, status: "Cancelled", created: "Dec 15, 2025" },
  { id: 5, invoice: "#INV-2025-005", customer: "Michael Brown", amount: 2100, status: "Paid", created: "Dec 14, 2025" },
  { id: 6, invoice: "#INV-2025-006", customer: "Lisa Anderson", amount: 1500, status: "Pending", created: "Dec 13, 2025" },
];

const statusColors = {
  Paid: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  Pending: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  Expired: "bg-red-500/10 text-red-700 border-red-500/20",
  Cancelled: "bg-slate-500/10 text-slate-700 border-slate-500/20",
};

type SortField = "invoice" | "customer" | "amount" | "status" | "created";
type SortOrder = "asc" | "desc";

export default function Invoices() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("created");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

  const filteredData = useMemo(() => {
    let result = mockInvoices.filter(inv =>
      inv.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.amount.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.created.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      
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
            <h1 className="text-xl font-bold font-heading text-foreground">Invoices</h1>
            <p className="text-muted-foreground text-xs">Manage all your invoices</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 overflow-x-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">Invoices</h2>
              <p className="text-muted-foreground mt-1 text-xs sm:text-sm">Showing {paginatedData.length} of {filteredData.length} invoices</p>
            </div>
            <Link href="/create-invoice" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90" data-testid="button-create-invoice">
                Create Invoice
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              className="pl-9 sm:pl-10 h-10 sm:h-11 border-2 border-border/50 bg-background/50 focus:border-primary/50 transition-colors text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              data-testid="input-search-invoices"
            />
          </div>

          {/* Table Container */}
          <div className="border border-border/50 rounded-xl overflow-hidden bg-card shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 bg-muted/30 hover:bg-muted/30">
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors text-[10px] sm:text-xs" 
                      onClick={() => handleSort("invoice")}
                      data-testid="header-invoice"
                    >
                      <div className="flex items-center gap-1">
                        Invoice
                        <SortIcon field="invoice" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors hidden sm:table-cell text-[10px] sm:text-xs" 
                      onClick={() => handleSort("customer")}
                      data-testid="header-customer"
                    >
                      <div className="flex items-center gap-1">
                        Customer
                        <SortIcon field="customer" />
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
                    <TableHead className="font-semibold text-foreground text-[10px] sm:text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((invoice) => (
                    <TableRow key={invoice.id} className="border-border/50 hover:bg-muted/20 transition-colors" data-testid={`row-invoice-${invoice.id}`}>
                      <TableCell className="font-medium text-foreground text-[10px] sm:text-xs py-2 sm:py-4">{invoice.invoice}</TableCell>
                      <TableCell className="text-foreground/70 hidden sm:table-cell text-[10px] sm:text-xs py-2 sm:py-4">{invoice.customer}</TableCell>
                      <TableCell className="text-right text-foreground font-medium text-[10px] sm:text-xs py-2 sm:py-4">{invoice.amount.toLocaleString()} AED</TableCell>
                      <TableCell className="py-2 sm:py-4">
                        <Badge className={`${statusColors[invoice.status as keyof typeof statusColors]} border text-[9px] sm:text-[10px] px-1.5 py-0`}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2 sm:py-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-primary/10 hover:text-primary"
                            data-testid={`button-copy-${invoice.id}`}
                            onClick={() => navigator.clipboard.writeText(invoice.invoice)}
                            title="Copy ID"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                          <Link href={`/invoice/${invoice.id}`}>
                            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-primary/10 hover:text-primary" data-testid={`button-view-${invoice.id}`} title="View Details">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <ResponsivePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsShowing={paginatedData.length}
            totalItems={filteredData.length}
          />
        </main>
      </div>
    </div>
  );
}
