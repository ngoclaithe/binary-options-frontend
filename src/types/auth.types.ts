export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  fullName?: string;
  phone?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
