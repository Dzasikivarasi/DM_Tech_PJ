import { createSlice } from "@reduxjs/toolkit";
import { Filter, Product, Products } from "../../types";
import { toast } from "react-toastify";
import { LOAD_ERROR } from "../../constants";
import { getProductByIDAction, getProductsAction } from "./products-api";

interface ProductsInitialStateType {
  products: Products;
  product: Product | null;
  displayedProducts: Products;
  loading: boolean;
  productsInCartCount: number;
  searchRequest: string;
  searchResults: Products;
  searchLoader: boolean;
  filters: Filter;
}

const initialState: ProductsInitialStateType = {
  products: [],
  product: null,
  displayedProducts: [],
  loading: true,
  productsInCartCount: 0,
  searchRequest: "",
  searchResults: [],
  searchLoader: false,
  filters: {
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
  },
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
    updateSearchRequestValue: (state, action) => {
      state.searchRequest = action.payload;
    },
    dropFilters: (state) => {
      state.filters = initialState.filters;
    },
    updateFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAction.pending, (state, action) => {
        const { context } = action.meta.arg;
        if (context === "displayedProducts") {
          state.loading = true;
        } else if (context === "search") {
          state.searchLoader = true;
        }
      })
      .addCase(getProductsAction.fulfilled, (state, action) => {
        state.loading = false;
        const { context } = action.meta.arg;
        if (context === "displayedProducts") {
          state.products = action.payload.data;
        } else if (context === "search") {
          state.searchResults = action.payload.data;
        }
      })
      .addCase(getProductsAction.rejected, (state, action) => {
        const { context } = action.meta.arg;
        if (context === "displayedProducts") {
          state.loading = false;
        } else if (context === "search") {
          state.searchLoader = false;
        }
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
  updateSearchRequestValue,
  dropFilters,
  updateFilters,
} = productsSlice.actions;
export type { ProductsInitialStateType };
export default productsSlice.reducer;
