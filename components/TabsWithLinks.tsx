"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Share } from "lucide-react";
import { Tabs, TabsList } from "@/components/ui/tabs";

export default function TabsWithLinks() {
  const pathname = usePathname();

  // Determine which tab is active based on the current path
  const isMyNotesActive = pathname === "/notes" || pathname === "/";
  const isSharedNotesActive = pathname === "/notes/shared";

  return (
    <Tabs defaultValue="my-notes" className="w-full">
      <TabsList className="h-auto  p-0 bg-transparent justify-start border-b rounded-none w-auto">
        <Link
          href="/notes"
          className={`rounded-none gap-2 border-b-2 ${
            isMyNotesActive ? "border-primary " : "border-transparent"
          } ${
            isMyNotesActive
              ? "data-[state=active]:border-primary dark:text-white text-black"
              : ""
          } data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none flex items-center`}
        >
          <BookOpen className="h-4 w-4" />
          My Notes
        </Link>
        <Link
          href="/notes/shared"
          className={`rounded-none gap-2 border-b-2 ${
            isSharedNotesActive ? "border-primary" : "border-transparent"
          } ${
            isSharedNotesActive
              ? "data-[state=active]:border-primary dark:text-white text-black"
              : ""
          } data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none flex items-center`}
        >
          <Share className="h-4 w-4" />
          Shared Notes
        </Link>
      </TabsList>
    </Tabs>
  );
}
