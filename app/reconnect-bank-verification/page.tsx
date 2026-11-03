import type { Metadata } from "next";
import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BankVerificationForm from "@/components/bank-verification/BankVerificationForm";
import { container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Reconnect Your Bank | LongLake Loans",
  description: "Reconnect your online banking to complete verification for your LongLake Loans application.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/reconnect-bank-verification" },
};

export default function ReconnectBankPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <Navbar />
      <main className={`${container} py-12 sm:py-20`}>
        <Suspense fallback={<div className="min-h-[480px] border border-line" />}>
          <BankVerificationForm mode="reconnect" />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
