"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import HeaderOptions from "./HeaderOptions";
import Logo from "./Logo";

export default function Header() {
  return (
    <motion.header
      className="fixed w-full top-0 z-50 "
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-background/70 backdrop-blur-md sticky top-0 flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <HeaderOptions />
      </div>
    </motion.header>
  );
}
