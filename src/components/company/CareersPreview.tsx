"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "../common/Button";
import { ContentSection } from "@/types/company";
import { JobsList } from "../careers/JobsList";

interface CareersPreviewProps {
  name: string;
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor: string;
  cultureVideoUrl?: string;
  contentSections: ContentSection[];
  isPreview: boolean;
}

export function CareersPreview({
  name,
  logoUrl,
  bannerUrl,
  primaryColor,
  cultureVideoUrl,
  contentSections,
  isPreview,
}: CareersPreviewProps) {
  const jobsSectionRef = React.useRef<HTMLElement>(null);

  const scrollToJobs = React.useCallback(() => {
    if (jobsSectionRef.current) {
      jobsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const sortedSections = React.useMemo(
    () => contentSections.sort((a, b) => a.order - b.order),
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

  return (
    <div className="min-h-full bg-background overflow-y-auto">
      <section
        className="relative min-h-[40vh] flex items-center justify-center text-center px-4 py-12"
        style={bannerStyle}
        aria-label="Company header"
      >
        {bannerUrl && <div className="absolute inset-0 bg-black/40" />}

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          {logoUrl && (
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20 bg-white rounded-lg p-3 shadow-lg">
                <Image
                  src={logoUrl}
                  alt={`${name} logo`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                  priority
                />
              </div>
            </div>
          )}

          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Careers at {name || "Company"}
          </h1>

          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Build products that shape the future
          </p>

          <Button
            onClick={scrollToJobs}
            size="lg"
            className="mt-4 text-sm md:text-base px-6 py-4"
            aria-label="Scroll to open job positions"
          >
            View Open Roles
          </Button>
        </div>
      </section>

      {cultureVideoUrl && (
        <section
          className="py-8 md:py-12 px-4 bg-muted/30"
          aria-label="Company culture"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
              Life at {name || "Company"}
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
              <iframe
                src={cultureVideoUrl}
                title={`${name} Company Culture Video`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      {sortedSections && sortedSections.length > 0 && (
        <>
          {sortedSections.map((section, index) => (
            <section
              key={`${section.title}-${index}`}
              className={`py-8 md:py-12 px-4 ${
                index % 2 === 0 ? "bg-background" : "bg-muted/30"
              }`}
              aria-labelledby={`section-${index}`}
            >
              <div className="max-w-4xl mx-auto text-center">
                <h2
                  id={`section-${index}`}
                  className="text-xl md:text-2xl font-bold mb-4"
                >
                  {section.title}
                </h2>
                <div className="prose prose-sm md:prose-base max-w-none mx-auto">
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </>
      )}
      {isPreview ? (
        <section
          ref={jobsSectionRef}
          className="py-8 md:py-12 px-4 bg-background"
          aria-labelledby="open-roles-heading"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              id="open-roles-heading"
              className="text-xl md:text-2xl font-bold mb-6 text-center"
            >
              Open Roles
            </h2>

            <div
              className="mb-6 space-y-3"
              role="search"
              aria-label="Job search filters"
            >
              <input
                type="text"
                placeholder="Search by title"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                disabled
                aria-label="Search jobs by title"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  disabled
                  aria-label="Filter by location"
                >
                  <option>All Locations</option>
                </select>

                <select
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  disabled
                  aria-label="Filter by job type"
                >
                  <option>All Job Types</option>
                </select>
              </div>
            </div>
            <ul
              className="space-y-3"
              role="list"
              aria-label="Available job positions"
            >
              <li>
                <article className="p-4 md:p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
                  <h3 className="text-lg md:text-xl font-semibold mb-1">
                    Frontend Engineer
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Bangalore • Full-time
                  </p>
                </article>
              </li>

              <li>
                <article className="p-4 md:p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
                  <h3 className="text-lg md:text-xl font-semibold mb-1">
                    Backend Engineer
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Remote • Full-time
                  </p>
                </article>
              </li>
            </ul>

            <div
              className="text-center py-8 text-muted-foreground"
              role="status"
            >
              <p className="text-sm">More roles coming soon!</p>
            </div>
          </div>
        </section>
      ) : (
        <section
          ref={jobsSectionRef}
          className="py-8 md:py-12 px-4 bg-background"
          aria-labelledby="open-roles-heading"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              id="open-roles-heading"
              className="text-xl md:text-2xl font-bold mb-6 text-center"
            >
              Open Roles
            </h2>
            <JobsList />
          </div>
        </section>
      )}

      <footer className="py-6 px-4 border-t border-border" role="contentinfo">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>
            © {new Date().getFullYear()} {name || "Company"}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
