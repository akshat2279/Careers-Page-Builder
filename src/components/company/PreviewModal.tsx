"use client";

import * as React from "react";
import { CareersPreview } from "./CareersPreview";
import { CompanyData } from "@/types/company";
import { LOADING_MESSAGES } from "@/constants/messages";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewData?: CompanyData;
}

export function PreviewModal({
  isOpen,
  onClose,
  previewData,
}: PreviewModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close preview"
      />

      <div 
        ref={modalRef}
        className="relative z-10 w-full h-full max-w-7xl max-h-[95vh] m-4 bg-background rounded-lg shadow-2xl overflow-y-auto focus:outline-none"
        tabIndex={-1}
      >
        {previewData ? (
          <CareersPreview
            name={previewData.name}
            logoUrl={previewData.logoUrl}
            bannerUrl={previewData.bannerUrl}
            primaryColor={previewData.primaryColor}
            cultureVideoUrl={previewData.cultureVideoUrl}
            contentSections={previewData.contentSections}
            isPreview={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground" role="status" aria-live="polite">
              {LOADING_MESSAGES.LOADING_PREVIEW}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
