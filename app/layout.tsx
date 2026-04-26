import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

import { config } from "@/config";

export const metadata: Metadata = {
  title: "Praised - Collect Video Testimonials Effortlessly",
  description: "The most intuitive platform to collect, manage, and showcase video testimonials that convert. Build trust with authentic customer stories.",
  icons: [
    { url: config.public.logo_light, media: "(prefers-color-scheme: light)" },
    { url: config.public.logo_dark, media: "(prefers-color-scheme: dark)" },
  ],
  openGraph: {
    images: [
      {
        url: config.public.opengraph_image,
        alt: "Praised - Collect Video Testimonials Effortlessly",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased font-sans `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>{children}</ClerkProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
