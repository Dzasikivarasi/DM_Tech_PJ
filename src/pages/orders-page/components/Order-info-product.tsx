import { Link } from "react-router-dom";
import styles from "../orders-page.module.scss";

export default function OrderInfoProduct(): JSX.Element {
  return (
    <li className={styles["order_info-list-item"]}>
      <Link to="">
        <div className={styles["order_info-list-item-picture"]}>
          <img
            src={"/img/no-picture.jpg"}
            alt="Фото товара"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      </Link>
      <p className={styles["order_info-list-item-title"]}>Куртка Futurino</p>
      <p className={styles["order_info-list-item-count"]}>1 299 ₽ * 12 шт.</p>
      <p className={styles["order_info-list-item-price"]}>5 000 ₽</p>
    </li>
  );
}
