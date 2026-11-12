"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CtaBanner,
  Eyebrow,
  SectionHeader,
  TextLink,
  buttonPrimary,
  buttonSecondary,
  container,
  section,
} from "@/components/ui";
import {
  ShieldCheck,
  Zap,
  EyeOff,
  ArrowRight,
  Plus,
  Building2,
  Users,
  Code2,
  Lock,
  Smartphone,
  Clock,
  Wrench,
  AlertTriangle,
  ShoppingBag,
  Home,
} from "lucide-react";

export default function HomeLandingPage() {
  // Interactive Calculator State for Hero Section
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(24);

  const primaryUseCases = [
    {
      icon: Wrench,
      title: "Auto Repair & Car Expenses",
      desc: "Get back on the road quickly with fast financing for unexpected mechanic bills, transmission replacements, or collision repairs.",
    },
    {
      icon: AlertTriangle,
      title: "Emergency Expenses",
      desc: "Cover surprise medical bills, sudden travel needs, or urgent family matters without relying on high-interest credit cards.",
    },
    {
      icon: ShoppingBag,
      title: "Major Purchases",
      desc: "Secure fixed-rate funding for essential appliances, home repairs, or significant life events without depleting your savings.",
    },
    {
      icon: Home,
      title: "Rent or Mortgage Payments",
      desc: "Bridge temporary income gaps with a fast cash infusion to cover monthly housing costs, utilities, or relocation expenses on time.",
    },
  ];

  const steps = [
    {
      stepNumber: 1,
      title: "Loan & Personal Details",
      subtitle:
        "Select your requested amount and provide basic information. Checking your options uses a soft inquiry with no impact to your credit score.",
      subSections: [
        { num: "1.1", name: "Personal information" },
        { num: "1.2", name: "Employment status" },
        { num: "1.3", name: "Income details" },
      ],
    },
    {
      stepNumber: 2,
      title: "Secure Banking Verification",
      subtitle:
        "Connect your bank account securely to verify income instantly, without the hassle of uploading traditional paperwork.",
      subSections: [{ num: "2.1", name: "Instant encrypted link" }],
    },
    {
      stepNumber: 3,
      title: "Receive Funds",
      subtitle:
        "Review your terms, sign digitally, and receive funds directly to your checking account. Funding is typically completed within 24 to 48 hours, though some cases may require additional processing time.",
      subSections: [{ num: "3.1", name: "Direct deposit disbursement" }],
    },
  ];

  const whyChooseUs = [
    {
      icon: Building2,
      title: "Nationwide Reach",
      desc: "Serving responsible borrowers across the US directly from our Los Angeles, California headquarters.",
    },
    {
      icon: EyeOff,
      title: "Zero Hidden Fees",
      desc: "We never charge unexpected origination fees or prepayment penalties.",
    },
    {
      icon: Smartphone,
      title: "5-Minute Application",
      desc: "Complete your secure online application quickly from any mobile device or desktop computer.",
    },
    {
      icon: Lock,
      title: "Bank-Grade Security",
      desc: "Protected with 256-bit encryption to keep your data safe throughout the entire process.",
    },
  ];

  const partnerOptions = [
    {
      icon: Building2,
      title: "Lenders & institutions",
      desc: "Access a pipeline of pre-screened, fully verified borrowers through automated API workflows.",
    },
    {
      icon: Users,
      title: "Affiliates & marketing",
      desc: "Monetize financial traffic with our high-converting 3-step funnel and competitive commissions.",
    },
    {
      icon: Code2,
      title: "Technology & API",
      desc: "Embed our lending SDKs to offer instant loan products directly to your users.",
    },
  ];

  const faqs = [
    {
      q: "What information do I need to apply?",
      a: "Your legal name, contact info, current address, employment status, employer name, and monthly income details.",
    },
    {
      q: "How does banking verification work?",
      a: "You securely link your bank account using bank-grade encryption. This verifies your identity and income without manual paystub uploads.",
    },
    {
      q: "How fast will I receive my funds?",
      a: "Once approved and signed, funds are typically delivered in 24 to 48 hours, though some cases may require additional processing time.",
    },
    {
      q: "Will checking my rate affect my credit score?",
      a: "No. Checking your rate uses a soft credit inquiry that does not impact your credit score.",
    },
  ];

  const stats = [
    { value: "$45M+", label: "Loans funded" },
    { value: "5 min", label: "Average application" },
    { value: "$0", label: "Origination fees" },
    { value: "24–48 hrs", label: "Typical funding time" },
  ];

  // Estimated monthly payment calculation formula
  const monthlyRate = 0.1 / 12;
  const estimatedMonthly = (
    Math.round(
      ((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1)) *
        100,
    ) / 100
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <title>Fast Online Personal Loans in the US | LongLake Loans</title>
      <meta
        name="description"
        content="Apply for unsecured personal loans across the US from our California headquarters. Cover auto repairs, emergency expenses, major purchases, or rent with funding typically in 24 to 48 hours."
      />

      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero-gradient">
        <div className={`${container} pt-20 pb-24 sm:pt-16`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Personal loans · $1,000 – $35,000</Eyebrow>
              <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-ink">
                Fast Personal Loans for Unexpected Expenses Nationwide
              </h1>
              <p className="mt-8 text-lg text-body max-w-xl leading-relaxed">
                Based in California, LongLake Loans provides secure funding
                across the US for auto repairs, emergencies, major purchases,
                and rent. Check your rate in minutes with no hidden fees, and
                receive funds typically within 24 to 48 hours.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link href="/apply" className={buttonPrimary}>
                  Check Your Rate{" "}
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
                <Link href="/how-it-works" className={buttonSecondary}>
                  How it works
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-body">
                <span className="flex items-center gap-2">
                  <ShieldCheck
                    className="w-4 h-4 text-brand-bright"
                    strokeWidth={1.75}
                  />{" "}
                  256-bit encryption
                </span>
                <span className="flex items-center gap-2">
                  <Zap
                    className="w-4 h-4 text-brand-bright"
                    strokeWidth={1.75}
                  />{" "}
                  Soft credit check
                </span>
                <span className="flex items-center gap-2">
                  <Clock
                    className="w-4 h-4 text-brand-bright"
                    strokeWidth={1.75}
                  />{" "}
                  24–48 hr funding
                </span>
              </div>
            </div>

            {/* Loan Estimator */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-mint-strong p-8 bg-paper shadow-xl shadow-brand/10">
                <div className="flex items-center justify-between">
                  <Eyebrow>Loan estimator</Eyebrow>
                  <span className="text-xs text-muted">
                    Starting at 10% APR
                  </span>
                </div>

                <div className="mt-8">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-body">Amount</span>
                    <span className="text-3xl font-semibold tracking-tight tabular-nums">
                      ${loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="35000"
                    step="500"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    aria-label="Loan amount"
                    className="range-brand w-full mt-4 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted mt-1">
                    <span>$1,000</span>
                    <span>$35,000</span>
                  </div>
                </div>

                <div className="mt-8">
                  <span className="text-sm text-body">Term (months)</span>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {[12, 24, 36, 48].map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                          loanTerm === term
                            ? "bg-brand border-brand text-paper"
                            : "border-line text-body hover:border-brand hover:bg-mint"
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-line flex items-baseline justify-between">
                  <span className="text-sm text-body">Estimated monthly</span>
                  <span className="text-2xl font-semibold tabular-nums">
                    ${estimatedMonthly}
                    <span className="text-sm font-normal text-muted">/mo</span>
                  </span>
                </div>

                <Link
                  href={`/apply?amount=${loanAmount}`}
                  className={`${buttonPrimary} w-full mt-6`}
                >
                  Apply for ${loanAmount.toLocaleString()}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-paper border-b border-line">
        <div
          className={`${container} grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-0 md:divide-x divide-line`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="py-8 md:py-10 md:px-8 md:first:pl-0"
            >
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-brand">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Primary Use Cases Section */}
      <section id="use-cases" className={`${section} bg-mint`}>
        <div className={container}>
          <SectionHeader
            eyebrow="01 — Solutions"
            title="Quick Funding for Life's Major Expenses"
            text="Flexible personal loans tailored for critical individual and family needs."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-mint-strong rounded-2xl overflow-hidden">
            {primaryUseCases.map((card) => (
              <div
                key={card.title}
                className="border-r border-b border-mint-strong bg-paper p-8 hover:bg-mint/40 transition-colors flex flex-col"
              >
                <card.icon
                  className="w-10 h-10 p-2 rounded-lg bg-mint text-brand"
                  strokeWidth={1.75}
                />
                <h3 className="mt-8 text-base font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed flex-1">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={section}>
        <div className={container}>
          <SectionHeader
            eyebrow="02 — Process"
            title="A Transparent 3-Step Online Lending Process"
            text="We've streamlined the application so you know exactly what to expect at every stage."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step) => (
              <div
                key={step.stepNumber}
                className="border-t-2 border-brand pt-6"
              >
                <span className="text-sm font-semibold text-brand-bright tabular-nums">
                  Step 0{step.stepNumber}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  {step.subtitle}
                </p>
                <ul className="mt-6 space-y-2">
                  {step.subSections.map((sub) => (
                    <li
                      key={sub.num}
                      className="flex gap-3 text-sm text-body border-b border-line pb-2"
                    >
                      <span className="text-muted tabular-nums">{sub.num}</span>
                      {sub.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <TextLink href="/how-it-works">See the full process</TextLink>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Trust Metrics */}
      <section id="why-us" className={`${section} bg-mint`}>
        <div className={container}>
          <SectionHeader
            eyebrow="03 — Why LongLake Loans"
            title="Lending Designed Around the US Borrower"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-mint-strong rounded-2xl overflow-hidden">
            {whyChooseUs.map((card) => (
              <div
                key={card.title}
                className="border-r border-b border-mint-strong bg-paper p-8 hover:bg-mint/40 transition-colors"
              >
                <card.icon
                  className="w-10 h-10 p-2 rounded-lg bg-mint text-brand"
                  strokeWidth={1.75}
                />
                <h3 className="mt-8 text-base font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner With Us */}
      {/* <section id="partner" className={section}>
        <div className={container}>
          <SectionHeader
            eyebrow="04 — Partners"
            title="Grow with our lending platform."
            text="Modern API technology and verified lead channels for lenders, affiliates, and product teams."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {partnerOptions.map((item) => (
              <div key={item.title} className="flex flex-col">
                <item.icon
                  className="w-10 h-10 p-2 rounded-lg bg-mint text-brand"
                  strokeWidth={1.75}
                />
                <h3 className="mt-6 text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-body leading-relaxed flex-1">
                  {item.desc}
                </p>
                <div className="mt-6">
                  <TextLink href="/contact">Become a partner</TextLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section id="faq" className={section}>
        <div className={container}>
          <SectionHeader eyebrow="05 — Questions" title="Common questions." />
          <div className="lg:ml-[33.333%] lg:pl-8 border-t border-line">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group border-b border-line"
              >
                <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer py-6 flex items-center justify-between gap-6 text-base font-medium">
                  {faq.q}
                  <Plus
                    className="w-5 h-5 shrink-0 text-muted transition-transform group-open:rotate-45"
                    strokeWidth={1.5}
                  />
                </summary>
                <p className="pb-6 -mt-2 text-sm text-body leading-relaxed max-w-2xl">
                  {faq.a}
                </p>
              </details>
            ))}
            <div className="mt-8">
              <TextLink href="/faq">View all questions</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className={section}>
        <div className={container}>
          <SectionHeader
            eyebrow="06 — About"
            title="Modernizing loan access for responsible borrowers."
            text="LongLake Loans was built to replace long lines and tedious paperwork with a clear 3-step online flow. Operating from California to serve borrowers nationwide, we prioritize data security, fair terms, and rapid disbursement."
          />
          <div className="lg:ml-[33.333%] lg:pl-8">
            <TextLink href="/about-us">Learn more about us</TextLink>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Check your rate in 5 minutes."
        text="No impact to your credit score. No obligation to accept."
      />

      <Footer />
    </div>
  );
}
