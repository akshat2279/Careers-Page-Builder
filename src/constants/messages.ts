export const ERROR_MESSAGES = {
  COMPANY_NOT_FOUND: "Company not found",
  FAILED_TO_LOAD: "Failed to load company data",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  INVALID_SLUG: "Invalid company identifier",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
} as const;

export const LOADING_MESSAGES = {
  LOADING: "Loading...",
  LOADING_PREVIEW: "Loading preview...",
  LOADING_COMPANY: "Loading company information...",
} as const;

export const SUCCESS_MESSAGES = {
  SETTINGS_SAVED: "Company settings saved successfully!",
} as const;
