export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email address",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_INVALID: "Please enter a valid password",
  
  COMPANY_NAME_REQUIRED: "Company name is required",
  COMPANY_NAME_MIN: "Company name must be at least 2 characters",
  COMPANY_NAME_MAX: "Company name must not exceed 100 characters",
  
  TAGLINE_MAX: "Tagline must not exceed 200 characters",
  
  URL_INVALID: "Please enter a valid URL",
  
  PRIMARY_COLOR_REQUIRED: "Primary color is required",
  PRIMARY_COLOR_INVALID: "Please enter a valid hex color",
  
  SECTION_TITLE_REQUIRED: "Section title is required",
  SECTION_TITLE_MIN: "Title must be at least 3 characters",
  SECTION_TITLE_MAX: "Title must not exceed 500 characters",
  
  SECTION_CONTENT_REQUIRED: "Section content is required",
  SECTION_CONTENT_MIN: "Content must be at least 10 characters",
  SECTION_CONTENT_MAX: "Content must not exceed 1000 characters",
  
  BENEFIT_TITLE_REQUIRED: "Benefit title is required",
  BENEFIT_TITLE_MIN: "Title must be at least 3 characters",
  BENEFIT_TITLE_MAX: "Title must not exceed 100 characters",
  
  BENEFIT_DESCRIPTION_REQUIRED: "Benefit description is required",
  BENEFIT_DESCRIPTION_MIN: "Description must be at least 10 characters",
  BENEFIT_DESCRIPTION_MAX: "Description must not exceed 200 characters",
  
  BENEFIT_CARDS_REQUIRED: "Benefit cards are required",
  BENEFIT_CARDS_EXACT: "Please add exactly 3 benefit cards",
} as const;
