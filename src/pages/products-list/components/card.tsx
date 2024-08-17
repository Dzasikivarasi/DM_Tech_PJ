import { Link } from "react-router-dom";
import Rating from "../../../components/rating/rating";
import { AppRoute } from "../../../constants";
import { Product } from "../../../types";
import { formatNumber } from "../../../utils";
import styles from "../products.module.scss";

type CardProps = {
  product: Product;
};

export default function Card({ product }: CardProps): JSX.Element {
  return (
    <Link
      to={`${AppRoute.Products}/${product.id}`}
      className={styles["main_products-card"]}
    >
      <li>
        <div className={styles["main_products-card-picture"]}>
          <img
            src={product.picture}
            alt="Фото товара"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <p className={styles["main_products-card-name"]}>{product.title}</p>
        <Rating rating={product.rating} />
        <p className={styles["main_products-card-price"]}>
          {formatNumber(product.price)} ₽
        </p>
      </li>
    </Link>
  );
}
