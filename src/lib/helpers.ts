import { Metadata } from "next";
import connectDB from "@/lib/db";
import Company from "@/lib/models/Company";

/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert to a slug
 * @returns URL-friendly slug (lowercase, alphanumeric with hyphens)
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Generates metadata for SEO and social sharing for a company careers page
 * @param slug - The company slug
 * @returns Metadata object for Next.js
 */
export async function generateCareerMetadata(slug: string): Promise<Metadata> {
  await connectDB();
  const company = await Company.findOne({ slug }).lean();

  const companyName = company?.name;
  const description = company?.contentSections?.[0]?.content?.substring(0, 160) || 
    `Join ${companyName}. Explore our open positions and become part of our team.`;
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${siteUrl}/careers/${slug}`;

  return {
    title: `Careers at ${companyName} | Jobs & Opportunities`,
    description,
    openGraph: {
      title: `Careers at ${companyName}`,
      description,
      type: "website",
      url: pageUrl,
      images: company?.bannerUrl ? [{ url: company?.bannerUrl }] : [],
      siteName: companyName,
    },
    twitter: {
      card: "summary_large_image",
      title: `Careers at ${companyName}`,
      description,
      images: company?.bannerUrl ? [company?.bannerUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}
