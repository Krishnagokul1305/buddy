"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter as FilterIcon,
  X,
  Calendar,
  FileType,
  HardDrive,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const fileTypeFilter = searchParams.get("type") || "all";
  const sortBy = searchParams.get("sort") || "name";
  const dateFilter = searchParams.get("date") || "all";
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
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <FilterIcon className="h-4 w-4" />
        <span>Filters:</span>
      </div>

      {/* File Type Filter */}
      <Select
        value={fileTypeFilter}
        onValueChange={(value) => updateSearchParams({ type: value })}
      >
        <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-white h-9">
          <div className="flex items-center gap-2">
            <FileType className="h-4 w-4" />
            <SelectValue placeholder="Type" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all" className="text-white hover:bg-gray-700">
            All types
          </SelectItem>
          <SelectItem value="pdf" className="text-white hover:bg-gray-700">
            PDF
          </SelectItem>
          <SelectItem value="image" className="text-white hover:bg-gray-700">
            Images
          </SelectItem>
          <SelectItem value="mp3" className="text-white hover:bg-gray-700">
            Audio
          </SelectItem>
          <SelectItem value="mp4" className="text-white hover:bg-gray-700">
            Video
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Filter */}
      <Select
        value={sortBy}
        onValueChange={(value) => updateSearchParams({ sort: value })}
      >
        <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-white h-9">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <SelectValue placeholder="Sort" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="name" className="text-white hover:bg-gray-700">
            Name
          </SelectItem>
          <SelectItem value="size" className="text-white hover:bg-gray-700">
            Size
          </SelectItem>
          <SelectItem value="date" className="text-white hover:bg-gray-700">
            Date
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Date Filter */}
      <Select
        value={dateFilter}
        onValueChange={(value) => updateSearchParams({ date: value })}
      >
        <SelectTrigger className="w-36 bg-gray-900 border-gray-700 text-white h-9">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <SelectValue placeholder="Date" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all" className="text-white hover:bg-gray-700">
            All time
          </SelectItem>
          <SelectItem value="today" className="text-white hover:bg-gray-700">
            Today
          </SelectItem>
          <SelectItem value="week" className="text-white hover:bg-gray-700">
            This week
          </SelectItem>
          <SelectItem value="month" className="text-white hover:bg-gray-700">
            This month
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
