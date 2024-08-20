import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updateCount } from "../../utils";
import Button from "../button/Button";
import styles from "./cart-widget.module.scss";
import { updateCart } from "../../store/cart/cart-actions";
import { MAX_PRODUCT_QUANTITY, MIN_PRODUCT_QUANTITY } from "../../constants";

type CartWidgetProps = {
  id: string;
  quantity: number;
  confirmedDelete?: boolean;
  isFromCartPage: boolean;
};

export default function CartWidget({
  id,
  quantity,
  isFromCartPage,
}: CartWidgetProps): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const isDecrementDisabled = quantity <= MIN_PRODUCT_QUANTITY;
  const isIncrementDisabled = quantity >= MAX_PRODUCT_QUANTITY;

  const onDecrementButtonClick = () => {
    const newQuantity = updateCount(quantity, "decrement");
    updateCart(dispatch, id, newQuantity, isFromCartPage);
  };

  const onIncrementButtonClick = () => {
    const newQuantity = updateCount(quantity, "increment");
    updateCart(dispatch, id, newQuantity, isFromCartPage);
  };

  return (
    <div className={styles["cart-widget"]}>
      <Button
        className="cart-widget-btn-left"
        buttonText={"-"}
        buttonClickHandler={onDecrementButtonClick}
        disabled={isDecrementDisabled}
      />
      <div className={styles["cart-widget-count"]}>{quantity}</div>
      <Button
        className="cart-widget-btn-right"
        buttonText={"+"}
        buttonClickHandler={onIncrementButtonClick}
        disabled={isIncrementDisabled}
      />
    </div>
  );
}
