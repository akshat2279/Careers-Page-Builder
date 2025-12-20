import * as yup from "yup";
import { VALIDATION_MESSAGES } from "@/constants/validationMessages";
import { HEX_COLOR_REGEX } from "@/utils/constanst";

const contentSectionSchema = yup.object().shape({
  title: yup
    .string()
    .required(VALIDATION_MESSAGES.SECTION_TITLE_REQUIRED)
    .min(3, VALIDATION_MESSAGES.SECTION_TITLE_MIN)
    .max(500, VALIDATION_MESSAGES.SECTION_TITLE_MAX),
  content: yup
    .string()
    .required(VALIDATION_MESSAGES.SECTION_CONTENT_REQUIRED)
    .min(10, VALIDATION_MESSAGES.SECTION_CONTENT_MIN)
    .max(1000, VALIDATION_MESSAGES.SECTION_CONTENT_MAX),
  imageUrl: yup
    .string()
    .url(VALIDATION_MESSAGES.URL_INVALID)
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
  order: yup.number().required(),
});

const benefitCardSchema = yup.object().shape({
  title: yup
    .string()
    .required(VALIDATION_MESSAGES.BENEFIT_TITLE_REQUIRED)
    .min(3, VALIDATION_MESSAGES.BENEFIT_TITLE_MIN)
    .max(100, VALIDATION_MESSAGES.BENEFIT_TITLE_MAX),
  description: yup
    .string()
    .required(VALIDATION_MESSAGES.BENEFIT_DESCRIPTION_REQUIRED)
    .min(10, VALIDATION_MESSAGES.BENEFIT_DESCRIPTION_MIN)
    .max(200, VALIDATION_MESSAGES.BENEFIT_DESCRIPTION_MAX),
});

export const companySettingsSchema = yup.object({
  name: yup
    .string()
    .required(VALIDATION_MESSAGES.COMPANY_NAME_REQUIRED)
    .min(2, VALIDATION_MESSAGES.COMPANY_NAME_MIN)
    .max(100, VALIDATION_MESSAGES.COMPANY_NAME_MAX),
  tagline: yup
    .string()
    .transform((value) => (value === "" ? "" : value))
    .max(200, VALIDATION_MESSAGES.TAGLINE_MAX)
    .default(""),
  logoUrl: yup
    .string()
    .url(VALIDATION_MESSAGES.URL_INVALID)
    .transform((value) => (value === "" ? "" : value))
    .default(""),
  bannerUrl: yup
    .string()
    .url(VALIDATION_MESSAGES.URL_INVALID)
    .transform((value) => (value === "" ? "" : value))
    .default(""),
  primaryColor: yup
    .string()
    .required(VALIDATION_MESSAGES.PRIMARY_COLOR_REQUIRED)
    .matches(HEX_COLOR_REGEX, VALIDATION_MESSAGES.PRIMARY_COLOR_INVALID),
 
  cultureVideoUrl: yup
    .string()
    .url(VALIDATION_MESSAGES.URL_INVALID)
    .transform((value) => (value === "" ? "" : value))
    .default(""),
  contentSections: yup.array().of(contentSectionSchema).default([]),
  benefitCards: yup.array().of(benefitCardSchema).min(3, VALIDATION_MESSAGES.BENEFIT_CARDS_EXACT).max(3, VALIDATION_MESSAGES.BENEFIT_CARDS_EXACT).required(VALIDATION_MESSAGES.BENEFIT_CARDS_REQUIRED),
});

export type CompanySettingsFormData = yup.InferType<typeof companySettingsSchema>;
