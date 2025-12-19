import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Bell, Search, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const mockTransactions = [
  { id: 1, transaction: "#29", invoice: "#INV-175829...", amount: 57.75, crypto: "USDT:BSC", status: "Finished", date: "Sep 19, 2025, 05:24 AM" },
  { id: 2, transaction: "#17", invoice: "#INV-175751...", amount: 105, crypto: "BNB:BSC", status: "Expired", date: "Sep 19, 2025, 01:27 PM" },
  { id: 3, transaction: "#16", invoice: "#INV-175750...", amount: 52.50, crypto: "USDT:BSC", status: "Finished", date: "Sep 19, 2025, 01:13 PM" },
  { id: 4, transaction: "#15", invoice: "#INV-175649...", amount: 200, crypto: "ETH:BSC", status: "Finished", date: "Sep 18, 2025, 08:00 PM" },
  { id: 5, transaction: "#14", invoice: "#INV-175648...", amount: 75.50, crypto: "USDT:BSC", status: "Expired", date: "Sep 18, 2025, 17:44 PM" },
];

const statusColors = {
  Finished: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  Expired: "bg-red-500/10 text-red-700 border-red-500/20",
  Failed: "bg-red-500/10 text-red-700 border-red-500/20",
  Pending: "bg-amber-500/10 text-amber-700 border-amber-500/20",
};

type SortField = "transaction" | "amount" | "status" | "date";
type SortOrder = "asc" | "desc";

export default function Transactions() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    let result = mockTransactions.filter(tx => {
      const matchesSearch = tx.transaction.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tx.invoice.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || tx.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchTerm, statusFilter, sortField, sortOrder]);

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
            <h1 className="text-xl font-bold font-heading text-foreground">Transactions</h1>
            <p className="text-muted-foreground text-xs">Track your transaction history</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div>
            <h2 className="text-2xl font-bold font-heading">Transactions</h2>
            <p className="text-muted-foreground text-sm mt-1">View your transaction history and payout records</p>
          </div>

          {/* Available Balance */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <h3 className="text-3xl font-bold font-heading text-primary">41.50 AED</h3>
                <p className="text-sm text-muted-foreground">Funds available for withdrawal ( 11.00 AED pending )</p>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by transaction ID or invoice..."
                className="pl-10 h-11 border-2 border-border/50 bg-background/50 focus:border-primary/50 transition-colors"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                data-testid="input-search-transactions"
              />
            </div>
            <Select value={statusFilter} onValueChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-full md:w-56 h-11 border-2 border-border/50 focus:border-primary/50" data-testid="select-status-filter">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="finished">Finished</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transactions Table */}
          <div className="border border-border/50 rounded-xl overflow-hidden bg-card shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 bg-muted/30 hover:bg-muted/30">
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors" 
                      onClick={() => handleSort("transaction")}
                      data-testid="header-transaction"
                    >
                      <div className="flex items-center gap-2">
                        Transaction
                        <SortIcon field="transaction" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">Invoice</TableHead>
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors text-right" 
                      onClick={() => handleSort("amount")}
                      data-testid="header-amount"
                    >
                      <div className="flex items-center gap-2 justify-end">
                        Amount
                        <SortIcon field="amount" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">Cryptocurrency</TableHead>
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors" 
                      onClick={() => handleSort("status")}
                      data-testid="header-status"
                    >
                      <div className="flex items-center gap-2">
                        Status
                        <SortIcon field="status" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors" 
                      onClick={() => handleSort("date")}
                      data-testid="header-date"
                    >
                      <div className="flex items-center gap-2">
                        Date
                        <SortIcon field="date" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((tx) => (
                    <TableRow key={tx.id} className="border-border/50 hover:bg-muted/20 transition-colors" data-testid={`row-transaction-${tx.id}`}>
                      <TableCell className="font-mono font-medium text-foreground text-sm">{tx.transaction}</TableCell>
                      <TableCell className="font-mono text-sm text-foreground/70">{tx.invoice}</TableCell>
                      <TableCell className="text-right text-foreground font-medium">{tx.amount.toFixed(2)} AED</TableCell>
                      <TableCell className="text-foreground/70 text-sm">{tx.crypto}</TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[tx.status as keyof typeof statusColors]} border`}>
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground/70 text-sm">{tx.date}</TableCell>
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
        </main>
      </div>
    </div>
  );
}
