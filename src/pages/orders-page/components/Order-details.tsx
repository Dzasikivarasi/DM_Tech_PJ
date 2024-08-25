import styles from "../orders-page.module.scss";
import Button from "../../../components/button/Button";
import OrderInfoProduct from "./Order-info-product";
import { useDispatch } from "react-redux";
import { Order, UpdateCartRequestData } from "../../../types";
import { formatNumber } from "../../../utils";
import { AppDispatch } from "../../../store/store";
import { updateCartAction } from "../../../store/cart/cart-api";
import { toast } from "react-toastify";

type OrderDetailsProps = {
  order: Order;
  orderNum: number;
  totalAmount: number;
  hideOrder: () => void;
};

export default function OrderDetails({
  order,
  orderNum,
  totalAmount,
  hideOrder,
}: OrderDetailsProps): JSX.Element {
  const dispatch: AppDispatch = useDispatch();

  const copyOrder = (): void => {
    const finalCart: UpdateCartRequestData = [];
    order.forEach((product) => {
      finalCart.push({
        id: product.product.id,
        quantity: product.quantity,
      });
    });
    dispatch(updateCartAction(finalCart));
    toast.success("Заказ скопирован в корзину");
  };

  const onCopyOrderClick = (): void => {
    copyOrder();
  };

  return (
    <div className={styles["order_info"]}>
      <p className={styles["order_info-header"]}>
        Заказ <span>№{orderNum}</span>
      </p>
      <ul className={styles["order_info-list"]}>
        {order.map((product) => (
          <OrderInfoProduct key={product.product.id} product={product} />
        ))}
      </ul>
      <div className={styles["order_info-result"]}>
        <p className={styles["order_info-result-title"]}>Итого: </p>
        <p>{formatNumber(totalAmount)}₽</p>
      </div>
      <Button
        className="submit-btn"
        buttonText="Повторить заказ"
        buttonClickHandler={onCopyOrderClick}
      />
      <img
        className={styles["order_info-close"]}
        src="/img/icons-svg/close.svg"
        alt="Закрыть"
        onClick={hideOrder}
      />
    </div>
  );
}
