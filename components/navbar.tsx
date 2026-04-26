"use client";

import Link from "next/link";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import { config } from "@/config";

export function Navbar({ isAuthenticated }: { isAuthenticated: boolean }) {

  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${scrolled ? "py-3" : "py-5"}`}>
      <div className="flex items-center justify-between px-4 md:px-8 mx-auto max-w-[1500px] pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 group">
          {mounted && (
            <Image 
              src={resolvedTheme === 'dark' ? config.public.logo_moto_dark : config.public.logo_moto_light} 
              alt="Praised" 
              width={140} 
              height={40} 
              className="w-[140px] md:w-[160px] h-auto object-contain" 
            />
          )}
        </Link>

        <div className="hidden md:flex items-center gap-1 text-[14px] font-medium px-2 py-1.5 rounded-full shadow-sm backdrop-blur-md border bg-white/60 border-gray-200/50 text-gray-600 dark:bg-white/10 dark:border-white/10 dark:text-gray-300 transition-colors">
          {navLinks.map(item => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="px-4 py-2 rounded-full hover:bg-gray-100/80 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          {!isAuthenticated ? <div className="flex items-center gap-2 md:gap-4">
            <Link href="/auth/sign-in" className="hidden sm:block text-[14px] font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Sign in</Link>
            <Link href="/auth/sign-up" className="px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[13px] md:text-[14px] font-medium bg-[#121626] text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors">
              Get Started
            </Link>
          </div> : <div><Link href="/dashboard" className="px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[13px] md:text-[14px] font-medium bg-[#121626] text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors">
            Dashboard
          </Link></div>}
        </div>
      </div>
    </nav>
  );
}
