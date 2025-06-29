"use client";

import { BookOpen, Share } from "lucide-react";
import TabsWithLinks from "@/components/TabsWithLinks";

export default function NotesTabsWrapper() {
  const tabItems = [
    {
      label: "My Notes",
      href: "/notes",
      icon: BookOpen,
    },
    {
      label: "Shared Notes",
      href: "/notes/shared",
      icon: Share,
    },
  ];

  return <TabsWithLinks tabs={tabItems} />;
}
