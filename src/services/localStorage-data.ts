import { CartItems, Orders } from "../types";

export const initLocalStorageCart = (): CartItems => {
  const savedCart = localStorage.getItem("LOCAL_CART");
  return savedCart ? JSON.parse(savedCart) : [];
};

export const saveCartToLocalStorage = (cart: CartItems): void => {
  localStorage.setItem("LOCAL_CART", JSON.stringify(cart));
};

export const initLocalStorageOrders = (): Orders => {
  const savedOrders = localStorage.getItem("LOCAL_ORDERS");
  return savedOrders ? JSON.parse(savedOrders) : [];
};

export const saveOrdersToLocalStorage = (orders: Orders): void => {
  localStorage.setItem("LOCAL_ORDERS", JSON.stringify(orders));
};
