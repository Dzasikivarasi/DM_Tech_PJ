import { CartItems } from "../types";

export const initLocalStorageCart = (): CartItems => {
  const savedCart = localStorage.getItem("LOCAL_CART");
  return savedCart ? JSON.parse(savedCart) : [];
};

export const saveCartToLocalStorage = (cart: CartItems): void => {
  localStorage.setItem("LOCAL_CART", JSON.stringify(cart));
};
