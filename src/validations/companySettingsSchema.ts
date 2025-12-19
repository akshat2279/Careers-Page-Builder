import * as yup from "yup";

const contentSectionSchema = yup.object().shape({
  title: yup
    .string()
    .required("Section title is required")
    .min(3, "Title must be at least 3 characters")
    .max(500, "Title must not exceed 500 characters"),
  content: yup
    .string()
    .required("Section content is required")
    .min(10, "Content must be at least 10 characters")
    .max(1000, "Content must not exceed 1000 characters"),
  imageUrl: yup
    .string()
    .url("Please enter a valid URL")
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
  order: yup.number().required(),
});

const benefitCardSchema = yup.object().shape({
  title: yup
    .string()
    .required("Benefit title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: yup
    .string()
    .required("Benefit description is required")
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must not exceed 200 characters"),
});

export const companySettingsSchema = yup.object({
  name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),
  tagline: yup
    .string()
    .transform((value) => (value === "" ? "" : value))
    .max(200, "Tagline must not exceed 200 characters")
    .default(""),
  logoUrl: yup
    .string()
    .url("Please enter a valid URL")
    .transform((value) => (value === "" ? "" : value))
    .default(""),
  bannerUrl: yup
    .string()
    .url("Please enter a valid URL")
    .transform((value) => (value === "" ? "" : value))
    .default(""),
  primaryColor: yup
    .string()
    .required("Primary color is required")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Please enter a valid hex color"),
 
  cultureVideoUrl: yup
    .string()
    .url("Please enter a valid URL")
    .transform((value) => (value === "" ? "" : value))
    .default(""),
  contentSections: yup.array().of(contentSectionSchema).default([]),
  benefitCards: yup.array().of(benefitCardSchema).min(3, "Please add exactly 3 benefit cards").max(3, "Please add exactly 3 benefit cards").required("Benefit cards are required"),
});

export type CompanySettingsFormData = yup.InferType<typeof companySettingsSchema>;
