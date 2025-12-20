"use client";

import * as React from "react";
import { ContentSection, BenefitCard } from "@/types/company";
import { HeroSection } from "./HeroSection";
import { BenefitsSection } from "./BenefitsSection";
import { CultureVideoSection } from "./CultureVideoSection";
import { ContentSectionsRenderer } from "./ContentSectionsRenderer";
import { JobsSection } from "./JobsSection";
import { Footer } from "./Footer";

interface CareersPreviewProps {
  name: string;
  tagline?: string;
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor: string;
  cultureVideoUrl?: string;
  contentSections: ContentSection[];
  benefitCards: BenefitCard[];
  isPreview: boolean;
}

/**
 * Renders the careers page preview with company branding and job listings
 */
export function CareersPreview({
  name,
  tagline,
  logoUrl,
  bannerUrl,
  primaryColor,
  cultureVideoUrl,
  contentSections,
  benefitCards,
  isPreview,
}: CareersPreviewProps) {
  const jobsSectionRef = React.useRef<HTMLElement>(null);

  const scrollToJobs = React.useCallback(() => {
    if (jobsSectionRef.current) {
      jobsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div className="min-h-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-y-auto scroll-smooth">
      <HeroSection
        name={name}
        tagline={tagline}
        logoUrl={logoUrl}
        bannerUrl={bannerUrl}
        primaryColor={primaryColor}
        onScrollToJobs={scrollToJobs}
      />

      <BenefitsSection
        name={name}
        primaryColor={primaryColor}
        benefitCards={benefitCards}
      />

      {cultureVideoUrl && (
        <CultureVideoSection
          name={name}
          cultureVideoUrl={cultureVideoUrl}
        />
      )}

      <ContentSectionsRenderer
        contentSections={contentSections}
        primaryColor={primaryColor}
      />

      <JobsSection
        primaryColor={primaryColor}
        isPreview={isPreview}
        jobsSectionRef={jobsSectionRef}
      />

      <Footer name={name} />
    </div>
  );
}
