import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./process-slice";
import CartReducer from "./cart/cart-slice";

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: CartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
