import { API_ENDPOINTS } from "../constants/api.constants";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}${API_ENDPOINTS.AUTH.LOGIN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function registerUser(
  email: string,
  password: string,
  name: string
) {
  const res = await fetch(`${API_BASE}${API_ENDPOINTS.AUTH.REGISTER}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}${API_ENDPOINTS.AUTH.ME}`, {
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.user || data;
}

export async function logoutUser() {
  const res = await fetch(`${API_BASE}${API_ENDPOINTS.AUTH.LOGOUT}`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp;

    if (!exp) return false;
    return exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
}

export function getTokenFromCookie(name: string = "token"): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts[1].split(";")[0];
  return null;
}
