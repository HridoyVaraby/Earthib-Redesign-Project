import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Earthib.com - Premium Domain for Sale",
  description: "Earthib.com is a premium domain available for acquisition. Transform this unique digital destination into your online success story.",
  keywords: ["Earthib", "domain for sale", "premium domain", "buy domain", "Earthib.com", "digital real estate"],
  authors: [{ name: "Varabit Web Design & Development" }],
  openGraph: {
    title: "Earthib.com - Premium Domain for Sale",
    description: "Acquire Earthib.com and unlock your online potential with this premium domain",
    url: "https://earthib.com",
    siteName: "Earthib",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earthib.com - Premium Domain for Sale",
    description: "Transform Earthib.com into your unique online destination",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
