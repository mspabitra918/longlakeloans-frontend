import type { Metadata } from "next";
import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BankVerificationForm from "@/components/bank-verification/BankVerificationForm";
import { container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Verify Your Bank Account | LongLake Loans",
  description: "Securely connect your online banking to verify your LongLake Loans application.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/verify-bank" },
};

export default function VerifyBankPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <Navbar />
      <main className={`${container} py-12 sm:py-20`}>
        <Suspense fallback={<div className="min-h-[480px] border border-line" />}>
          <BankVerificationForm mode="verify" />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
