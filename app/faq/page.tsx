import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import PageShell, { Muted } from "@/components/PageShell";
import { buttonPrimary, buttonSecondary, container } from "@/components/ui";
import { companyContact } from "@/components/CompanyContact";
import { JsonLd, faqPageSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Personal Loan FAQs | LongLake Loans US",
  description:
    "Get answers about applying for personal loans for auto repairs, emergencies, major purchases, and rent. LongLake Loans offers 24-48 hour funding nationwide from California.",
  alternates: { canonical: "/faq" },
};

const faqCategories = [
  {
    id: "applying",
    title: "Applying",
    faqs: [
      {
        q: "What information do I need for Step 1 (Loan & Personal)?",
        a: "You will need basic contact details, your requested loan amount (whether for auto repairs, rent, a major purchase, or emergencies), and standard identity verification to start your application.",
      },
      {
        q: "How does Step 2 (Banking) work?",
        a: "We use a secure portal to verify your banking details online. This allows us to process applications faster for borrowers across the US.",
      },
      {
        q: "How long does the application take?",
        a: "The online application takes an average of 5 minutes to complete from any device.",
      },
      {
        q: "Can I leave my application and finish later?",
        a: "Yes, your progress is saved, allowing you to return and complete your application when you are ready.",
      },
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility & credit",
    faqs: [
      {
        q: "Who is eligible to apply?",
        a: "LongLake Loans serves responsible borrowers nationwide across the US from our California headquarters. You must be at least 18 years old with a valid US bank account and verifiable income.",
      },
      {
        q: "Will checking my options impact my credit score?",
        a: "No, checking your initial rate utilizes a soft credit inquiry, which does not affect your credit score.",
      },
      {
        q: "Can I apply with fair or limited credit?",
        a: "Yes, our underwriting evaluates your complete financial picture, not just your credit score, to provide fair funding options.",
      },
    ],
  },
  {
    id: "funding",
    title: "Funding & repayment",
    faqs: [
      {
        q: "How fast are funds transferred in Step 3?",
        a: "Once approved, funds are typically transferred to your account within 24 hours, and up to 48 hours maximum. Some specific cases may take additional time for manual processing.",
      },
      {
        q: "How do repayments work?",
        a: "Repayments are set on a fixed schedule. You can set up automatic payments from your checking account to ensure you never miss a due date.",
      },
      {
        q: "Can I pay off my loan early?",
        a: "Yes, LongLake Loans charges $0 prepayment penalties, allowing you to pay off your loan early at any time.",
      },
      {
        q: "What happens if I miss a payment?",
        a: "We charge a late payment fee of $15 or 5% of the unpaid amount. We encourage reaching out to our California-based support team if you anticipate payment issues.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & privacy",
    faqs: [
      {
        q: "Is my personal information safe?",
        a: "Yes, your application is protected with 256-bit bank-grade encryption to ensure your data is secure.",
      },
      {
        q: "Do you store my online banking password?",
        a: "No, we never store or have direct access to your online banking passwords.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="FAQ"
      title={
        <>
          Questions, <Muted>answered.</Muted>
        </>
      }
      subtitle="Everything you need to know about applying, getting funded, and repaying your LongLake Loans loan. Whether you are covering an auto repair, emergency expense, major purchase, or rent, find answers on our process, eligibility, and secure 24 to 48-hour funding timeline."
    >
      <JsonLd
        data={faqPageSchema(faqCategories.flatMap((category) => category.faqs))}
      />
      <section className="border-t border-line py-20 sm:py-28">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-10`}>
          {/* Category Nav */}
          <aside className="lg:col-span-4">
            <nav className="lg:sticky lg:top-28 flex lg:flex-col gap-x-6 gap-y-3 overflow-x-auto text-sm">
              {faqCategories.map((category, i) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="shrink-0 text-muted hover:text-ink transition-colors"
                >
                  <span className="tabular-nums mr-3">0{i + 1}</span>
                  {category.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* FAQ Lists */}
          <div className="lg:col-span-8 space-y-16">
            {faqCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">
                  {category.title}
                </h2>
                <div className="border-t border-line">
                  {category.faqs.map((faq) => (
                    <details key={faq.q} className="group border-b border-line">
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
                </div>
              </div>
            ))}

            {/* Support Prompt */}
            <div className="bg-wash border border-line p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-base font-semibold">
                  Still have questions?
                </h3>
                <p className="mt-1 text-sm text-body">
                  Our team can guide you step by step through your application.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href="/contact" className={buttonSecondary}>
                  Contact us
                </Link>
                <a
                  href={companyContact.phones.tollFree.href}
                  aria-label={`Call Toll-Free ${companyContact.phones.tollFree.display}`}
                  className={buttonPrimary}
                >
                  Call {companyContact.phones.tollFree.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
