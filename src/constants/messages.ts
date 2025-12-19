export const ERROR_MESSAGES = {
  COMPANY_NOT_FOUND: "Company not found",
  FAILED_TO_LOAD: "Failed to load company data",
  FAILED_TO_FETCH_COMPANY: "Failed to fetch company data",
  FAILED_TO_FETCH_JOBS: "Failed to fetch jobs",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  INVALID_SLUG: "Invalid company identifier",
  SOMETHING_WENT_WRONG: "Something went wrong",
  COMPANY_NAME_REQUIRED: "Company name is required",
  MISSING_CREDENTIALS: "Missing credentials",
  INVALID_CREDENTIALS: "Invalid email or password",
  MISSING_REQUIRED_FIELDS: "Missing required fields",
  USER_ALREADY_EXISTS: "User with this email already exists",
  COMPANY_ALREADY_EXISTS: "Company with this name already exists",
  UNAUTHORIZED: "Unauthorized",
  INVALID_TOKEN: "Invalid token",
} as const;

export const LOADING_MESSAGES = {
  LOADING: "Loading...",
  LOADING_PREVIEW: "Loading preview...",
  LOADING_COMPANY: "Loading company information...",
} as const;

export const SUCCESS_MESSAGES = {
  SETTINGS_SAVED: "Company settings saved successfully!",
  SETTINGS_UPDATED: "Company settings updated successfully",
  SIGNUP_SUCCESS: "Account created successfully",
} as const;

export const JOB_FILTER_OPTIONS = {
  LOCATIONS: [
    "All Locations",
    "Berlin, Germany",
    "Dubai, United Arab Emirates",
    "Bangalore, India",
    "Boston, United States",
    "London, England, United Kingdom",
  ],
  JOB_TYPES: [
    "All Job Types",
    "Tech",
    "Non-Tech",
    "Management",
    "Design",
  ],
  SORT_OPTIONS: [
    { label: "Latest Jobs", value: "true" },
    { label: "Oldest Jobs", value: "false" },
  ],
} as const;
