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
    default: "Arusha Technical College | ATC Student Portal",
    template: "%s | ATC",
  },
  description: "Official Student Management System for Arusha Technical College (ATC). Access registration, results, timetables, and academic records.",
  keywords: ["ATC", "Arusha Technical College", "Student Portal", "Management System", "Tanzania"],
  authors: [{ name: "Arusha Technical College" }],
  creator: "ATC IT Department",
  publisher: "Arusha Technical College",
  applicationName: "ATC",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/atc%20logo.png" },
      { url: "/atc%20logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/atc%20logo.png",
    shortcut: "/atc%20logo.png",
  },
  openGraph: {
    title: "Arusha Technical College | ATC Student Portal",
    description: "Official Student Management System for Arusha Technical College (ATC).",
    url: "https://atc.ac.tz",
    siteName: "ATC Student Portal",
    images: [
      {
        url: "/atc%20logo.png",
        width: 800,
        height: 600,
        alt: "ATC Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arusha Technical College | ATC Student Portal",
    description: "Official Student Management System for Arusha Technical College (ATC).",
    images: ["/atc%20logo.png"],
  },
};

export const viewport = {
  themeColor: "#003366",
};

import ProjectInfo from "@/components/ProjectInfo";
import { Analytics } from "@vercel/analytics/next";

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
        <Analytics />
        <ProjectInfo />
      </body>
    </html>
  );
}
