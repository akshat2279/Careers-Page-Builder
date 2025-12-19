"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { Settings } from "lucide-react";
import { getGreeting, getGreetingEmoji } from "@/utils/greeting";

export default function HomePage() {
  const router = useRouter();
  const greeting = useMemo(() => getGreeting(), []);
  const greetingEmoji = useMemo(() => getGreetingEmoji(), []);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl" aria-hidden="true">{greetingEmoji}</span>
            <h1 className="text-2xl md:text-3xl font-bold">{greeting}</h1>
          </div>
          <p className="text-muted-foreground">Welcome back to your dashboard</p>
        </div>

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
  );
}