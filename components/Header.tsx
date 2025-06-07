import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ThemeToggleEnhanced } from "./theme-toggle-enhanced";

function Header() {
  return (
    <header className="w-full border-b sticky top-0 z-30 backdrop-blur-md ">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl animate-fade-in"
        >
          <BookOpen className="h-6 w-6" />
          <span>PlacementBuddy</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggleEnhanced />
        </div>
      </div>
    </header>
  );
}

//  <div className="flex items-center gap-4">
//             <Link href="/notes">
//               <Button variant="ghost">My Notes</Button>
//             </Link>
//             <ThemeToggleEnhanced />
//             <Button variant="ghost" size="icon" onClick={logout}>
//               <LogOut className="h-5 w-5" />
//               <span className="sr-only">Logout</span>
//             </Button>
//           </div>

export default Header;
