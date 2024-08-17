import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateCount } from "../../utils";
import Button from "../button/Button";
import styles from "./cart-widget.module.scss";
import { updateProductsInCartCount } from "../../store/process-slice";

// type CartWidget = {
//   productsInCart: number;
// };

export default function CartWidget(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const productsInCartCount = useSelector(
    (state: RootState) => state.products.productsInCartCount
  );
  const onDecrementButtonClick = () => {
    const newCount = updateCount(productsInCartCount, "decrement");
    dispatch(updateProductsInCartCount(newCount));
  };

  const onIncrementButtonClick = () => {
    const newCount = updateCount(productsInCartCount, "increment");
    dispatch(updateProductsInCartCount(newCount));
  };

  return (
    <div className={styles["cart-widget"]}>
      <Button
        className="cart-widget-btn-left"
        buttonText={"-"}
        buttonClickHandler={onDecrementButtonClick}
      />
      <div className={styles["cart-widget-count"]}>{productsInCartCount}</div>
      <Button
        className="cart-widget-btn-right"
        buttonText={"+"}
        buttonClickHandler={onIncrementButtonClick}
      />
    </div>
  );
}
