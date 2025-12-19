import axios from "axios";
import { getAuthToken, removeAuthToken } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// HTTP Methods
export async function get<T, P = unknown>(url: string, params?: P): Promise<T> {
  const response = await http.get<T>(url, { params });
  return response.data;
}

export async function post<T, D = unknown, P = unknown>(
  url: string,
  data?: D,
  params?: P
): Promise<T> {
  const response = await http.post<T>(url, data, { params });
  return response.data;
}

export async function put<T, D = unknown, P = unknown>(
  url: string,
  data?: D,
  params?: P
): Promise<T> {
  const response = await http.put<T>(url, data, { params });
  return response.data;
}

export default http;
