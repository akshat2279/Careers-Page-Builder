import * as yup from "yup";
import { loginSchema } from "@/validations/loginSchema";
import { signupSchema } from "@/validations/signupSchema";

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signupSchema>;
