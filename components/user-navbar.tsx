"use client";

import Link from "next/link";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";
import { UserButton } from "@clerk/nextjs";
import { NotificationBell } from "./NotificationBell";
import Image from "next/image";
import { config } from "@/config";

export function UserNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
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
          {mounted && (
            <Image 
              src={resolvedTheme === 'dark' ? config.public.logo_moto_dark : config.public.logo_moto_light} 
              alt="Praised" 
              width={100} 
              height={30} 
              className="w-[100px] h-auto object-contain" 
            />
          )}
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {/* <NotificationBell /> */}
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
