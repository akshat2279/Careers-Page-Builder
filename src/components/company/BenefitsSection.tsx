"use client";

import { Sparkles, Target, Heart } from "lucide-react";

import { UI_TEXT } from "@/constants/uiText";
import { BenefitCard } from "@/types/company";

interface BenefitsSectionProps {
  name: string;
  primaryColor: string;
  benefitCards: BenefitCard[];
}

export function BenefitsSection({
  name,
  primaryColor,
  benefitCards,
}: BenefitsSectionProps) {
  const genericIcons = [Sparkles, Target, Heart];

  return (
    <section className="py-16 md:py-20 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            {UI_TEXT.CAREERS_PAGE.BENEFITS.TITLE_PREFIX} {name || UI_TEXT.CAREERS_PAGE.BENEFITS.FALLBACK_NAME}{UI_TEXT.CAREERS_PAGE.BENEFITS.TITLE_SUFFIX}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {UI_TEXT.CAREERS_PAGE.BENEFITS.SUBTITLE}
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
  );
}
