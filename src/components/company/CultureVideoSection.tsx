"use client";

import * as React from "react";

import { UI_TEXT } from "@/constants/uiText";
import { getEmbedUrl, isDirectVideoUrl } from "@/lib/videoUtils";

interface CultureVideoSectionProps {
  name: string;
  cultureVideoUrl: string;
}

export function CultureVideoSection({
  name,
  cultureVideoUrl,
}: CultureVideoSectionProps) {
  const embedVideoUrl = React.useMemo(
    () => getEmbedUrl(cultureVideoUrl),
    [cultureVideoUrl]
  );

  const isDirectVideo = React.useMemo(
    () => isDirectVideoUrl(cultureVideoUrl),
    [cultureVideoUrl]
  );

  return (
    <section
      className="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
      aria-label="Company culture"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {UI_TEXT.CAREERS_PAGE.CULTURE.TITLE_PREFIX} {name || UI_TEXT.CAREERS_PAGE.CULTURE.FALLBACK_NAME}
          </h2>
          <p className="text-lg text-muted-foreground">
            {UI_TEXT.CAREERS_PAGE.CULTURE.SUBTITLE}
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
              {UI_TEXT.CAREERS_PAGE.CULTURE.VIDEO_NOT_SUPPORTED}
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
  );
}
