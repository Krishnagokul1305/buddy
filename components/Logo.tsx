"use client";

import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <div className="relative h-12 md:w-[170px] w-[165px]">
        <Image
          src="/logo.png"
          alt="Notes buddy"
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
}

export default Logo;
