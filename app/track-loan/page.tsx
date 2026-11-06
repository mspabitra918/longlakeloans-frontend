import type { Metadata } from "next";
import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, LockKeyhole, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackingSearch from "@/app/track-loan/TrackingSearch";
import { trackingStages } from "@/app/track-loan/applicationStatus";
import { container } from "@/components/ui";
import {
  CompanyContactInfo,
  companyContact,
} from "@/components/CompanyContact";

export const metadata: Metadata = {
  title: "Track Your Personal Loan Application Status | LongLake Loans USA",
  description:
    "Log in to track the status of your LongLake Loans application. Monitor your banking verification, underwriter call, and funding timeline for fast 24-48 hour disbursement.",
  alternates: { canonical: "/track-loan" },
};

export default function TrackLoanPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-line bg-wash">
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 h-full w-[40%] border-l border-line/70 bg-[linear-gradient(135deg,transparent_49.7%,rgba(10,10,10,0.035)_50%,transparent_50.3%)]"
          />
          <div
            className={`${container} relative grid grid-cols-1 gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-28`}
          >
            <div className="lg:col-span-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Application tracking
              </p>
              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
                Track Your Loan{" "}
                <span className="text-muted">Application Status</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-body sm:text-lg">
                Stay updated on your secure funding. Whether you applied to
                cover an unexpected auto repair, an emergency expense, a major
                purchase, or a rent payment, you can monitor your progress in
                real-time through our portal. Access your account using the
                &ldquo;Track Your Loan&rdquo; button located at the top of our
                site.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <div className="flex items-start gap-3 border-l-2 border-accent pl-4">
                <LockKeyhole
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <p className="max-w-xs text-sm leading-relaxed text-body">
                  We take your privacy seriously. Please don&apos;t send account
                  passwords or full payment details by email.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div
            className={`${container} grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8`}
          >
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Application stages
              </p>
              <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Where Is My Application in the Process?
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-body">
                Log in to see exactly where your file is within our
                California-based processing center. Your dashboard will display
                which of the following stages you are currently in:
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Suspense
                fallback={
                  <div
                    className="min-h-72 border border-line bg-white"
                    aria-label="Loading loan lookup"
                  />
                }
              >
                <TrackingSearch />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-wash py-16 sm:py-24">
          <div
            className={`${container} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8`}
          >
            <div className="lg:col-span-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Customer success
              </p>
              <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Need Help Moving Forward?
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-body">
                If your application is paused or you need assistance preparing
                for your live underwriter specialist call, our dedicated
                customer success team is here to help. Serving borrowers across
                the entire USA from our Los Angeles headquarters, we are
                available to ensure your emergency or major purchase funding is
                secured without unnecessary delays.
              </p>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-body">
                Reach out to support at{" "}
                <a
                  href={companyContact.email.href}
                  className="font-medium text-ink underline underline-offset-4"
                >
                  {companyContact.email.display}
                </a>{" "}
                or call our local line at{" "}
                <a
                  href={companyContact.phones.local.href}
                  className="font-medium text-ink underline underline-offset-4"
                >
                  {companyContact.phones.local.display}
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={companyContact.phones.local.href}
                  aria-label={`Call Local ${companyContact.phones.local.display}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-brand px-5 text-sm font-medium text-paper transition-colors hover:bg-brand-dark"
                >
                  <Phone
                    className="h-4 w-4"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  Call Local {companyContact.phones.local.display}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-brand px-5 text-sm font-medium text-ink transition-colors hover:bg-brand hover:text-paper"
                >
                  Contact us
                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div className="mt-10 flex items-start gap-3 border-t border-line pt-5">
                <Clock3
                  className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-body">
                  <span className="font-medium text-ink">Support hours</span>
                  <br />
                  Monday–Friday, 8 AM–8 PM EST
                  <br />
                  Saturday, 9 AM–2 PM EST
                </p>
              </div>
              <CompanyContactInfo
                includeAddress
                className="mt-6 border-t border-line pt-5 text-sm"
                addressClassName="leading-relaxed text-body"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-line py-10 sm:py-12">
          <div
            className={`${container} flex flex-col justify-between gap-4 sm:flex-row sm:items-center`}
          >
            <p className="text-sm text-body">
              Have a question about starting an application?
            </p>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              See how it works
              <ArrowRight
                className="h-4 w-4"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
