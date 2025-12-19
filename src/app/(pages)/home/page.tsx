"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { Settings, Copy, Check, ExternalLink } from "lucide-react";
import { getGreeting, getGreetingEmoji } from "@/utils/greeting";
import { useToast } from "@/hooks/useToast";
import { Toaster } from "@/components/common/Toast";
import { companyService } from "@/services/company.service";

export default function HomePage() {
  const router = useRouter();
  const toast = useToast();
  const greeting = useMemo(() => getGreeting(), []);
  const greetingEmoji = useMemo(() => getGreetingEmoji(), []);
  const [companySlug, setCompanySlug] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanySlug = async () => {
      try {
        const result = await companyService.getCompanySettings();
        if (result.success && result.data) {
          setCompanySlug(result.data.slug || "");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCompanySlug();
  }, []);

  const handleCopyLink = async () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const careersUrl = `${siteUrl}/careers/${companySlug}`;
    
    try {
      await navigator.clipboard.writeText(careersUrl);
      setCopied(true);
      toast.success("Careers page link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleOpenCareersPage = () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const careersUrl = `${siteUrl}/careers/${companySlug}`;
    window.open(careersUrl, "_blank");
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen p-4 md:p-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl" aria-hidden="true">{greetingEmoji}</span>
              <h1 className="text-2xl md:text-3xl font-bold">{greeting}</h1>
            </div>
            <p className="text-muted-foreground">Welcome back to your dashboard</p>
          </div>

          {!loading && companySlug && (
            <div className="rounded-lg border p-6 mb-6 bg-card">
              <h2 className="text-lg font-semibold mb-4">Share Your Careers Page</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <div className="px-4 py-2 bg-muted rounded-lg text-sm font-mono break-all">
                    {process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/careers/{companySlug}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleOpenCareersPage}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleCopyLink}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Button
              onClick={() => router.push("/company-settings")}
              className="w-full sm:w-auto"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Company Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}