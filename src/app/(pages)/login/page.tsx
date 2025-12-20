"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/common/Button";
import { InputWrapper } from "@/components/common/InputWrapper";
import { GradientHero } from "@/components/ui/GradientHero";
import { ERROR_MESSAGES } from "@/constants/messages";
import { UI_TEXT } from "@/constants/uiText";
import { ROUTES } from "@/config/routes";
import { authService } from "@/services/auth.service";
import { setAuthToken } from "@/utils/auth";
import { loginSchema } from "@/validations/loginSchema";

import type { LoginFormData } from "@/types/auth";

/**
 * Login page component with form validation
 */
export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  /**
   * Handles form submission and authentication
   */
  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      const response = await authService.login(data.email, data.password);

      if (response.success && response.token) {
        setAuthToken(response.token);
        router.push(ROUTES.HOME);
      } else {
        setError(response?.error || ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
    } catch {
      setError(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Gradient Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <GradientHero />
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6 md:space-y-8 rounded-lg border p-6 md:p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">{UI_TEXT.LOGIN.TITLE}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {UI_TEXT.LOGIN.SUBTITLE}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputWrapper
            label={UI_TEXT.LOGIN.EMAIL_LABEL}
            type="email"
            placeholder={UI_TEXT.LOGIN.EMAIL_PLACEHOLDER}
            error={errors.email}
            {...register("email")}
          />

          <InputWrapper
            label={UI_TEXT.LOGIN.PASSWORD_LABEL}
            type="password"
            placeholder={UI_TEXT.LOGIN.PASSWORD_PLACEHOLDER}
            error={errors.password}
            {...register("password")}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            {UI_TEXT.LOGIN.SUBMIT_BUTTON}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {UI_TEXT.LOGIN.NO_ACCOUNT}{" "}
          <a href={ROUTES.SIGNUP} className="font-medium text-primary hover:underline">
            {UI_TEXT.LOGIN.SIGNUP_LINK}
          </a>
        </p>
        </div>
      </div>
    </div>
  );
}
