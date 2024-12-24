import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PasteBin Clone",
  description: "A modern pastebin clone built with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main className="min-h-screen bg-background">
          <ToastProvider>{children}</ToastProvider>
        </main>
      </body>
    </html>
  );
}
