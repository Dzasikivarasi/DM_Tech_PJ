import { CartItems, UpdateCartRequestData } from "../../types";
import { AppDispatch } from "../store";
import { updateCartAction } from "./cart-api";

export const updateCartItems = (
  cart: CartItems,
  updatedProducts: CartItems
): CartItems => {
  const updatedCart = [...cart];
  updatedProducts.forEach((updatedProduct) => {
    const productIndex = updatedCart.findIndex(
      (product) => product.product.id === updatedProduct.product.id
    );
    if (productIndex !== -1) {
      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        quantity: updatedProduct.quantity,
      };
    } else {
      updatedCart.push(updatedProduct);
    }
  });
  return updatedCart.filter((product) => product.quantity >= 0);
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
