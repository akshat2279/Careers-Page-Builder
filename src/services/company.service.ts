import { CompanyData } from "@/types/company";
import { CompanySettingsFormData } from "@/validations/companySettingsSchema";
import { get, post } from "@/utils/http";
import endpoints from "@/constants/endpoints";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class CompanyService {

  async getCompanyBySlug(slug: string): Promise<ApiResponse<CompanyData>> {
    try {
      const data = await get<CompanyData>(endpoints.company.GET_BY_SLUG(slug));
      return {
        success: true,
        data,
      };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message ,
      };
    }
  }

  async getCompanySettings(): Promise<ApiResponse<CompanyData>> {
    try {
      const result = await get<{ success: boolean; data: CompanyData }>(endpoints.company.SETTINGS);
      return result;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message,
      };
    }
  }

  async updateCompanySettings(
    data: CompanySettingsFormData
  ): Promise<ApiResponse<CompanyData>> {
    try {
      const sectionsWithOrder = data.contentSections.map((section, index) => ({
        ...section,
        order: index,
      }));

      const result = await post<{ success: boolean; data: CompanyData; message: string }>(
        endpoints.company.SETTINGS,
        {
          ...data,
          contentSections: sectionsWithOrder,
        }
      );

      return result;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message ,
      };
    }
  }
}

export const companyService = new CompanyService();
