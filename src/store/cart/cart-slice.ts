import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CartItems } from "../../types";
import { getCartAction, submitCartAction, updateCartAction } from "./cart-api";
import { LOAD_ERROR } from "../../constants";
import { updateCartItems } from "./cart-actions";

interface CartInitialStateType {
  cart: CartItems;
  loading: boolean;
  orders: CartItems;
}

const initialState: CartInitialStateType = {
  cart: [],
  loading: true,
  orders: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        console.log("Cart loaded successfully:", action.payload);
      })
      .addCase(getCartAction.rejected, (state) => {
        state.loading = false;
        toast(LOAD_ERROR);
      })
      .addCase(updateCartAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartAction.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload[0];
        state.cart = updateCartItems(state.cart, updatedProduct);
        console.log("Cart loaded successfully:", state.cart);
      })
      .addCase(updateCartAction.rejected, (state) => {
        state.loading = false;
        toast(LOAD_ERROR);
      })
      .addCase(submitCartAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.cart = [];
        console.log("order loaded successfully:", action.payload);
        toast.success("Заказ создан");
      })
      .addCase(submitCartAction.rejected, (state) => {
        state.loading = false;
        toast.error("Ошибка при оформлении заказа");
      });
  },
});

export type { CartInitialStateType };
export default cartSlice.reducer;
