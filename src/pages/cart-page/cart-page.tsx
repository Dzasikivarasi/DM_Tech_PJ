import styles from "./cart-page.module.scss";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import EmptyCart from "./components/Empty-cart";
import CartProduct from "./components/Cart-product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { formatNumber } from "../../utils";
import { submitCartAction, updateCartAction } from "../../store/cart/cart-api";
import { CartItems, UpdateCartRequestData } from "../../types";
import { toast } from "react-toastify";

export default function CartPage(): JSX.Element {
  const productsInCart = useSelector((state: RootState) => state.cart.cart);
  const loadingStatus = useSelector((state: RootState) => state.cart.loading);
  const [initialLoad, setInitialLoad] = useState(true);
  const showLoader = initialLoad && loadingStatus;
  const finalSum = productsInCart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const filterProductsForSubmit = (cartItems: CartItems): CartItems => {
    return cartItems.filter((item) => item.quantity > 0);
  };

  const onSubmitButtonClick = async () => {
    const finalCart: UpdateCartRequestData = [];
    filterProductsForSubmit(productsInCart).forEach((product) => {
      finalCart.push({
        id: product.product.id,
        quantity: product.quantity,
      });
    });

    if (finalCart.length > 0) {
      try {
        await dispatch(updateCartAction(finalCart));
        await dispatch(submitCartAction());
      } catch (error) {
        toast.error("Возникла ошибка при оформлении заказа.");
      }
    } else {
      toast.warning("В корзине нет товаров для отправки");
    }
  };

  return (
    <div className={styles["cart"]}>
      {showLoader ? (
        <Loader />
      ) : productsInCart && productsInCart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <ul className={styles["cart_products"]}>
            {productsInCart.map((product) => (
              <CartProduct key={product.product.id} product={product} />
            ))}
          </ul>
          <div className={styles["cart_result"]}>
            <p className={styles["cart_result-title"]}>Итого: </p>
            <p>{formatNumber(finalSum)} ₽</p>
          </div>
          <Button
            className="submit-btn"
            buttonText={"Оформить заказ"}
            buttonClickHandler={onSubmitButtonClick}
          />
        </>
      )}
    </div>
  );
}
