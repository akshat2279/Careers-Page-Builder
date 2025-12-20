"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { Button } from "../common/Button";
import { UI_TEXT } from "@/constants/uiText";

interface HeroSectionProps {
  name: string;
  tagline?: string;
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor: string;
  onScrollToJobs: () => void;
}

export function HeroSection({
  name,
  tagline,
  logoUrl,
  bannerUrl,
  primaryColor,
  onScrollToJobs,
}: HeroSectionProps) {
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
          {UI_TEXT.CAREERS_PAGE.HERO.TITLE_PREFIX} {name || UI_TEXT.CAREERS_PAGE.HERO.FALLBACK_NAME}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
        >
          <Button
            onClick={onScrollToJobs}
            size="lg"
            className="text-base px-8 py-6 bg-white text-gray-900 hover:bg-gray-100 shadow-xl"
            aria-label={UI_TEXT.CAREERS_PAGE.HERO.ARIA_LABEL}
          >
            {UI_TEXT.CAREERS_PAGE.HERO.VIEW_ROLES_BUTTON}
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
