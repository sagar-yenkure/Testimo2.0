import Link from "next/link";
import { Box, Twitter, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t transition-colors duration-300 border-gray-100 bg-background/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-[#3B6FF1] p-1 rounded-md flex items-center justify-center">
            <Box className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight transition-colors text-gray-900 dark:text-white">Testimo</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 text-[13px] text-gray-500 dark:text-gray-400">
          <Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Privacy</Link>
          <Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Terms</Link>
          <Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Contact</Link>
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700 hidden md:block" />
          <span className="text-xs">
            © {new Date().getFullYear()} Testimo
          </span>
        </div>

        <div className="flex gap-4">
          <Link href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Twitter className="w-4 h-4" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
