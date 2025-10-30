import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { TradingState, Order, Asset } from "../../types/trading.types";
import { API_ENDPOINTS } from "../../constants/api.constants";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const fetchAssets = createAsyncThunk(
  "trading/fetchAssets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}${API_ENDPOINTS.TRADING.ASSETS}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch assets");
      const data = await res.json();
      return data.assets || data || [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "trading/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}${API_ENDPOINTS.TRADING.ORDERS}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      return data.orders || data || [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "trading/createOrder",
  async (payload: Omit<Order, "id" | "createdAt" | "status">, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}${API_ENDPOINTS.TRADING.CREATE_ORDER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create order");
      const data = await res.json();
      return data.order || data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: TradingState = {
  orders: [],
  assets: [],
  loading: false,
  error: null,
};

const tradingSlice = createSlice({
  name: "trading",
  initialState,
  reducers: {
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: Order["status"] }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Assets
    builder.addCase(fetchAssets.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAssets.fulfilled, (state, action) => {
      state.loading = false;
      state.assets = action.payload;
    });
    builder.addCase(fetchAssets.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });

    // Fetch Orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });

    // Create Order
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders.push(action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });
  },
});

export const { updateOrderStatus, clearError } = tradingSlice.actions;
export default tradingSlice.reducer;
