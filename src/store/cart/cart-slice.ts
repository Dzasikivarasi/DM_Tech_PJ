import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CartItems } from "../../types";
import { getCartAction, submitCartAction, updateCartAction } from "./cart-api";
import { LOAD_ERROR } from "../../constants";
import { updateCartItems } from "./cart-actions";
import {
  initLocalStorageCart,
  saveCartToLocalStorage,
} from "../../services/localStorage-data";

interface CartInitialStateType {
  cart: CartItems;
  loading: boolean;
}

const initialState: CartInitialStateType = {
  cart: initLocalStorageCart(),
  loading: true,
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
        const updatedProducts = action.payload;
        state.cart = updateCartItems(state.cart, updatedProducts);
        saveCartToLocalStorage(state.cart);
      })
      .addCase(updateCartAction.rejected, (state) => {
        state.loading = false;
        toast(LOAD_ERROR);
      })
      .addCase(submitCartAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitCartAction.fulfilled, (state) => {
        state.loading = false;
        state.cart = [];
        saveCartToLocalStorage(state.cart);
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
