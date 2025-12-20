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
import { signupSchema } from "@/validations/signupSchema";

import type { SignupFormData } from "@/types/auth";

/**
 * Signup page component with form validation
 */
export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  /**
   * Handles form submission and user registration
   */
  const onSubmit = async (data: SignupFormData) => {
    try {
      setError(null);
      const response = await authService.signup(
        data.companyName,
        data.email,
        data.password
      );

      if (response.success) {
        router.push(ROUTES.LOGIN);
      } else {
        setError(response.error || ERROR_MESSAGES.SOMETHING_WENT_WRONG);
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

      {/* Right side - Signup Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6 md:space-y-8 rounded-lg border p-6 md:p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">{UI_TEXT.SIGNUP.TITLE}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {UI_TEXT.SIGNUP.SUBTITLE}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputWrapper
            label={UI_TEXT.SIGNUP.COMPANY_NAME_LABEL}
            type="text"
            placeholder={UI_TEXT.SIGNUP.COMPANY_NAME_PLACEHOLDER}
            error={errors.companyName}
            {...register("companyName")}
          />

          <InputWrapper
            label={UI_TEXT.SIGNUP.EMAIL_LABEL}
            type="email"
            placeholder={UI_TEXT.SIGNUP.EMAIL_PLACEHOLDER}
            error={errors.email}
            {...register("email")}
          />

          <InputWrapper
            label={UI_TEXT.SIGNUP.PASSWORD_LABEL}
            type="password"
            placeholder={UI_TEXT.SIGNUP.PASSWORD_PLACEHOLDER}
            error={errors.password}
            {...register("password")}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            {UI_TEXT.SIGNUP.SUBMIT_BUTTON}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {UI_TEXT.SIGNUP.HAVE_ACCOUNT}{" "}
          <a href={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
            {UI_TEXT.SIGNUP.LOGIN_LINK}
          </a>
        </p>
        </div>
      </div>
    </div>
  );
}
