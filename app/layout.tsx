import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  JsonLd,
  financialProductSchema,
  organizationSchema,
  siteUrl,
} from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "LongLake Loans | Personal Loans in 3 Simple Steps",
  description:
    "Transparent personal loans from $1,000 to $35,000 with no origination fees and same-day funding.",
  openGraph: {
    type: "website",
    siteName: "LongLake Loans",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={financialProductSchema} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
