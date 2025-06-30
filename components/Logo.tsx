"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Logo() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Show dark logo before theme is mounted
  const currentTheme = !mounted
    ? "dark"
    : theme === "system"
    ? systemTheme
    : theme;

  const logoSrc = currentTheme === "dark" ? "/logo.png" : "/logo-dark.png";

  return (
    <Link href="/">
      <div className="relative h-10 md:w-[170px] w-[165px]">
        <Image
          src={logoSrc}
          alt="Notes buddy"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}

export default Logo;
