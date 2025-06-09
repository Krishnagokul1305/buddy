"use client";

import { usePathname, useRouter } from "next/navigation"; // or "next/navigation" if using App Router
import { Settings, BookOpen, Home, Folder, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/home",
  },
  {
    title: "Notes",
    icon: Folder,
    url: "/notes",
  },
  {
    title: "Profile",
    icon: User,
    url: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function AppSidebar() {
  const path = usePathname();
  const currentPath = path;

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center text-white justify-center rounded-lg bg-blue-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">PlacementBuddy</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((navItem) => {
                const isActive = currentPath.includes(navItem.url);
                return (
                  <SidebarMenuItem key={navItem.title}>
                    <SidebarMenuButton
                      size="lg"
                      className={cn(
                        "p-3 relative hover:bg-blue-50 hover:text-blue-600 hover:dark:bg-blue-900/20 hover:dark:text-blue-400 hover:font-medium",
                        isActive &&
                          "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium"
                      )}
                      asChild
                    >
                      <Link
                        href={navItem.url}
                        className="flex items-center gap-3"
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                        )}
                        <navItem.icon
                          className={cn(
                            "h-5 w-5",
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-500 dark:text-gray-400"
                          )}
                        />
                        <span>{navItem.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t dark:bg-blue-900/20 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-transparent">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src="https://img.freepik.com/free-photo/young-man-with-beard-round-glasses_273609-6203.jpg?semt=ais_hybrid&w=740"
                  alt="Avatar"
                />
                <AvatarFallback className="rounded-lg bg-blue-600">
                  TT
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Tran Mau Tri Tam</span>
                <span className="truncate text-xs">tam@ui8.net</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
