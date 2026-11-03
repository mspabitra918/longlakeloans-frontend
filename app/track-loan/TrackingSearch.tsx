"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  Loader2,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { companyContact } from "@/components/CompanyContact";
import {
  type ApplicationStatusResult,
  type StatusTone,
  getStatusContent,
  lookupApplicationStatus,
} from "@/app/track-loan/applicationStatus";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const toneStyles: Record<StatusTone, string> = {
  action: "border-accent",
  progress: "border-ink",
  success: "border-emerald-600",
  declined: "border-red-700",
};

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TrackingSearch() {
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email");
  const queryApplicationId =
    searchParams.get("applicationId") ?? searchParams.get("applicationid");
  const [email, setEmail] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [validationError, setValidationError] = useState("");
  const [validationField, setValidationField] = useState<
    "email" | "applicationId" | null
  >(null);
  const [loading, setLoading] = useState(() =>
    Boolean(queryEmail && queryApplicationId),
  );
  const [result, setResult] = useState<ApplicationStatusResult | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const applicationIdRef = useRef<HTMLInputElement>(null);

  async function runLookup(rawEmail: string, rawId: string) {
    const normalizedEmail = rawEmail.trim();
    const normalizedId = rawId.trim();
    if (
      !normalizedEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      setValidationError("Enter a valid email address to continue.");
      setValidationField("email");
      emailRef.current?.focus();
      return;
    }

    if (!/^\d{5}$/.test(normalizedId)) {
      setValidationError("Enter your 5-digit application ID to continue.");
      setValidationField("applicationId");
      applicationIdRef.current?.focus();
      return;
    }

    setValidationError("");
    setValidationField(null);
    setLoading(true);
    try {
      const application = await lookupApplicationStatus(
        normalizedId,
        normalizedEmail,
      );
      setResult(application);
      setEmail("");
      setApplicationId("");
    } catch (error) {
      setValidationError(
        error instanceof Error
          ? error.message
          : "We couldn't retrieve your application. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  // Support deep links like /track-loan?email=...&applicationId=...
  useEffect(() => {
    if (!queryEmail || !queryApplicationId) return;
    let cancelled = false;
    lookupApplicationStatus(queryApplicationId.trim(), queryEmail.trim())
      .then((application) => {
        if (!cancelled) setResult(application);
      })
      .catch((error) => {
        if (!cancelled) {
          setValidationError(
            error instanceof Error
              ? error.message
              : "We couldn't retrieve your application. Please try again.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [queryEmail, queryApplicationId]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runLookup(email, applicationId);
  }

  function searchAgain() {
    setResult(null);
    setValidationError("");
    setValidationField(null);
    setEmail("");
    setApplicationId("");
    emailRef.current?.focus();
  }

  if (result) {
    const content = getStatusContent(result.status);
    const submitted = formatDate(result.created_at);
    const updated = formatDate(result.updated_at);

    return (
      <section
        aria-live="polite"
        aria-labelledby="status-result-title"
        className="border border-line bg-white"
      >
        <div className="border-b border-line px-5 py-5 sm:px-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Application #{result.id}
          </p>
          <h3
            id="status-result-title"
            className="mt-2 text-xl font-semibold tracking-tight"
          >
            {result.first_name ? `Hi ${result.first_name}, ` : ""}
            {content.tone === "declined"
              ? "here's your application update."
              : "here's where your application stands."}
          </h3>
        </div>

        <dl className="grid grid-cols-2 border-b border-line text-sm">
          <div className="border-r border-line px-5 py-4 sm:px-7">
            <dt className="text-muted">Requested amount</dt>
            <dd className="mt-1 font-medium text-ink">
              {currency.format(Number(result.loan_amount))}
            </dd>
          </div>
          <div className="px-5 py-4 sm:px-7">
            <dt className="text-muted">Submitted</dt>
            <dd className="mt-1 font-medium text-ink">{submitted ?? "—"}</dd>
          </div>
        </dl>
        <div className="px-5 py-4 sm:px-7">
          <dt className="text-muted">Status</dt>
          <dd
            className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
              {
                bank_reverification: "bg-orange-100 text-orange-700",
                bank_verification_completed: "bg-green-100 text-green-700",
                bank_verification_pending: "bg-yellow-100 text-yellow-700",
                request_a_call: "bg-blue-100 text-blue-700",
                funded: "bg-emerald-100 text-emerald-700",
                declined_pb: "bg-red-100 text-red-700",
                declined_hd: "bg-red-100 text-red-700",
              }[result?.status ?? ""] ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {result?.status?.replace(/_/g, " ") ?? "—"}
          </dd>
        </div>

        <div
          className={`border-l-4 px-5 py-6 sm:px-7 ${toneStyles[content.tone]}`}
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Current status
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-ink">
            {content.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-body">
            {content.description}
          </p>

          {content.action && (
            <Link
              href={content.action.href(result.id)}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <Landmark
                className="h-4 w-4"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              {content.action.label}
              <ArrowRight
                className="h-4 w-4"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </Link>
          )}

          {result?.status === "bank_verification_completed" && (
            <p className="mt-4 text-sm leading-relaxed text-body">
              Please call Toll-Free{" "}
              <a
                href={companyContact.phones.tollFree.href}
                className="font-medium text-ink underline underline-offset-4"
              >
                {companyContact.phones.tollFree.display}
              </a>{" "}
              or Local{" "}
              <a
                href={companyContact.phones.local.href}
                className="font-medium text-ink underline underline-offset-4"
              >
                {companyContact.phones.local.display}
              </a>
              .
            </p>
          )}

          {result?.status === "declined" && (
            <p className="mt-4 text-sm leading-relaxed text-body">
              Email{" "}
              <a
                href={companyContact.email.href}
                className="font-medium text-ink underline underline-offset-4"
              >
                {companyContact.email.display}
              </a>{" "}
              or call Toll-Free{" "}
              <a
                href={companyContact.phones.tollFree.href}
                className="font-medium text-ink underline underline-offset-4"
              >
                {companyContact.phones.tollFree.display}
              </a>{" "}
              or Local{" "}
              <a
                href={companyContact.phones.local.href}
                className="font-medium text-ink underline underline-offset-4"
              >
                {companyContact.phones.local.display}
              </a>
              .
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-xs text-muted">
            {updated ? `Last updated ${updated}` : ""}
          </p>
          <button
            type="button"
            onClick={searchAgain}
            className="min-h-11 border border-ink px-4 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Look up another application
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="border border-line bg-white">
      <div className="border-b border-line px-5 py-5 sm:px-7">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Secure application lookup
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          Check your application status
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-body">
          Enter the email you applied with and the application ID from your
          confirmation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-5 py-6 sm:px-7">
        <div>
          <label
            htmlFor="tracking-email"
            className="mb-2 block text-sm font-medium text-ink"
          >
            Email address
          </label>
          <input
            ref={emailRef}
            id="tracking-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setValidationError("");
              setValidationField(null);
            }}
            aria-invalid={validationField === "email"}
            placeholder="you@example.com"
            className="min-h-12 w-full border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/15"
          />
        </div>

        <div>
          <label
            htmlFor="tracking-application-id"
            className="mb-2 block text-sm font-medium text-ink"
          >
            Application ID
          </label>
          <input
            ref={applicationIdRef}
            id="tracking-application-id"
            name="applicationId"
            type="text"
            inputMode="numeric"
            pattern="\d{5}"
            maxLength={5}
            autoComplete="off"
            required
            value={applicationId}
            onChange={(event) => {
              setApplicationId(event.target.value.replace(/\D/g, ""));
              setValidationError("");
              setValidationField(null);
            }}
            aria-invalid={validationField === "applicationId"}
            aria-describedby="tracking-id-hint"
            placeholder="e.g. 12345"
            className="min-h-12 w-full border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/15"
          />
          <p id="tracking-id-hint" className="mt-2 text-xs text-muted">
            Your 5-digit ID is in your application confirmation email.
          </p>
        </div>

        {validationError && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {validationError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-neutral-700 disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {loading ? (
            <Loader2
              className="h-4 w-4 animate-spin"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          ) : (
            <Search className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          )}
          {loading ? "Checking…" : "Track my application"}
          {!loading && (
            <ArrowRight
              className="h-4 w-4"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          )}
        </button>
        <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted">
          <ShieldCheck
            className="h-4 w-4 shrink-0"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          Your details are sent over a secure connection and only used to find
          your application.
        </p>
      </form>
    </div>
  );
}
