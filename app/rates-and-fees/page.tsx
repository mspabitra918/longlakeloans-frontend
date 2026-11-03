import type { Metadata } from "next";
import React from "react";
import PageShell, { Muted } from "@/components/PageShell";
import RepaymentCalculator from "@/components/RepaymentCalculator";
import { CtaBanner, SectionHeader, container, section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Competitive Personal Loan Rates & Zero Hidden Fees | LongLake Loans",
  description:
    "View transparent personal loan rates for auto repairs, emergencies, major purchases, and rent. LongLake Loans offers US-wide funding in 24-48 hours with $0 origination fees.",
  alternates: { canonical: "/rates-and-fees" },
};

const highlights = [
  { value: "10%", label: "APR starting at" },
  { value: "$1K–35K", label: "Loan amounts" },
  { value: "12–60", label: "Month terms" },
  { value: "$0", label: "Origination fee" },
];

const fees = [
  { name: "Origination fee", amount: "$0" },
  { name: "Application fee", amount: "$0" },
  { name: "Prepayment penalty", amount: "$0" },
  { name: "Monthly maintenance fee", amount: "$0" },
  {
    name: "Late payment fee",
    amount: "$15 or 5% of unpaid amount",
    note: "Applies only if a payment is missed",
  },
  {
    name: "Returned payment fee",
    amount: "$15",
    note: "Applies if a payment is returned",
  },
];

export default function RatesAndFeesPage() {
  return (
    <PageShell
      eyebrow="Rates & fees"
      title={
        <>
          Transparent Personal Loan Rates & <Muted>Fees</Muted>
        </>
      }
      subtitle="Whether you need immediate funds for an unexpected auto repair, an emergency expense, a major purchase, or to cover rent, LongLake Loans offers straightforward financing. Operating from California to serve borrowers nationwide, we provide competitive, fixed rates with no hidden surprises. Once approved, funds are typically deposited in 24 to 48 hours (though some cases may require additional processing time)."
    >
      {/* Highlights */}
      <section className="border-t border-line">
        <div
          className={`${container} grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-0 md:divide-x divide-line`}
        >
          {highlights.map((item) => (
            <div
              key={item.label}
              className="py-8 md:py-10 md:px-8 md:first:pl-0"
            >
              <div className="text-sm text-muted">{item.label}</div>
              <div className="mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rates Section */}
      <section className={section}>
        <div className={container}>
          <SectionHeader
            eyebrow="01 — Interest rates"
            title="Fixed Rates for the Life of Your Loan"
            text="Your rate is based on your unique credit profile, income, and loan term, and it will never change after you sign. We offer loan amounts ranging from $1,000 to $35,000 with flexible repayment terms of 12 to 60 months. With Annual Percentage Rates (APR) starting at 10%, you can confidently budget for your monthly payments without worrying about fluctuating interest charges."
          />
        </div>
      </section>

      {/* Fee Structure Section */}
      <section className={`${section} bg-wash`}>
        <div className={container}>
          <SectionHeader
            eyebrow="02 — Fees"
            title="Most of Our Fees are Zero"
            text="We believe in honest lending. That means the loan only costs what is agreed to in your final loan agreement. We do not charge borrowers for standard processing or early payoffs."
          />
          <dl className="lg:ml-[33.333%] lg:pl-8 border-t border-line">
            {fees.map((fee) => (
              <div
                key={fee.name}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-8 py-5 border-b border-line"
              >
                <dt>
                  <span className="text-sm font-medium">{fee.name}</span>
                  {fee.note && (
                    <span className="block text-xs text-muted mt-1">
                      {fee.note}
                    </span>
                  )}
                </dt>
                <dd
                  className={`text-sm font-medium tabular-nums ${fee.amount === "$0" ? "text-accent" : ""}`}
                >
                  {fee.amount}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Payment Calculator Section */}
      <section id="calculator" className={`${section} scroll-mt-16`}>
        <div className={container}>
          <SectionHeader
            eyebrow="03 — Calculator"
            title="Estimate Your Payment"
            text="Adjust the terms, rates, and amounts below to see what your personal loan could cost. Whether you are financing a major purchase or bridging a gap for a mortgage payment, use this tool to find a monthly payment that fits comfortably within your budget."
          />
          <RepaymentCalculator />
        </div>
      </section>

      <CtaBanner
        title="See your personalized rate."
        text="Takes 5 minutes and uses a soft credit check that won't affect your score."
        buttonLabel="Check my rate"
      />
    </PageShell>
  );
}
