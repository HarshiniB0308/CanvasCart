import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CanvasCart | AI-Enhanced Art Marketplace",
  description: "Buy and sell stunning AI-enhanced artwork.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-zinc-50 text-zinc-900`}>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
