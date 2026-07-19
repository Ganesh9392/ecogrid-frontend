import axios from "axios";

// Base URL is fully configurable via env — no hardcoded backend URL.
// Set VITE_API_BASE_URL in .env to point at your Django REST API.
const baseURL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "/api";

export const apiClient = axios.create({
  baseURL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("ecogrid_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (r) => r,
  (error) => {
    // Centralized error normalization for Django REST responses.
    const message =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      error?.message ||
      "Unexpected error";
    return Promise.reject(new Error(message));
  },
);

export const API_BASE_URL = baseURL;