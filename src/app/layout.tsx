import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { basic_metadata } from "@/lib/exporter";
import Navbar from "@/components/Header/Navbar";
import { Toaster } from "@/components/ui/sonner";
import "react-phone-input-2/lib/style.css";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = basic_metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Spinner />}>
          <Navbar />
        </Suspense>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
