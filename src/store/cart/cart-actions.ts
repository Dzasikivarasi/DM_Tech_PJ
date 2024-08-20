import { CartItems, UpdateCartRequestData } from "../../types";
import { AppDispatch } from "../store";
import { updateCartAction } from "./cart-api";

export const updateCartItems = (
  cart: CartItems,
  updatedProduct: CartItems[number]
): CartItems => {
  const productExists = cart.some(
    (product) => product.product.id === updatedProduct.product.id
  );

  if (productExists) {
    return cart
      .map((product) =>
        product.product.id === updatedProduct.product.id
          ? { ...product, quantity: updatedProduct.quantity }
          : product
      )
      .filter((product) => product.quantity >= 0);
  } else {
    return [...cart, updatedProduct];
  }
};

export const updateCart = (
  dispatch: AppDispatch,
  id: string,
  quantity: number,
  isFromCartPage: boolean
) => {
  if (quantity === 0 && isFromCartPage) {
    return dispatch(updateCartAction([{ id, quantity: 0 }]));
  } else {
    if (quantity === 0) {
      return dispatch(updateCartAction([{ id, quantity: -1 }]));
    } else {
      const newProduct: UpdateCartRequestData = [
        {
          id,
          quantity,
        },
      ];
      return dispatch(updateCartAction(newProduct));
    }
  }
};
