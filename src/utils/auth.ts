import { ACCESS_TOKEN_KEY } from "./constanst";
import storage from "./storage";



export const getAuthToken = (): string | null => {
  try {
    return storage.get(ACCESS_TOKEN_KEY) || null;
  } catch (error) {
    console.error("Failed to retrieve auth token:", error);
    return null;
  }
};

export const setAuthToken = (token: string): void => {
  try {
    storage.set(ACCESS_TOKEN_KEY, token);
  } catch (error) {
    console.error("Failed to set auth token:", error);
  }
};

export const removeAuthToken = (): void => {
  try {
    storage.remove(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error("Failed to remove auth token:", error);
  }
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export const clearAllAuthData = (): void => {
  try {
    storage.removeAll();
  } catch (error) {
    console.error("Failed to clear auth data:", error);
  }
};
