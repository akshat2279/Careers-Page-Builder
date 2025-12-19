"use client";

import * as React from "react";
import { FieldError } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextareaWrapperProps extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: FieldError;
}

const TextareaWrapper = React.forwardRef<HTMLTextAreaElement, TextareaWrapperProps>(
  ({ label, error, className, id, name, ...props }, ref) => {
    const inputId = id || name;

    return (
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Textarea
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

TextareaWrapper.displayName = "TextareaWrapper";

export { TextareaWrapper };
