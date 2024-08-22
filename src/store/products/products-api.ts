import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios-config";
import {
  BACKEND_URL,
  GET_PRODUCTS_ENDPOINT,
  PRODUCTS_LIMIT_PER_CLICK,
} from "../../constants";
import { GetProducts } from "../../types";

export const getProductsAction = createAsyncThunk<
  GetProducts,
  { page: number }
>("products/loading", async ({ page }) => {
  const response = await axiosInstance.get<GetProducts>(
    `${BACKEND_URL}${GET_PRODUCTS_ENDPOINT}`,
    {
      params: {
        page,
        limit: PRODUCTS_LIMIT_PER_CLICK,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
});
