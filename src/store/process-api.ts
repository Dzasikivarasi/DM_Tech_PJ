import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios-config";
import {
  BACKEND_URL,
  GET_PRODUCTS_ENDPOINT,
  PRODUCTS_LIMIT_PER_CLICK,
} from "../constants";
import { GetProducts } from "../types";

// export const getProductsAction = createAsyncThunk<Products>(
//   "products/getProducts",
//   async () => {
//     const response = await axiosInstance.get<Products>(
//       `${BACKEND_URL}${GET_PRODUCTS_ENDPOINT}`
//     );
//     return response.data;
//   }
// );

export const getProductsAction = createAsyncThunk<GetProducts>(
  "products/loading",
  async () => {
    const response = await axiosInstance.get<GetProducts>(
      `${BACKEND_URL}${GET_PRODUCTS_ENDPOINT}`,
      {
        params: {
          page: 1,
          limit: PRODUCTS_LIMIT_PER_CLICK,
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
