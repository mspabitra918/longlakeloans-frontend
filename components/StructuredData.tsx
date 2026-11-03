import React from "react";
import { companyContact } from "@/components/CompanyContact";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://longlakeloans.com"
).replace(/\/$/, "");

const organizationId = `${siteUrl}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: "LongLake Loans",
  url: siteUrl,
  email: companyContact.email.display,
  telephone: companyContact.phones.tollFree.href.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "626 Wilshire Blvd, 5th Floor, Ste 575",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    postalCode: "90017",
    addressCountry: "US",
  },
  areaServed: { "@type": "Country", name: "United States" },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: companyContact.phones.tollFree.href.replace("tel:", ""),
      email: companyContact.email.display,
      areaServed: "US",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: companyContact.phones.local.href.replace("tel:", ""),
      areaServed: "US",
      availableLanguage: ["English"],
    },
  ],
};

export const financialProductSchema = {
  "@context": "https://schema.org",
  "@type": ["FinancialProduct", "LoanOrCredit"],
  "@id": `${siteUrl}/#personal-loan`,
  name: "LongLake Loans Personal Loan",
  url: `${siteUrl}/rates-and-fees`,
  description:
    "Fixed-rate personal loans from $1,000 to $35,000 for auto repairs, emergencies, major purchases, and rent, with $0 origination fees and funding typically within 24-48 hours.",
  category: "Personal loan",
  provider: { "@id": organizationId },
  areaServed: { "@type": "Country", name: "United States" },
  currency: "USD",
  amount: {
    "@type": "MonetaryAmount",
    currency: "USD",
    minValue: 1000,
    maxValue: 35000,
  },
  loanTerm: {
    "@type": "QuantitativeValue",
    minValue: 12,
    maxValue: 60,
    unitCode: "MON",
  },
  annualPercentageRate: {
    "@type": "QuantitativeValue",
    minValue: 10,
    unitText: "PERCENT",
  },
  feesAndCommissionsSpecification:
    "$0 origination fee, $0 application fee, $0 prepayment penalty, $0 monthly maintenance fee. Late payment fee of $15 or 5% of the unpaid amount; returned payment fee of $15.",
};

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/faq#faqpage`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so payload strings can't close the script tag (XSS).
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
