import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rock Foundation - Your startup copilot",
  description: "The all-in-one SaaS platform for startup founders to build, grow, and scale their companies. Branding, marketing, valuation, and AI-powered insights in one place.",
  keywords: ["startup", "founder", "branding", "marketing", "valuation", "AI", "SaaS"],
  authors: [{ name: "Rock Foundation" }],
  openGraph: {
    title: "Rock Foundation - Your startup copilot",
    description: "The all-in-one SaaS platform for startup founders to build, grow, and scale their companies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
