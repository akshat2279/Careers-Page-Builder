"use client";

import * as React from "react";

import { UI_TEXT } from "@/constants/uiText";
import { JobsList } from "../careers/JobsList";
import { PreviewJobsSection } from "./PreviewJobsSection";

interface JobsSectionProps {
  primaryColor: string;
  isPreview: boolean;
  jobsSectionRef: React.RefObject<HTMLElement | null>;
}

export function JobsSection({
  primaryColor,
  isPreview,
  jobsSectionRef,
}: JobsSectionProps) {
  if (isPreview) {
    return <PreviewJobsSection jobsSectionRef={jobsSectionRef} />;
  }

  return (
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
            {UI_TEXT.CAREERS_PAGE.JOBS.TITLE}
          </h2>
          <p className="text-lg text-muted-foreground">
            {UI_TEXT.CAREERS_PAGE.JOBS.SUBTITLE}
          </p>
        </div>
        <JobsList />
      </div>
    </section>
  );
}
