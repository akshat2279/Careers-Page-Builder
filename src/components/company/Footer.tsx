"use client";

import { UI_TEXT } from "@/constants/uiText";

interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  return (
    <footer className="py-12 px-4 bg-slate-50 dark:bg-slate-950 border-t border-border" role="contentinfo">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-muted-foreground mb-2">
          © {new Date().getFullYear()} {name || UI_TEXT.CAREERS_PAGE.FOOTER.FALLBACK_NAME}. {UI_TEXT.CAREERS_PAGE.FOOTER.COPYRIGHT}
        </p>
        <p className="text-sm text-muted-foreground/70">
          {UI_TEXT.CAREERS_PAGE.FOOTER.TAGLINE}
        </p>
      </div>
    </footer>
  );
}
