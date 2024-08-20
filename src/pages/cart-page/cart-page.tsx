import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import styles from "./cart-page.module.scss";
import Button from "../../components/button/Button";
import CartProduct from "./Cart-product";
import Loader from "../../components/loader/Loader";
import { useEffect, useState } from "react";
import EmptyCart from "./Empty-cart";
import { formatNumber } from "../../utils";
import { submitCartAction } from "../../store/cart/cart-api";

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
    console.log(productsInCart);
  }, []);

  const onSubmitButtonClick = () => {
    dispatch(submitCartAction());
    console.log("оформление заказа");
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
