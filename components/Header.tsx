"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import HeaderOptions from "./HeaderOptions";

function Header() {
  return (
    <header className="w-full border-b sticky top-0 z-30 bg-background/70 backdrop-blur-md ">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl animate-fade-in"
        >
          <BookOpen className="h-6 w-6" />
          <span>PlacementBuddy</span>
        </Link>
        <HeaderOptions />
      </div>
    </header>
  );
}

export default Header;
