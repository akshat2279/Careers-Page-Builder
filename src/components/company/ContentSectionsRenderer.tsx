"use client";

import * as React from "react";
import Image from "next/image";
import { ContentSection } from "@/types/company";

interface ContentSectionsRendererProps {
  contentSections: ContentSection[];
  primaryColor: string;
}

export function ContentSectionsRenderer({
  contentSections,
  primaryColor,
}: ContentSectionsRendererProps) {
  const sortedSections = React.useMemo(
    () => [...contentSections].sort((a, b) => a.order - b.order),
    [contentSections]
  );

  if (!sortedSections || sortedSections.length === 0) {
    return null;
  }

  return (
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
  );
}
