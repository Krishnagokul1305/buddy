"use client";

import Link from "next/link";
import { BookOpen, User } from "lucide-react";
import { ThemeToggleEnhanced } from "./theme-toggle-enhanced";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
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
        <div className="flex items-center gap-4">
          <ThemeToggleEnhanced />
          {session?.user && (
            <>
              <Link
                href="/profile"
                className="flex items-center justify-center border rounded-full w-9 h-9 border-primary/20 bg-background hover:bg-muted transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
              <SignOutButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
