import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Bell, Search, Trash2, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const mockItems = [
  { id: 1, name: "Web Development", price: 100, description: "Professional web development services" },
  { id: 2, name: "Mobile App", price: 200, description: "Cross-platform mobile application" },
  { id: 3, name: "Consulting", price: 150, description: "Business consulting hours" },
  { id: 4, name: "Design Services", price: 250, description: "UI/UX design and branding" },
  { id: 5, name: "Hosting", price: 50, description: "Annual hosting package" },
];

type SortField = "name" | "price";
type SortOrder = "asc" | "desc";

export default function Items() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [itemsList, setItemsList] = useState(mockItems);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", description: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    let result = itemsList.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [itemsList, searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = () => {
    if (selectedItemId) {
      setItemsList(itemsList.filter(item => item.id !== selectedItemId));
      setDeleteDialogOpen(false);
      setSelectedItemId(null);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (parseFloat(formData.price) <= 0) newErrors.price = "Price must be greater than 0";
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateForm()) {
      setItemsList([...itemsList, {
        id: Math.max(...itemsList.map(i => i.id)) + 1,
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description
      }]);
      setFormData({ name: "", price: "", description: "" });
      setFormErrors({});
      setCreateDialogOpen(false);
      setCurrentPage(1);
    }
  };

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
            <h1 className="text-xl font-bold font-heading text-foreground">Items & Taxes</h1>
            <p className="text-muted-foreground text-xs">Manage your catalog and taxes</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold font-heading">Items</h2>
              <p className="text-muted-foreground text-sm mt-1">Manage your catalog. Taxes are global and set by admin.</p>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90" data-testid="button-create-item-trigger">
                  Create Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Item</DialogTitle>
                  <DialogDescription>Add a new item to your catalog</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Item name"
                      className="border-2 border-border/50 focus:border-primary/50"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="input-item-name"
                    />
                    {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">Base Price (AED) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      className="border-2 border-border/50 focus:border-primary/50"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      data-testid="input-item-price"
                    />
                    {formErrors.price && <p className="text-xs text-destructive">{formErrors.price}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Item description (optional)"
                      className="border-2 border-border/50 focus:border-primary/50 resize-none"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      data-testid="textarea-item-description"
                    />
                  </div>
                  <div className="flex gap-3 justify-end pt-2">
                    <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
                    <Button className="bg-primary hover:bg-primary/90" onClick={handleCreate} data-testid="button-confirm-create-item">
                      Create Item
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search items by name..."
              className="pl-10 h-11 border-2 border-border/50 bg-background/50 focus:border-primary/50 transition-colors"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              data-testid="input-search-items"
            />
          </div>

          {/* Items Table */}
          <div className="border border-border/50 rounded-xl overflow-hidden bg-card shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 bg-muted/30 hover:bg-muted/30">
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors" 
                      onClick={() => handleSort("name")}
                      data-testid="header-name"
                    >
                      <div className="flex items-center gap-2">
                        Name
                        <SortIcon field="name" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors text-right" 
                      onClick={() => handleSort("price")}
                      data-testid="header-price"
                    >
                      <div className="flex items-center gap-2 justify-end">
                        Price
                        <SortIcon field="price" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item) => (
                    <TableRow key={item.id} className="border-border/50 hover:bg-muted/20 transition-colors" data-testid={`row-item-${item.id}`}>
                      <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                      <TableCell className="text-right text-foreground font-medium">{item.price.toFixed(2)} AED</TableCell>
                      <TableCell className="text-right">
                        <Dialog open={deleteDialogOpen && selectedItemId === item.id} onOpenChange={(open) => {
                          setDeleteDialogOpen(open);
                          if (!open) setSelectedItemId(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => setSelectedItemId(item.id)}
                              data-testid={`button-delete-item-${item.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Item</DialogTitle>
                              <DialogDescription>Are you sure you want to delete this item? This action cannot be undone.</DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-3 justify-end">
                              <Button variant="outline" onClick={() => { setDeleteDialogOpen(false); setSelectedItemId(null); }}>Cancel</Button>
                              <Button className="bg-destructive hover:bg-destructive/90" onClick={handleDelete}>Delete</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
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

          {/* Global Taxes */}
          <Card className="border-2 border-border/50 bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">Global Taxes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-foreground font-medium">VAT</span>
                <span className="text-foreground font-semibold">5.00%</span>
              </div>
              <div className="border-t border-border/50" />
              <div className="flex justify-between items-center py-2">
                <span className="text-foreground font-medium">Municipality (optional)</span>
                <span className="text-foreground font-semibold">5.00%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Municipality tax can be toggled per invoice.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
