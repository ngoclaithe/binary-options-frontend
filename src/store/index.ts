import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import priceReducer from "./slices/priceSlice";
import tradingReducer from "./slices/tradingSlice";
import walletReducer from "./slices/walletSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    price: priceReducer,
    trading: tradingReducer,
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
