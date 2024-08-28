import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios-config";
import {
  BACKEND_URL,
  GET_PRODUCTS_ENDPOINT,
  PRODUCTS_LIMIT_PER_CLICK,
} from "../../constants";
import { GetProducts, Product } from "../../types";

export const getProductsAction = createAsyncThunk<
  GetProducts,
  {
    page: number;
    search?: string;
    priceFrom?: number;
    priceTo?: number;
    ratingFrom?: number;
    context?: "displayedProducts" | "search";
  }
>(
  "products/loading",
  async ({ page, search, priceFrom, priceTo, ratingFrom }) => {
    const response = await axiosInstance.get<GetProducts>(
      `${BACKEND_URL}${GET_PRODUCTS_ENDPOINT}`,
      {
        params: {
          page,
          limit: PRODUCTS_LIMIT_PER_CLICK,
          ...(search ? { search } : {}),
          ...(priceFrom ? { priceFrom } : {}),
          ...(priceTo ? { priceTo } : {}),
          ...(ratingFrom ? { ratingFrom } : {}),
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  }
);

export const getProductByIDAction = createAsyncThunk<Product, { id: string }>(
  "product/loading",
  async ({ id }) => {
    const response = await axiosInstance.get<Product>(
      `${BACKEND_URL}${GET_PRODUCTS_ENDPOINT}/${id}`,
      {
        params: {
          id,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  }
);
