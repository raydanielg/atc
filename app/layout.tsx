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
  title: {
    default: "Arusha Technical College",
    template: "%s | ATC",
  },
  description: "Arusha Technical College (ATC)",
  applicationName: "ATC",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/atc%20logo.png",
    apple: "/emblem.png",
    shortcut: "/atc%20logo.png",
  },
  themeColor: "#0B5ED7",
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
