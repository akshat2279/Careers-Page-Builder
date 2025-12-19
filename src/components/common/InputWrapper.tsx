"use client";

import * as React from "react";
import { FieldError } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputWrapperProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: FieldError;
}

const InputWrapper = React.forwardRef<HTMLInputElement, InputWrapperProps>(
  ({ label, error, className, id, name, ...props }, ref) => {
    const inputId = id || name;

    return (
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Input
          ref={ref}
          id={inputId}
          name={name}
          aria-invalid={!!error}
          className={cn(className)}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error.message}</p>
        )}
      </div>
    );
  }
);

InputWrapper.displayName = "InputWrapper";

export { InputWrapper };
