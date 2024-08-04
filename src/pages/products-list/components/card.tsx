import Rating from "../../../components/rating/rating";
import { Product } from "../../../types";
import styles from "../products.module.scss";

type CardProps = {
  product: Product;
};

export default function Card({ product }: CardProps): JSX.Element {
  return (
    <li className={styles["main_products-card"]}>
      <div className={styles["main_products-card-picture"]}>
        <img src={product.picture} alt="Фото товара" />
      </div>
      <p className={styles["main_products-card-name"]}>{product.title}</p>
      <Rating rating={product.rating} />
      <p className={styles["main_products-card-price"]}>
        {Math.ceil(product.price)} ₽
      </p>
    </li>
  );
}
