"use client";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );
  return (
    <div className="mb-6 space-y-4 w-full">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search files and folders..."
          value={searchQuery}
          onChange={(e) => updateSearchParams({ search: e.target.value })}
          className="pl-10 rounded-lg border  focus:border-gray-600 h-11"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateSearchParams({ search: null })}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white h-7 w-7 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
