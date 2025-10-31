import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { WalletState, Transaction } from "../../types/wallet.types";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { getAuthHeaders } from "../../lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const fetchBalance = createAsyncThunk(
  "wallet/fetchBalance",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}${API_ENDPOINTS.WALLET.BALANCE}`, {
        credentials: "include",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch balance");
      const data = await res.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "wallet/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}${API_ENDPOINTS.WALLET.TRANSACTIONS}`, {
        credentials: "include",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      return data.transactions || data || [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: WalletState = {
  balance: 0,
  currency: "USD",
  transactions: [],
  loading: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Balance
    builder.addCase(fetchBalance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.balance = action.payload.balance;
      state.currency = action.payload.currency || "USD";
    });
    builder.addCase(fetchBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });

    // Fetch Transactions
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });
  },
});

export const { updateBalance, addTransaction, clearError } = walletSlice.actions;
export default walletSlice.reducer;
