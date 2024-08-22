import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios-config";
import {
  BACKEND_URL,
  GET_ORDERS_ENDPOINT,
  ORDERS_LIMIT_PER_CLICK,
} from "../../constants";
import { GetOrders } from "../../types";

export const getOrdersAction = createAsyncThunk<GetOrders, { page: number }>(
  "orders/loading",
  async ({ page }) => {
    const response = await axiosInstance.get<GetOrders>(
      `${BACKEND_URL}${GET_ORDERS_ENDPOINT}`,
      {
        params: {
          page,
          limit: ORDERS_LIMIT_PER_CLICK,
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
