"use client";

import { useTranslations } from "next-intl";

export function JsonLd() {
  const t = useTranslations("FAQ");
  const meta = useTranslations("Metadata");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flux-os.xyz";

  const questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"] as const;

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FluxOS",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    url: baseUrl,
    description: meta("description"),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    creator: {
      "@type": "Organization",
      name: "FluxOS",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: t(`questions.${q}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`questions.${q}.a`),
      },
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FluxOS",
    url: baseUrl,
    description: meta("description"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
