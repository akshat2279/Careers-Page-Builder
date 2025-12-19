"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, Copy, Check, ExternalLink, Sparkles, Rocket, Users } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { companyService } from "@/services/company.service";
import { getGreeting, getGreetingEmoji } from "@/utils/greeting";
import { Button } from "@/components/common/Button";
import { Toaster } from "@/components/common/Toast";

/**
 * Home page with company dashboard and career page link
 */
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

  const getCareersUrl = () => {
    if (typeof window === "undefined") return "";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    return `${siteUrl}/careers/${companySlug}`;
  };

  const handleCopyLink = async () => {
    const careersUrl = getCareersUrl();
    
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
    const careersUrl = getCareersUrl();
    window.open(careersUrl, "_blank");
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="text-5xl" aria-hidden="true">{greetingEmoji}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                {greeting}
              </h1>
              <p className="text-lg text-muted-foreground">Manage your careers page and attract top talent</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 pb-12">

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold">Beautiful Design</h3>
                </div>
                <p className="text-sm text-muted-foreground">Create stunning career pages</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Rocket className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Quick Setup</h3>
                </div>
                <p className="text-sm text-muted-foreground">Get started in minutes</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-pink-500/10">
                    <Users className="h-5 w-5 text-pink-600" />
                  </div>
                  <h3 className="font-semibold">Attract Talent</h3>
                </div>
                <p className="text-sm text-muted-foreground">Build your dream team</p>
              </div>
            </div>
          </div>

          {/* Careers Page Link */}
          {!loading && companySlug && (
            <div className="rounded-xl border bg-gradient-to-br from-card to-card/50 p-8 mb-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                  <ExternalLink className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">Your Careers Page</h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <div className="px-4 py-3 bg-muted/50 rounded-lg text-sm font-mono break-all border" suppressHydrationWarning>
                    {getCareersUrl()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleOpenCareersPage}
                    className="flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Link
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Action Card */}
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Customize Your Careers Page</h2>
            <p className="text-muted-foreground mb-6">
              Update your company branding, add content sections, and showcase your culture to attract the best candidates.
            </p>
            <Button
              onClick={() => router.push("/company-settings")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
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