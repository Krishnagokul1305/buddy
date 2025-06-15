"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import HeaderOptions from "./HeaderOptions";

export default function Header() {
  return (
    <motion.header
      className="fixed w-full top-0 z-50 "
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-background/70 backdrop-blur-md sticky top-0 flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FileText className="h-4 w-4 text-white" />
          </motion.div>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            NotesBuddy
          </span>
        </Link>
        <HeaderOptions />
      </div>
    </motion.header>
  );
}
