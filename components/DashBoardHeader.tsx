"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import HeaderOptions from "./HeaderOptions";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function DashBoardHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).slice(0, 1);

  return (
    <header className="flex sticky top-0 z-30 bg-background/70 backdrop-blur-md justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink asChild>
              <Link href={"/"}>Home</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            {segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/");
              const isLast = index === segments.length - 1;
              const label = segment.charAt(0).toUpperCase() + segment.slice(1);

              return (
                <BreadcrumbItem key={href}>
                  {!isLast ? (
                    <>
                      <BreadcrumbLink asChild>
                        <Link href={href}>{label}</Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <HeaderOptions />
    </header>
  );
}

export default DashBoardHeader;
