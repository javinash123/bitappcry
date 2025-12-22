import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ResponsivePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsShowing: number;
  totalItems: number;
}

export function ResponsivePagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsShowing,
  totalItems,
}: ResponsivePaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-0 sm:px-0 min-h-12">
      <p className="text-sm text-muted-foreground whitespace-nowrap">
        Showing <span className="font-medium text-foreground">{itemsShowing}</span> of{" "}
        <span className="font-medium text-foreground">{totalItems}</span> items
      </p>
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          data-testid="button-prev-page"
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <div className="px-3 py-1 bg-muted rounded-md whitespace-nowrap min-w-12">
          <p className="text-sm font-medium text-foreground text-center">
            {currentPage} / {totalPages}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          data-testid="button-next-page"
          className="gap-1"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
