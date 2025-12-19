/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Company from "@/lib/models/Company";
import { CareersPreview } from "@/components/company/CareersPreview";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generates metadata for SEO and social sharing
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
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

/**
 * Renders the public careers page for a company
 */
export default async function CareersPage({ params }: PageProps) {
  const { slug } = await params;
  
  await connectDB();
  const company = await Company.findOne({ slug }).lean();

  // Return 404 if company not found
  if (!company) {
    notFound();
  }

  // Prepare company data for rendering
  const companyData = {
    name: company?.name || "",
    tagline: company?.tagline || "",
    logoUrl: company?.logoUrl || "",
    bannerUrl: company?.bannerUrl || "",
    primaryColor: company?.primaryColor || "#4f46e5",
    cultureVideoUrl: company?.cultureVideoUrl || "",
    contentSections: (company?.contentSections || []).map((section: any) => ({
      title: section.title,
      content: section.content,
      imageUrl: section.imageUrl,
      order: section.order,
    })),
    benefitCards: (company?.benefitCards || []).map((card: any) => ({
      title: card.title,
      description: card.description,
    })),
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${siteUrl}/careers/${slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.name,
            url: pageUrl,
            logo: company.logoUrl,
            description: company.contentSections?.[0]?.content || `Careers at ${company.name}`,
          }),
        }}
      />
      <CareersPreview
        name={companyData.name}
        tagline={companyData.tagline}
        logoUrl={companyData.logoUrl}
        bannerUrl={companyData.bannerUrl}
        primaryColor={companyData.primaryColor}
        cultureVideoUrl={companyData.cultureVideoUrl}
        contentSections={companyData.contentSections}
        benefitCards={companyData.benefitCards}
        isPreview={false}
      />
    </>
  );
}
