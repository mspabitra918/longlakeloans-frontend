// Legal documents shown on the sign & agreement page
import { companyContact } from "@/components/CompanyContact";

export type Agreement = {
  id: string;
  title: string;
  summary: string;
  consent: string;
  sections: { heading: string; body: string }[];
};

export const agreements: Agreement[] = [
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    summary:
      "Effective Date: April 3, 2022. How we collect, use, share, and protect your personal and financial information.",
    consent:
      "I have read and agree to the Privacy Policy, including the collection and use of my information to process this application.",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "To process your personal loan application for auto repairs, emergency expenses, major purchases, or rent, LongLake Loans collects:\n\n• Personally Identifiable Information (PII): Full name, date of birth, physical US address, email address, and Social Security Number (SSN).\n\n• Financial Information: Employment status, income details, and active US checking account information.\n\n• Banking Verification Data: Read-only transaction data obtained securely through our third-party banking verification partners. We do not store your online banking passwords.",
      },
      {
        heading: "2. How We Use Your Information",
        body: "Your data is strictly used to:\n\n• Perform soft credit inquiries to display estimated rates.\n\n• Conduct underwriting, verify income via banking integrations, and facilitate live underwriter specialist reviews.\n\n• Disburse funds and process monthly ACH repayments.",
      },
      {
        heading: "3. Data Security",
        body: "LongLake Loans secures all personal and financial data using enterprise-grade 256-bit encryption during transmission and storage.",
      },
      {
        heading: "4. Information Sharing",
        body: "We do not sell your personal data. Information is only shared with credit bureaus for reporting purposes, our dedicated funding officers for disbursement, and authorized third-party service providers essential to the loan processing pipeline.",
      },
    ],
  },
  {
    id: "terms-of-service",
    title: "Terms of Service",
    summary:
      "The terms and conditions governing your loan application and access to longlakeloans.com.",
    consent:
      "I agree to the Terms of Service and confirm that all information provided in my application is true and complete.",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By accessing longlakeloans.com and submitting a loan application, you agree to these Terms of Service. LongLake Loans operates from its headquarters at 626 Wilshire Blvd - 5th Floor, Ste 575, Los Angeles, CA 90017.",
      },
      {
        heading: "2. Eligibility",
        body: "You must be at least 18 years of age, a legal resident of the United States, and possess a valid US checking account to apply.",
      },
      {
        heading: "3. Application Process & Funding",
        body: "Submission of an application does not guarantee loan approval. Approvals are contingent upon successful banking verification, a live underwriter specialist call, and execution of a final loan agreement. While funds are typically transferred within 24 to 48 hours, technical or verification delays may extend processing times.",
      },
      {
        heading: "4. Fees & Repayment",
        body: "LongLake Loans charges $0 origination fees, $0 application fees, and $0 prepayment penalties. Late payments incur a fee of $15 or 5% of the unpaid amount, and returned payments incur a $15 fee.",
      },
      {
        heading: "5. Dispute Resolution & Arbitration",
        body: "Any disputes arising from these Terms or your loan agreement will be resolved through binding arbitration in Los Angeles County, California, rather than in court, waiving the right to a class-action lawsuit.",
      },
    ],
  },
  {
    id: "fair-lending-statement",
    title: "Fair Lending Statement",
    summary:
      "Our commitment to equal credit access under ECOA and fair lending laws.",
    consent: "I acknowledge that I have received the Fair Lending Statement.",
    sections: [
      {
        heading: "Fair Lending Commitment",
        body: "LongLake Loans is committed to compliance with the Equal Credit Opportunity Act (ECOA) and all applicable fair lending laws. We provide credit access to responsible borrowers nationwide without discrimination based on race, color, religion, national origin, sex, marital status, age, or receipt of income from public assistance programs. Our underwriting algorithms and live specialist reviews evaluate applicants solely on their financial profile, credit history, banking data, and ability to repay the loan.",
      },
    ],
  },
  {
    id: "direct-lender-disclosure",
    title: "Direct Lender Disclosure",
    summary:
      "Information regarding our role as the direct funding entity for approved loans.",
    consent: "I acknowledge that I have received the Direct Lender Disclosure.",
    sections: [
      {
        heading: "Funding Entity Information",
        body: "LongLake Loans acts as the funding entity for approved personal loans. Upon completion of banking verification and a live underwriter specialist call, your signed loan agreement is processed directly by our internal funding officers. Loan amounts range from $1,000 to $35,000 with Annual Percentage Rates (APR) starting at 10%, fixed for the life of the loan. Final APR and terms are determined by the applicant's creditworthiness, income, and requested loan purpose (e.g., auto repair, emergency, major purchase, or rent).",
      },
    ],
  },
  {
    id: "state-licenses-and-disclosures",
    title: "State Licenses & Disclosures",
    summary:
      "Headquarters details, California licensing information, and state-specific statutory notices.",
    consent:
      "I acknowledge that I have received the State Licenses & Disclosures for my state of residence.",
    sections: [
      {
        heading: "State Licenses & Disclosures",
        body: "LongLake Loans is headquartered at 626 Wilshire Blvd - 5th Floor, Ste 575, Los Angeles, CA 90017.\n\n• California Residents: Loans made or arranged pursuant to a California Department of Financial Protection and Innovation (DFPI) Financing Law License PLS-90120.\n\n• • Other States: LongLake Loans operates in compliance with applicable state and federal lending laws. Loan amounts, interest rates, maximum Annual Percentage Rates (APRs), and exact funding timelines may vary based on state-specific statutory guidelines. Residents of certain states retain specific rights under local regulations, including rights of rescission, cancellation grace periods, and specific statutory disclosures regarding credit reporting and debt collection. If you have any inquiries or wish to file a consumer complaint, you may contact our support team directly at support@longlakeloans.com or (747) 202-5223, or reach out to the financial regulatory agency or division of financial institutions in your state of residence.\n\nNote: Interest rates, maximum loan amounts, and exact funding timelines may vary based on state laws.",
      },
    ],
  },
  {
    id: "e-sign-consent",
    title: "E-Sign Consent",
    summary:
      "Your consent to receive disclosures and execute loan agreements electronically.",
    consent:
      "I consent to receive disclosures and documents electronically and to sign my loan agreement with an electronic signature.",
    sections: [
      {
        heading: "1. Consent to Electronic Records",
        body: "By utilizing the LongLake Loans online application portal, you consent to receive all disclosures, loan documents, notices, and communications electronically rather than in paper form.",
      },
      {
        heading: "2. Hardware and Software Requirements",
        body: "To access and retain electronic records, you must have a device with a standard web browser, internet access, and software capable of reading PDF files.",
      },
      {
        heading: "3. Withdrawing Consent",
        body: `You may withdraw your E-Sign consent at any time before signing your final loan agreement by contacting us at support@longlakeloans.com or calling ${companyContact.phones.local.display}. Withdrawing consent will terminate your online application process.`,
      },
      {
        heading: "4. Digital Signatures",
        body: "Clicking 'Accept,' 'Submit,' or utilizing digital signature technology during the final loan agreement phase constitutes your legally binding signature.",
      },
    ],
  },
];
