"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authService } from "@/services/auth.service";
import { signupSchema } from "@/validations/signupSchema";
import { InputWrapper } from "@/components/common/InputWrapper";
import { Button } from "@/components/common/Button";
import { GradientHero } from "@/components/ui/GradientHero";
import { ERROR_MESSAGES } from "@/constants/messages";
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
        router.push("/login");
      } else {
        setError(response.error || "Signup failed");
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
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up to get started
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputWrapper
            label="Company Name"
            type="text"
            placeholder="Acme Inc."
            error={errors.companyName}
            {...register("companyName")}
          />

          <InputWrapper
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email}
            {...register("email")}
          />

          <InputWrapper
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password}
            {...register("password")}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </a>
        </p>
        </div>
      </div>
    </div>
  );
}
