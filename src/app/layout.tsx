import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Blog | Les sorties de Diane",
    template: "%s | Blog | Les sorties de Diane",
  },
  description:
    "Read expert advice, stories, and inspiration on organizing team-building activities, corporate retreats, and professional events in German and beyond.",
  keywords: [
    "corporate events",
    "seminar planning",
    "team building",
    "business retreats",
    "event tips",
    "professional networking",
    "company outings",
    "Les sorties de Diane blog",
  ],
  authors: [{ name: "Les sorties de Diane" }],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://blog.lessortiesdediane.com",
    siteName: "Les sorties de Diane",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog | Les sorties de Diane",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Les sorties de Diane",
    description:
      "Get inspired with our latest articles on organizing impactful corporate seminars, team bonding experiences, and unforgettable company events.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
