import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./products/products-slice";
import CartReducer from "./cart/cart-slice";
import OrdersReducer from "./orders/orders-slice";

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: CartReducer,
    orders: OrdersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
