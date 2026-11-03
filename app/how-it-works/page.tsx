import type { Metadata } from "next";
import React from "react";
import { Check } from "lucide-react";
import PageShell, { Muted } from "@/components/PageShell";
import { CtaBanner, SectionHeader, container, section } from "@/components/ui";

export const metadata: Metadata = {
  title: "How Our Loan Process Works | LongLake Loans USA",
  description:
    "See how to get a personal loan for emergencies, auto repairs, major purchases, or rent. Submit your app, verify banking, speak to an underwriter, and get funded in 24-48 hours.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    stepNumber: 1,
    title: "Submit Your Application",
    duration: "Step 1: Loan & personal details",
    intro:
      "Start by selecting your required loan amount and providing basic personal information. Checking your options utilizes a soft pull that will not impact your credit score.",
    points: [
      {
        name: "Personal & Loan Details",
        desc: "Provide your basic contact information, requested loan amount, and personal details.",
      },
      {
        name: "No Credit Impact",
        desc: "Initial rate checks use a soft credit inquiry that won't affect your credit score.",
      },
    ],
  },
  {
    stepNumber: 2,
    title: "Banking Verification",
    duration: "Step 2: Instant digital connection",
    intro:
      "Once your initial details are submitted, you must securely verify your online banking. This encrypted step allows our system to instantly confirm your income and financial health without requiring you to fax or upload physical pay stubs.",
    points: [
      {
        name: "Encrypted Verification",
        desc: "Uses bank-grade security to link your checking account without storing credentials.",
      },
      {
        name: "No Paperwork",
        desc: "Automated income confirmation eliminates manual paystub and document uploads.",
      },
    ],
  },
  {
    stepNumber: 3,
    title: "Live Underwriter Specialist Call",
    duration: "Step 3: Verification call",
    intro:
      "After your banking is verified, you will schedule and complete a brief call with one of our live underwriter specialists. They will review your profile in real-time, answer any questions, and finalize your approved loan terms.",
    points: [
      {
        name: "Real-Time Review",
        desc: "Speak directly with a dedicated specialist who reviews your profile in real-time.",
      },
      {
        name: "Finalize Terms",
        desc: "Get all your questions answered and finalize your approved fixed interest rates and loan amounts.",
      },
    ],
  },
  {
    stepNumber: 4,
    title: "Sign Agreement & Final Funding",
    duration: "Step 4: Disbursement",
    intro:
      "Once your final loan agreement is digitally signed, your file is immediately transferred to a dedicated funding officer. The funding officer processes the final disbursement, sending the money directly to your checking account.",
    points: [
      {
        name: "Dedicated Funding Officer",
        desc: "Your signed agreement is immediately routed for final processing and release.",
      },
      {
        name: "Direct Disbursement",
        desc: "Funds are transferred directly into your linked US checking account typically within 24 to 48 hours.",
      },
    ],
  },
];

const timeline = [
  { time: "Step 1", label: "Submit Application" },
  { time: "Step 2", label: "Verify Banking" },
  { time: "Step 3", label: "Underwriter Call" },
  { time: "24-48 hrs", label: "Funds Disbursed" },
];

const checklist = [
  {
    title: "Address and US ID",
    desc: "Valid state ID, driver's license, or US passport along with proof of address.",
  },
  {
    title: "Active US checking account",
    desc: "A personal account in your name capable of receiving direct deposits.",
  },
  {
    title: "Secure bank login details",
    desc: "Used for Step 2 instant banking verification.",
  },
  {
    title: "Proof of income",
    desc: "Verifiable source of steady income to support your monthly repayment plan.",
  },
];

export default function HowItWorksPage() {
  return (
    <PageShell
      eyebrow="How it works"
      title={
        <>
          From application to funds.{" "}
          <Muted>A Transparent Path to Your Funds</Muted>
        </>
      }
      subtitle="Securing a personal loan for an unexpected auto repair, emergency expense, major purchase, or rent shouldn't be complicated. Based in California and serving the entire USA, our streamlined online process is designed to get your loan approved and funded typically within 24 to 48 hours, though some complex cases may require additional processing time."
    >
      {/* Detailed Steps */}
      {steps.map((step) => (
        <section
          key={step.stepNumber}
          id={`step-${step.stepNumber}`}
          className={`${section} scroll-mt-16`}
        >
          <div
            className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-8`}
          >
            <div className="lg:col-span-4">
              <div className="text-7xl font-semibold tracking-tight text-line tabular-nums">
                0{step.stepNumber}
              </div>
              <p className="mt-4 text-sm text-muted">{step.duration}</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {step.title}
              </h2>
              <p className="mt-4 text-base text-body leading-relaxed max-w-2xl">
                {step.intro}
              </p>
              <dl className="mt-10 border-t border-line">
                {step.points.map((point) => (
                  <div
                    key={point.name}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-8 py-5 border-b border-line"
                  >
                    <dt className="text-sm font-medium">{point.name}</dt>
                    <dd className="sm:col-span-2 text-sm text-body leading-relaxed">
                      {point.desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ))}

      {/* Timeline */}
      <section className={`${section} bg-wash`}>
        <div className={container}>
          <SectionHeader
            eyebrow="Timeline"
            title="What to expect, step by step."
            text="Our 4-step process ensures clear communication and fast funding timelines."
          />
          <ol className="grid grid-cols-2 lg:grid-cols-4 border-t border-ink">
            {timeline.map((item) => (
              <li key={item.label} className="pt-6 pr-6 pb-6">
                <div className="text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums">
                  {item.time}
                </div>
                <div className="mt-2 text-sm text-body">{item.label}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What You'll Need */}
      <section className={section}>
        <div className={container}>
          <SectionHeader
            eyebrow="Before you begin"
            title="Prepare for a Seamless Process"
            text="To ensure your funding moves as quickly as possible, please have the following ready before starting your application:"
          />
          <ul className="lg:ml-[33.333%] lg:pl-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-line">
            {checklist.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 py-5 border-b border-line"
              >
                <Check
                  className="w-5 h-5 text-accent shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        title="Ready to get started?"
        text="Checking your rate takes 5 minutes and won't affect your credit score."
      />
    </PageShell>
  );
}
