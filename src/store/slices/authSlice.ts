import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User, LoginPayload, RegisterPayload } from "../../types/auth.types";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { getAuthHeaders } from "../../lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: "POST",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || "Login failed");
      }

      const data = await res.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}${API_ENDPOINTS.AUTH.REGISTER}`, {
        method: "POST",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || "Registration failed");
      }

      const data = await res.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}${API_ENDPOINTS.AUTH.ME}`, {
        credentials: "include",
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        return rejectWithValue("Not authenticated");
      }

      const data = await res.json();
      return data.user || data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await fetch(`${API_BASE}${API_ENDPOINTS.AUTH.LOGOUT}`, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
      state.isAuthenticated = false;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });

    // Fetch Current User
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    });

    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
