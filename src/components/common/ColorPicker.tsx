"use client";

import * as React from "react";
import { FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorPickerProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: FieldError;
}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ label, error, className, id, name, value, onChange, ...props }, ref) => {
    const inputId = id || name;
    const [localValue, setLocalValue] = React.useState((value as string) || "#000000");

    React.useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value as string);
      }
    }, [value]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      if (onChange) {
        onChange(e);
      }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, name: name || "", value: newValue },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <input
            ref={ref}
            type="color"
            id={inputId}
            name={name}
            value={localValue}
            onChange={handleColorChange}
            aria-invalid={!!error}
            className={cn(
              "h-10 w-full sm:w-20 rounded-md border border-input cursor-pointer",
              className
            )}
            {...props}
          />
          <input
            type="text"
            value={localValue}
            onChange={handleTextChange}
            placeholder="#000000"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        {error && (
          <p className="text-sm text-destructive">{error.message}</p>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
