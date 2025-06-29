"use client";

import { Settings, User } from "lucide-react";
import TabsWithLinks from "@/components/TabsWithLinks";

export default function ProfileTabsWrapper() {
  const tabItems = [
    {
      label: "Dashboard",
      href: "/profile",
      icon: User,
    },
    {
      label: "Settings",
      href: "/profile/settings",
      icon: Settings,
    },
  ];

  return <TabsWithLinks tabs={tabItems} />;
}
