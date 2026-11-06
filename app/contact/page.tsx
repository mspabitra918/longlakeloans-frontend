import type { Metadata } from "next";
import React from "react";
import PageShell, { Muted } from "@/components/PageShell";
import ContactForm from "@/components/ContactForm";
import { Eyebrow, TextLink, container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact LongLake Loans | Fast US Personal Loans from California",
  description:
    "Reach our California-based support team for US personal loans. Get help with funding for auto repairs, emergencies, major purchases, or rent in 24-48 hours.",
  alternates: { canonical: "/contact" },
};

const hours = [
  { day: "Monday – Friday", time: "8 AM – 8 PM EST" },
  { day: "Saturday", time: "9 AM – 2 PM EST" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title={
        <>
          Get in touch. <Muted>We&apos;re here to help.</Muted>
        </>
      }
      subtitle="Questions about your application, an existing loan, or partnering with us? Reach out and a real person will get back to you. Our California headquarters supports borrowers across the entire US seeking fast funding for auto repairs, emergency expenses, major purchases, and rent—typically delivered in 24 to 48 hours, though some cases may take more time."
    >
      {/* Contact Methods */}
      <section className="border-t border-line">
        <div
          className={`${container} grid grid-cols-1 md:grid-cols-3 md:divide-x divide-line`}
        >
          {/* Phone Block */}
          <div className="py-10 md:px-8 md:first:pl-0 border-b md:border-b-0 border-line">
            <Eyebrow>Phone</Eyebrow>
            <div className="mt-4 space-y-2">
              <a
                href="tel:+17472025223"
                className="block text-lg font-medium underline-offset-4 hover:underline wrap-break-word"
              >
                Local: (747) 202-5223
              </a>
            </div>
            <p className="mt-2 text-sm text-muted">
              Fastest for urgent questions
            </p>
          </div>

          {/* Email Block */}
          <div className="py-10 md:px-8 border-b md:border-b-0 border-line">
            <Eyebrow>Email</Eyebrow>
            <a
              href="mailto:support@longlakeloans.com"
              className="mt-4 block text-lg font-medium underline-offset-4 hover:underline wrap-break-word"
            >
              support@longlakeloans.com
            </a>
            <p className="mt-2 text-sm text-muted">
              We reply within 1 business day
            </p>
          </div>

          {/* Office Block */}
          <div className="py-10 md:px-8">
            <Eyebrow>Office</Eyebrow>
            <address className="mt-4 text-lg font-medium not-italic wrap-break-word">
              626 Wilshire Blvd - 5th Floor, Ste 575
              <br />
              Los Angeles, CA 90017
            </address>
            <p className="mt-2 text-sm text-muted">
              Visits by appointment only. Serving the entire USA directly from
              our California hub.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Hours */}
      <section className="border-t border-line py-20 sm:py-28">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Send us a message.
              </h2>
              <p className="mt-4 text-sm text-body leading-relaxed">
                Fill out the form and the right member of our team will get back
                to you. Whether you are inquiring about a pending auto repair
                loan or funding for a major purchase, please don&apos;t include
                your SSN or bank account numbers in the message.
              </p>
            </div>

            <div>
              <Eyebrow>Support hours</Eyebrow>
              <dl className="mt-4 border-t border-line text-sm">
                {hours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between gap-4 py-3 border-b border-line"
                  >
                    <dt className="text-body">{item.day}</dt>
                    <dd className="font-medium text-right">{item.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <p className="text-sm text-body">Looking for a quick answer?</p>
              <div className="mt-2">
                <TextLink href="/faq">Visit the FAQ</TextLink>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
