const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

export type ApplicationStatusResult = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  loan_amount: number;
  loan_purpose: string;
  loan_term: number;
  status: string;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
  funded_at: string | null;
};

export type StatusTone = "action" | "progress" | "success" | "declined";

export type StatusContent = {
  title: string;
  description: string;
  tone: StatusTone;
  /** Call-to-action shown with the status; href receives the application ID. */
  action?: { label: string; href: (applicationId: string) => string };
};

// Customer-facing copy for each backend status (APPLICATION_STATUSES in the
// backend's services/applicationService.ts).
export const statusContent: Record<string, StatusContent> = {
  bank_verification_pending: {
    title: "Pending Banking Verification",
    description:
      "We are waiting for you to securely connect your online banking to instantly verify your income and financial health.",
    tone: "action",
    action: {
      label: "Verify your bank account",
      href: (id) => `/verify-bank?applicationId=${encodeURIComponent(id)}`,
    },
  },
  bank_reverification: {
    title: "Bank Re-verification Required",
    description:
      "We weren't able to complete your banking verification. Please reconnect your online banking so we can re-verify your income and financial health.",
    tone: "action",
    action: {
      label: "Reconnect your bank",
      href: (id) =>
        `/reconnect-bank-verification?applicationId=${encodeURIComponent(id)}`,
    },
  },
  bank_verification_completed: {
    title: "Awaiting Live Underwriter Call",
    description:
      "Your banking is verified, and you need to schedule or complete your brief call with one of our live underwriter specialists.",
    tone: "progress",
  },
  request_a_call: {
    title: "Awaiting Live Underwriter Call",
    description:
      "Your banking is verified, and you need to schedule or complete your brief call with one of our live underwriter specialists.",
    tone: "progress",
  },
  funded: {
    title: "Loan Funded",
    description:
      "Congratulations — your loan has been funded and your ACH transfer is on its way. Funds typically arrive in your US checking account within 24 to 48 hours, though some cases may require additional processing time.",
    tone: "success",
  },
  declined_pb: {
    title: "Application Declined",
    description:
      "After reviewing your application, we're unable to approve your loan request at this time. If you have questions about this decision, please contact our customer success team.",
    tone: "declined",
  },
  declined_hd: {
    title: "Application Declined",
    description:
      "After reviewing your application, we're unable to approve your loan request at this time. If you have questions about this decision, please contact our customer success team.",
    tone: "declined",
  },
};

const fallbackContent: StatusContent = {
  title: "Application Under Review",
  description:
    "Your application is being reviewed by our team. Check back soon or contact our customer success team for an update.",
  tone: "progress",
};

export function getStatusContent(status: string): StatusContent {
  return statusContent[status] ?? fallbackContent;
}

/** Stages listed on the Track Loan page, in the order borrowers move through them. */
export const trackingStages = [
  statusContent.bank_verification_pending,
  statusContent.bank_reverification,
  statusContent.bank_verification_completed,
  statusContent.funded,
];

export async function lookupApplicationStatus(
  id: string,
  email: string,
): Promise<ApplicationStatusResult> {
  const params = new URLSearchParams({ id, email });
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/application-status?${params}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
  } catch {
    throw new Error(
      "We couldn't reach our servers. Check your connection and try again.",
    );
  }

  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.application) {
    throw new Error(
      body?.error ??
        "We couldn't retrieve your application. Please try again.",
    );
  }
  return body.application as ApplicationStatusResult;
}
