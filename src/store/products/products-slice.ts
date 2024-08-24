import { createSlice } from "@reduxjs/toolkit";
import { Product, Products } from "../../types";
import { toast } from "react-toastify";
import { LOAD_ERROR } from "../../constants";
import { getProductByIDAction, getProductsAction } from "./products-api";

interface ProductsInitialStateType {
  products: Products;
  product: Product | null;
  displayedProducts: Products;
  loading: boolean;
  productsInCartCount: number;
}

const initialState: ProductsInitialStateType = {
  products: [],
  product: null,
  displayedProducts: [],
  loading: true,
  productsInCartCount: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateDisplayedProducts: (state, action) => {
      state.displayedProducts = [...state.displayedProducts, ...action.payload];
    },
    dropDisplayedProducts: (state, action) => {
      state.displayedProducts = action.payload;
    },
    updateProductsInCartCount: (state, action) => {
      state.productsInCartCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(getProductsAction.rejected, (state) => {
        state.loading = false;
        toast(LOAD_ERROR);
      })
      .addCase(getProductByIDAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByIDAction.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductByIDAction.rejected, (state) => {
        state.loading = false;
        toast(LOAD_ERROR);
      });
  },
});

export const {
  updateDisplayedProducts,
  dropDisplayedProducts,
  updateProductsInCartCount,
} = productsSlice.actions;
export type { ProductsInitialStateType };
export default productsSlice.reducer;
