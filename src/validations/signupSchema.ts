import { EMAIL_ADDRESS_VALIDATION, PASSWORD_REGEX } from "@/utils/constanst";
import { VALIDATION_MESSAGES } from "@/constants/validationMessages";
import * as yup from "yup";

export const signupSchema = yup.object({
  companyName: yup
    .string()
    .trim()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  email: yup
    .string()
    .trim()
    .required(VALIDATION_MESSAGES.EMAIL_REQUIRED)
    .matches(EMAIL_ADDRESS_VALIDATION, VALIDATION_MESSAGES.EMAIL_INVALID),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.PASSWORD_REQUIRED)
    .matches(PASSWORD_REGEX, VALIDATION_MESSAGES.PASSWORD_INVALID),
});
