import { createSlice } from "@reduxjs/toolkit";
import { Products, ProductsMeta } from "../types";
import { toast } from "react-toastify";
import { LOAD_ERROR } from "../constants";
import { getProductsAction } from "./process-api";

interface ProductsInitialStateType {
  products: Products;
  loading: boolean;
  meta: ProductsMeta;
}

const initialState: ProductsInitialStateType = {
  products: [],
  loading: true,
  meta: {
    count: 0,
    total: 0,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.meta.count = action.payload.meta.count;
        state.meta.total = action.payload.meta.total;
      })
      .addCase(getProductsAction.rejected, (state) => {
        state.loading = false;
        toast(LOAD_ERROR);
      });
  },
});

export type { ProductsInitialStateType };
export default productsSlice.reducer;
