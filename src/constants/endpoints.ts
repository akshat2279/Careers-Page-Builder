export const endpoints = {
  auth: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
  },
  company: {
    GET_BY_SLUG: (slug: string) => `/api/company/${slug}`,
    SETTINGS: "/api/company/settings",
  },
} as const;

export default endpoints;
