import { Order } from "../../../types";
import { formatNumber } from "../../../utils";
import { consecutiveUniqueRandom } from "unique-random";
import styles from "../orders-page.module.scss";
import { useState } from "react";
import OrderDetails from "./Order-details";

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }: OrderCardProps): JSX.Element {
  const [showDetails, setShowDetails] = useState(false);
  const orderDate = new Date(order[0].createdAt).toLocaleDateString();
  const totalAmount = order.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const generateRandomOrderNum = consecutiveUniqueRandom(100000, 999999);
  const randomOrderNum = generateRandomOrderNum();

  const orderClickHandler = () => {
    setShowDetails(true);
  };

  return !showDetails ? (
    <li className={styles["orders_list-item"]} onClick={orderClickHandler}>
      <div className={styles["orders_list-item-header"]}>
        <p className={styles["orders_list-item-header-title"]}>Заказ</p>
        <p className={styles["orders_list-item-header-number"]}>
          №{randomOrderNum}
        </p>
      </div>
      <ul className={styles["orders_list-item-thumbnails"]}>
        {order.slice(0, 10).map((item) => (
          <li
            key={item.product.id}
            className={styles["orders_list-item-thumbnails-card"]}
          >
            <img
              src={item.product.picture}
              alt={`Фото товара ${item.product.title}`}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </li>
        ))}
      </ul>
      <div className={styles["orders_list-item-info"]}>
        <p className={styles["orders_list-item-info-date"]}>
          Оформлено <span>{orderDate}</span>
        </p>
        <p className={styles["orders_list-item-info-amount"]}>
          На сумму <span>{formatNumber(totalAmount)} ₽</span>
        </p>
      </div>
    </li>
  ) : (
    <OrderDetails
      order={order}
      orderNum={randomOrderNum}
      totalAmount={totalAmount}
      hideOrder={() => setShowDetails(false)}
    />
  );
}
