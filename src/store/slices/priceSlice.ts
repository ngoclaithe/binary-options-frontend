import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PriceData, PriceMap } from "../../types/price.types";

interface PriceState {
  prices: PriceMap;
  loading: boolean;
  error: string | null;
  connectedSymbols: string[];
}

const initialState: PriceState = {
  prices: {},
  loading: false,
  error: null,
  connectedSymbols: [],
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPriceUpdate: (state, action: PayloadAction<PriceData>) => {
      state.prices[action.payload.symbol] = action.payload;
    },
    setConnectedSymbols: (state, action: PayloadAction<string[]>) => {
      state.connectedSymbols = action.payload;
    },
    addConnectedSymbol: (state, action: PayloadAction<string>) => {
      if (!state.connectedSymbols.includes(action.payload)) {
        state.connectedSymbols.push(action.payload);
      }
    },
    removeConnectedSymbol: (state, action: PayloadAction<string>) => {
      state.connectedSymbols = state.connectedSymbols.filter((s) => s !== action.payload);
    },
    setPriceError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearPriceError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setPriceUpdate,
  setConnectedSymbols,
  addConnectedSymbol,
  removeConnectedSymbol,
  setPriceError,
  clearPriceError,
} = priceSlice.actions;
export default priceSlice.reducer;
