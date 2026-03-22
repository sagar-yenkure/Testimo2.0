"use client";

import Link from "next/link";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { UserButton } from "@clerk/nextjs";
import { NotificationBell } from "./NotificationBell";

export function UserNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`z-50 transition-all duration-300 border-b bg-background border-gray-100 dark:border-white/5 ${scrolled ? "py-3" : "py-5"
        }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-[#3B6FF1] p-1.5 rounded-md flex items-center justify-center transition-transform group-hover:scale-110">
            <Box className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">
            Testimo
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <NotificationBell />
          <ThemeToggle />
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 bg-white dark:bg-[#111] overflow-hidden">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-full h-full"

                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
