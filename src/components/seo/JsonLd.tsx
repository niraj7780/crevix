import React from "react";

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
}

export interface SoftwareApplicationSchema {
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  price: string;
  priceCurrency: string;
  trialPeriodDays: number;
  offers?: {
    price: string;
    priceCurrency: string;
    description: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleSchema {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  url: string;
  image?: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function OrganizationJsonLd({
  name = "Crevix",
  url = "https://crevix.io",
  logo = "https://crevix.io/icon.png",
  description = "The AI-Powered Creator Operating System for Instagram automation, AI content creation, and lead capture.",
  sameAs = ["https://twitter.com/crevix", "https://instagram.com/crevix.app"],
}: Partial<OrganizationSchema>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareAppJsonLd({
  name = "Crevix",
  applicationCategory = "BusinessApplication",
  operatingSystem = "Web Browser, iOS, Android",
  description = "All-in-one creator OS with Instagram comment-to-DM automation, AI viral hook generators, social scheduling, and lead CRM.",
  price = "199",
  priceCurrency = "INR",
  trialPeriodDays = 30,
}: Partial<SoftwareApplicationSchema>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory,
    operatingSystem,
    description,
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: priceCurrency,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: price,
        priceCurrency: priceCurrency,
        unitText: "MONTH",
      },
      trialPeriod: `P${trialPeriodDays}D`,
      description: `30-Day Free Trial, then ₹${price}/month recurring subscription.`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "340",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  authorUrl = "https://crevix.io/about",
  url,
  image = "https://crevix.io/og-image.png",
}: ArticleSchema) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Crevix",
      logo: {
        "@type": "ImageObject",
        url: "https://crevix.io/icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
