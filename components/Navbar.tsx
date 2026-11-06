"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonPrimary, container } from "@/components/ui";

export const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/rates-and-fees", label: "Rates & fees" },
  { href: "/about-us", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="w-7 h-7 rounded-md bg-paper text-brand flex items-center justify-center text-sm font-bold">
        L
      </span>
      <span className={`text-base font-semibold tracking-tight ${light ? "text-paper" : "text-ink"}`}>
        LongLake Loans
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-md shadow-sm">
      <div className={`${container} flex items-center justify-between h-16`}>
        <Logo light />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors underline-offset-[22px] decoration-1 ${
                pathname === link.href
                  ? "text-paper font-medium underline"
                  : "text-paper/80 hover:text-paper"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/track-loan"
            className="rounded-lg bg-black/25 text-paper px-5 py-2 text-sm font-medium hover:bg-black/40 transition-colors"
          >
            Track Your Loan
          </Link>
          <Link
            href="/apply"
            className="rounded-lg bg-brand-light text-brand-dark px-5 py-2 text-sm font-semibold hover:bg-paper transition-colors"
          >
            Apply now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 -mr-2 text-paper"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-line bg-paper">
          <div className={`${container} py-4`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 border-b border-line text-sm ${
                  pathname === link.href ? "text-ink font-medium" : "text-body"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/track-loan"
              onClick={() => setMobileMenuOpen(false)}
              className={`${buttonPrimary} w-full mt-5`}
            >
              Track Your Loan
            </Link>
            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className={`${buttonPrimary} w-full mt-5`}
            >
              Apply now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
