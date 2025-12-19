"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContentSection, BenefitCard } from "@/types/company";
import { Button } from "../common/Button";
import { JobsList } from "../careers/JobsList";
import { PreviewJobsSection } from "./PreviewJobsSection";
import { ArrowDown, Sparkles, Target, Heart } from "lucide-react";
import { getEmbedUrl, isDirectVideoUrl } from "@/lib/videoUtils";

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
  const genericIcons = [Sparkles, Target, Heart];
  const jobsSectionRef = React.useRef<HTMLElement>(null);

  const scrollToJobs = React.useCallback(() => {
    if (jobsSectionRef.current) {
      jobsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const sortedSections = React.useMemo(
    () => [...contentSections].sort((a, b) => a.order - b.order),
    [contentSections]
  );

  const bannerStyle = React.useMemo(
    () => ({
      backgroundImage: bannerUrl ? `url(${bannerUrl})` : undefined,
      backgroundSize: "cover" as const,
      backgroundPosition: "center" as const,
      backgroundColor: bannerUrl ? undefined : primaryColor,
    }),
    [bannerUrl, primaryColor]
  );

  const embedVideoUrl = React.useMemo(
    () => cultureVideoUrl ? getEmbedUrl(cultureVideoUrl) : "",
    [cultureVideoUrl]
  );

  const isDirectVideo = React.useMemo(
    () => cultureVideoUrl ? isDirectVideoUrl(cultureVideoUrl) : false,
    [cultureVideoUrl]
  );
  return (
    <div className="min-h-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-y-auto scroll-smooth">
      <section
        className="relative min-h-[60vh] flex items-center justify-center text-center px-4 py-16"
        style={bannerStyle}
        aria-label="Company header"
      >
        {bannerUrl && <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />}
        {!bannerUrl && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          {logoUrl && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="relative w-24 h-24 bg-white rounded-2xl p-4 shadow-2xl ring-4 ring-white/20">
                <Image
                  src={logoUrl}
                  alt={`${name} logo`}
                  fill
                  sizes="96px"
                  className="object-contain p-1"
                  priority
                />
              </div>
            </motion.div>
          )}

          {tagline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg md:text-xl text-white/90 font-medium italic"
            >
              {tagline}
            </motion.p>
          )}

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
          >
            Careers at {name || "Company"}
          </motion.h1>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <Button
              onClick={scrollToJobs}
              size="lg"
              className="text-base px-8 py-6 bg-white text-gray-900 hover:bg-gray-100 shadow-xl"
              aria-label="Scroll to open job positions"
            >
              View Open Roles
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 md:py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: primaryColor }}
            >
              Why Join {name || "Us"}?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be part of something extraordinary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitCards.map((card, index) => {
              const IconComponent = genericIcons[index % genericIcons.length];
              return (
                <div key={index} className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm hover:shadow-xl transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="mb-4 inline-flex p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}10` }}>
                      <IconComponent className="h-8 w-8" style={{ color: primaryColor }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {cultureVideoUrl && (
        <section
          className="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
          aria-label="Company culture"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Life at {name || "Company"}
              </h2>
              <p className="text-lg text-muted-foreground">
                See what it&apos;s like to be part of our team
              </p>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800">
              {isDirectVideo ? (
                <video
                  src={cultureVideoUrl}
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={embedVideoUrl}
                  title={`${name} Company Culture Video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {sortedSections && sortedSections.length > 0 && (
        <>
          {sortedSections.map((section, index) => (
            <section
              key={`${section.title}-${index}`}
              className={`py-16 md:py-20 px-4 ${
                index % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-950"
              }`}
              aria-labelledby={`section-${index}`}
            >
              <div className="max-w-6xl mx-auto">
                {section.imageUrl ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {/* Heading & Content Side */}
                    <div className={`${index % 2 === 0 ? "lg:order-1" : "lg:order-2"} flex flex-col justify-start space-y-6`}>
                      <div>
                        <h2
                          id={`section-${index}`}
                          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                          style={{ color: primaryColor }}
                        >
                          {section.title}
                        </h2>
                        <div className="w-20 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                      </div>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap text-muted-foreground">
                          {section.content}
                        </p>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className={`${index % 2 === 0 ? "lg:order-2" : "lg:order-1"} flex items-center justify-center`}>
                      <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden shadow-xl">
                        <Image
                          src={section.imageUrl}
                          alt={section.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto text-center">
                    <h2
                      id={`section-${index}`}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                      style={{ color: primaryColor }}
                    >
                      {section.title}
                    </h2>
                    <div className="flex justify-center mb-8">
                      <div className="w-20 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                    </div>
                    <div className="prose prose-lg max-w-none mx-auto">
                      <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap text-muted-foreground">
                        {section.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}
        </>
      )}
      {isPreview ? (
        <PreviewJobsSection jobsSectionRef={jobsSectionRef} />
      ) : (
        <section
          ref={jobsSectionRef}
          className="py-16 md:py-20 px-4 bg-white dark:bg-slate-900"
          aria-labelledby="open-roles-heading"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="open-roles-heading"
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: primaryColor }}
              >
                Open Roles
              </h2>
              <p className="text-lg text-muted-foreground">
                Find your perfect role and start your journey with us
              </p>
            </div>
            <JobsList />
          </div>
        </section>
      )}

      <footer className="py-12 px-4 bg-slate-50 dark:bg-slate-950 border-t border-border" role="contentinfo">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground mb-2">
            © {new Date().getFullYear()} {name || "Company"}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Building the future, one hire at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
