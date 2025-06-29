"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Folder, User, FolderArchive } from "lucide-react";
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

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserData } from "@/types/user";
import { getCurrentUserAction } from "@/lib/actions";
import Logo from "../Logo";

const navigationItems = [
  { title: "Notes", icon: Folder, url: "/notes" },
  { title: "SharedNotes", icon: FolderArchive, url: "shared-notes" },
  { title: "Profile", icon: User, url: "/profile" },
];

export function AppSidebar() {
  const path = usePathname();
  const currentPath = path;
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const currentUser: UserData | null = await getCurrentUserAction();
      setUser(currentUser);
    }
    fetchUser();
  }, []);

  const initials = (user?.username || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b">
        <Logo />
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
              {user ? (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-blue-600">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.username}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
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
                </>
              ) : (
                // Skeleton Loader
                <>
                  <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
                  <div className="flex-1 space-y-1 ml-2">
                    <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                    <div className="h-3 w-36 rounded bg-muted animate-pulse" />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-muted animate-pulse" />
                </>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
