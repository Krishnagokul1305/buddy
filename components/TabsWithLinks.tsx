"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList } from "@/components/ui/tabs";
import type { LucideIcon } from "lucide-react";

type TabItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type TabsWithLinksProps = {
  tabs: TabItem[];
};

export default function TabsWithLinks({ tabs }: TabsWithLinksProps) {
  const pathname = usePathname();

  return (
    <Tabs className="w-full">
      <TabsList className="h-auto p-0 bg-transparent justify-start border-b rounded-none w-auto">
        {tabs.map(({ label, href, icon: Icon }) => {
          const isActive =
            pathname === href || (href === "/notes" && pathname === "/");
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-none gap-2 border-b-2 ${
                isActive ? "border-primary" : "border-transparent"
              } ${
                isActive ? "dark:text-white text-black" : ""
              } data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none flex items-center`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
