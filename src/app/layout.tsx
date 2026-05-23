import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASTRA.AI - Your Personal AI Assistant",
  description:
    "A clean, modern AI assistant powered by intelligence. Ask ASTRA anything.",
};

export const viewport: Viewport = {
  themeColor: "#1a0f0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background h-full antialiased`}>
      <body className="min-h-full flex font-sans">{children}</body>
    </html>
  );
}
