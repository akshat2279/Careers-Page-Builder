import * as yup from "yup";

const contentSectionSchema = yup.object().shape({
  title: yup
    .string()
    .required("Section title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  content: yup
    .string()
    .required("Section content is required")
    .min(10, "Content must be at least 10 characters")
    .max(500, "Content must not exceed 500 characters"),
  order: yup.number().required(),
});

export const companySettingsSchema = yup.object({
  name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),
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
});

export type CompanySettingsFormData = yup.InferType<typeof companySettingsSchema>;
