import type { Metadata } from "next";
import React from "react";
import PageShell, { Muted } from "@/components/PageShell";
import { CtaBanner, SectionHeader, container, section } from "@/components/ui";

export const metadata: Metadata = {
  title: "About LongLake Loans | Fast US Personal Loans from California",
  description:
    "Based in California, LongLake Loans provides nationwide personal loans for emergencies, auto repairs, major purchases, and rent. Learn about our mission for fair, fast funding in 24-48 hours.",
  alternates: { canonical: "/about-us" },
};

const stats = [
  { value: "$45M+", label: "Loans funded" },
  { value: "28K+", label: "Satisfied borrowers" },
  { value: "5 min", label: "Average application" },
  { value: "4.8/5", label: "Trustpilot Rating" },
];

const values = [
  {
    title: "Fairness",
    desc: "Clear terms and honest pricing. We don't hide the true cost of your loan behind fine print.",
  },
  {
    title: "Security",
    desc: "Bank-grade 256-bit encryption protects your personal data from application to final deposit.",
  },
  {
    title: "Simplicity",
    desc: "Three steps, five minutes of your time. We only ask for the information we absolutely need to know to process your application.",
  },
  {
    title: "Responsibility",
    desc: "We only lend what we believe you can comfortably repay, ensuring your financial health remains a priority.",
  },
];

const milestones = [
  {
    year: "2021",
    title: "LongLake Loans founded",
    desc: "LongLake Loans founded by a team of finance engineers and lending veterans in California to simplify personal finance.",
  },
  {
    year: "2022",
    title: "3-step application rollout",
    desc: "Rebuilding the online process to remove the stress of traditional bank applications.",
  },
  {
    year: "2023",
    title: "$10M in loans funded",
    desc: "Expanding our reach to help more US borrowers manage major purchases and emergency expenses.",
  },
  {
    year: "2024",
    title: "20,000+ borrowers reached",
    desc: "Becoming a trusted nationwide platform.",
  },
];

const team = [
  {
    name: "Alex Mercer",
    role: "Founder & CEO",
    initials: "AM",
    bio: "Dedicated to building a nationwide lending platform that typically delivers funds within 24 to 48 hours (though some cases may require additional processing time).",
  },
  {
    name: "Priya Sharma",
    role: "Co-founder & COO",
    initials: "PS",
    bio: "Overseeing our California-based operations to ensure seamless processing across the US.",
  },
  {
    name: "David Reyes",
    role: "Head of Engineering",
    initials: "DR",
    bio: "Architecting the secure infrastructure that makes our 5-minute application possible.",
  },
  {
    name: "Chloe Bennett",
    role: "Head of Customer Success",
    initials: "CB",
    bio: "Leading our support team to guide you through funding your rent, auto repairs, or emergencies.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About LongLake Loans"
      title={
        <>
          Modern lending. <Muted>Built for responsible borrowers.</Muted>
        </>
      }
      subtitle="Operating from our Los Angeles, California headquarters, LongLake Loans is dedicated to providing transparent funding to borrowers across the United States. Whether you are facing an emergency expense, an unexpected auto repair, a major purchase, or need help bridging a rent or mortgage payment, our streamlined online platform is designed to get you the money you need without the hassle."
    >
      {/* Metrics Block */}
      <section className="border-t border-line">
        <div
          className={`${container} grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-0 md:divide-x divide-line`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="py-8 md:py-10 md:px-8 md:first:pl-0"
            >
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={section}>
        <div className={container}>
          <SectionHeader eyebrow="01 — Purpose" title="Why we exist." />
          <div className="lg:ml-[33.333%] lg:pl-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="border-t border-brand pt-6">
              <h3 className="text-lg font-semibold">Our mission</h3>
              <p className="mt-3 text-sm text-body leading-relaxed">
                To empower people with the financial tools they need to overcome
                life&apos;s hurdles—such as sudden auto repairs or emergency
                medical bills—by making credit fair, clear, and accessible.
              </p>
            </div>
            <div className="border-t border-brand pt-6">
              <h3 className="text-lg font-semibold">Our vision</h3>
              <p className="mt-3 text-sm text-body leading-relaxed">
                A world where lending is driven by technology instead of red
                tape, ensuring that securing funds for a major purchase or a
                rent payment is as simple as checking your everyday finances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={`${section} bg-wash`}>
        <div className={container}>
          <SectionHeader eyebrow="02 — Values" title="What we stand for." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="border-r border-b border-line bg-paper p-8"
              >
                <span className="text-sm text-muted tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="mt-8 text-base font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline Section */}
      <section className={section}>
        <div className={container}>
          <SectionHeader eyebrow="03 — History" title="Our story." />
          <ol className="lg:ml-[33.333%] lg:pl-8 border-t border-line">
            {milestones.map((milestone) => (
              <li
                key={milestone.year}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-8 py-6 border-b border-line"
              >
                <span className="text-sm text-muted tabular-nums">
                  {milestone.year}
                </span>
                <div className="sm:col-span-3">
                  <h3 className="text-base font-semibold">{milestone.title}</h3>
                  <p className="mt-1 text-sm text-body leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className={section}>
        <div className={container}>
          <SectionHeader eyebrow="04 — Leadership" title="The team." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col">
                <div className="aspect-square bg-wash border border-line flex items-center justify-center text-3xl font-semibold text-muted">
                  {member.initials}
                </div>
                <h3 className="mt-4 text-base font-semibold">{member.name}</h3>
                <p className="text-sm font-medium text-accent">{member.role}</p>
                <p className="mt-2 text-xs text-body leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Join thousands of borrowers."
        text="See what you qualify for in minutes — with no impact to your credit score."
      />
    </PageShell>
  );
}
