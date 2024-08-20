import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios-config";
import {
  BACKEND_URL,
  LOAD_CART_ENDPOINT,
  SUBMIT_CART_ENDPOINT,
  UPDATE_CART_ENDPOINT,
} from "../../constants";
import { CartItems, UpdateCartRequestData } from "../../types";

export const getCartAction = createAsyncThunk<CartItems>(
  "cart/loading",
  async () => {
    const response = await axiosInstance.get<CartItems>(
      `${BACKEND_URL}${LOAD_CART_ENDPOINT}`,
      {
        params: {},
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  }
);

export const updateCartAction = createAsyncThunk<
  CartItems,
  UpdateCartRequestData
>("cart/update", async (updateRequest: UpdateCartRequestData) => {
  const response = await axiosInstance.post<CartItems>(
    `${BACKEND_URL}${UPDATE_CART_ENDPOINT}`,
    { data: updateRequest },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
});

export const submitCartAction = createAsyncThunk<CartItems>(
  "cart/submit",
  async () => {
    const response = await axiosInstance.post<CartItems>(
      `${BACKEND_URL}${SUBMIT_CART_ENDPOINT}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  }
);
