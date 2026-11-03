import type { MetadataRoute } from "next";
import { siteUrl } from "@/components/StructuredData";

// Bank verification pages are noindex and intentionally left out.
const routes: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/apply", priority: 0.9, changeFrequency: "monthly" },
  { path: "/rates-and-fees", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/track-loan", priority: 0.5, changeFrequency: "monthly" },
  {
    path: "/state-licenses-and-disclosures",
    priority: 0.4,
    changeFrequency: "yearly",
  },
  {
    path: "/direct-lender-disclosure",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  { path: "/fair-lending-statement", priority: 0.3, changeFrequency: "yearly" },
  { path: "/e-sign-consent", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
