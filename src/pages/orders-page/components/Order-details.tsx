import styles from "../orders-page.module.scss";
import OrderInfoProduct from "./Order-info-product";

export default function OrderDetails(): JSX.Element {
  return (
    <div className={styles["order_info"]}>
      <p className={styles["order_info-header"]}>
        Заказ <span>№344299</span>
      </p>
      <ul className={styles["order_info-list"]}>
        <OrderInfoProduct />
        <OrderInfoProduct />
        <OrderInfoProduct />
      </ul>
      <div className={styles["order_info-result"]}>
        <p className={styles["order_info-result-title"]}>Итого: </p>
        <p>25 000 ₽</p>
      </div>
      <button>Повторить заказ</button>
    </div>
  );
}
