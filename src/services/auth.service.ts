import { post } from "@/utils/http";
import endpoints from "@/constants/endpoints";

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    email: string;
    companyId: string;
  };
  error?: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class AuthService {
  private baseURL = "/api/auth";

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const data = await post<LoginResponse>(endpoints.auth.LOGIN, { email, password });
      return data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || "An unexpected error occurred",
      };
    }
  }

  async signup(
    companyName: string,
    email: string,
    password: string
  ): Promise<SignupResponse> {
    try {
      const data = await post<SignupResponse>(endpoints.auth.SIGNUP, {
        companyName,
        email,
        password,
      });
      return data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || "An unexpected error occurred",
      };
    }
  }
}

export const authService = new AuthService();
