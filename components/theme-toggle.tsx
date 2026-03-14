"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    // If View Transition API is not supported, just change the theme
    if (!document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      // Wave animation: Always expand the "new" theme over the "old" one
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );

      // Add a subtle fade-out for the old state for better blending
      document.documentElement.animate(
        {
          opacity: [1, 0.5, 0],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-old(root)",
        }
      );
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:cursor-pointer w-10 h-10 border-gray-200 dark:border-white/20 bg-white dark:bg-[#111] hover:bg-gray-100 dark:hover:bg-[#222] transition-all duration-300 relative overflow-hidden group"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90 text-amber-500 absolute" />
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 text-blue-400 absolute" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
