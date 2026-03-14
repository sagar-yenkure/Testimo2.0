"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyLink({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group/copy relative"
      title="Copy link"
    >
      {copied ? (
        <Check className="w-3 h-3 text-green-500" />
      ) : (
        <Copy className="w-3 h-3 text-gray-400 group-hover:text-[#2D6CFF] transition-colors" />
      )}
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-lg dark:bg-white dark:text-gray-900 font-bold whitespace-nowrap">
          Copied!
        </span>
      )}
    </button>
  );
}
