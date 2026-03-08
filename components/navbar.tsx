"use client";

import Link from "next/link";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
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
      <div className="flex items-center justify-between px-4 md:px-8 mx-auto max-w-7xl pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="bg-[#3B6FF1] p-1.5 rounded-md flex items-center justify-center">
            <Box className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">Testimo</span>
        </div>

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
          <Link href="#" className="hidden sm:block text-[14px] font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Sign in</Link>
          <Link href="#" className="px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[13px] md:text-[14px] font-medium bg-[#121626] text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
