import { useState, useEffect } from "react";
import { CompanyData } from "@/types/company";
import { ERROR_MESSAGES } from "@/constants/messages";
import { companyService } from "@/services/company.service";

interface UseCompanyDataReturn {
  company: CompanyData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCompanyData(slug: string): UseCompanyDataReturn {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!slug || typeof slug !== "string" || slug.trim() === "") {
        setError(ERROR_MESSAGES.INVALID_SLUG);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const result = await companyService.getCompanyBySlug(slug);

      if (result.success && result.data) {
        setCompany(result.data);
      } else {
        setError(result.error || ERROR_MESSAGES.FAILED_TO_LOAD);
      }

      setLoading(false);
    };

    fetchCompanyData();
  }, [slug]);

  const refetch = () => {
    setLoading(true);
    setError(null);
  };

  return { company, loading, error, refetch };
}
