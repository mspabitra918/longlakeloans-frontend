import type { Metadata } from "next";
import React from "react";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Direct Lender Disclosure | LongLake Loans",
  description:
    "LongLake Loans is a direct lender: we review, fund, and service your loan ourselves.",
  alternates: { canonical: "/direct-lender-disclosure" },
};

export default function DirectLenderDisclosurePage() {
  return <LegalDocument id="direct-lender-disclosure" />;
}
