"use client";

import type React from "react";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  placeholder = "Search notes...",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchValue(search);
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  // Update URL on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    const queryString = createQueryString("search", value);
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  // Handle clear search
  const handleClear = () => {
    setSearchValue("");
    const queryString = createQueryString("search", "");
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  // Handle form submit (for Enter key)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryString = createQueryString("search", searchValue);
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          className="pl-10 pr-10 h-10 bg-background border-border focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all duration-200 placeholder:text-muted-foreground"
          aria-label="Search"
        />

        {searchValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted rounded-md transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
