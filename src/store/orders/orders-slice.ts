import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { LOAD_ERROR } from "../../constants";
import { Orders, ProductsMeta } from "../../types";
import { getOrdersAction } from "./orders-api";

interface OrdersInitialStateType {
  orders: Orders;
  meta: ProductsMeta | null;
  loading: boolean;
}

const initialState: OrdersInitialStateType = {
  orders: [],
  meta: null,
  loading: true,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.meta = action.payload.meta;
        console.log("Страница:", action.payload.meta);
        state.orders = action.payload.data;
        console.log("Заказы", action.payload.data);
      })
      .addCase(getOrdersAction.rejected, (state) => {
        state.loading = false;
        toast(LOAD_ERROR);
      });
  },
});

export type { OrdersInitialStateType };
export default ordersSlice.reducer;
