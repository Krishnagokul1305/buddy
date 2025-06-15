import { Github } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-900 py-8">
      <div className="container px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} NotesHub. All rights reserved.
          </p>
          <Link
            href="https://github.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
