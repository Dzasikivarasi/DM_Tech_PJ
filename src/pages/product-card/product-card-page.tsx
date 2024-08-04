import Button from "../../components/button/button";
import Rating from "../../components/rating/rating";
import { PRODUCTS } from "../../mock-data";
import styles from "./product-card.module.scss";

export default function ProductCardPage(): JSX.Element {
  const product = PRODUCTS[0];
  return (
    <main className={styles["main"]}>
      <div className={styles["main_product"]}>
        <div className={styles["main_product-picture"]}>
          <img src={product.picture} alt="Фото товара" />
        </div>
        <div className={styles["main_product-info"]}>
          <h1 className={styles["main_product-info-title"]}>{product.title}</h1>
          <Rating rating={product.rating} />
          <p className={styles["main_product-info-price"]}>
            {Math.ceil(product.price)} ₽
          </p>
          <Button className="submit-btn" buttonText="Добавить в корзину" />
          <div className={styles["main_product-info-return"]}>
            <p className={styles["main_product-info-return-title"]}>
              Условия возврата
            </p>
            <p className={styles["main_product-info-return-conditions"]}>
              Обменять или вернуть товар надлежащего качества можно в течение 14
              дней с момента покупки.
            </p>
          </div>
          <p className={styles["main_product-info-prices"]}>
            Цены в интернет-магазине могут отличаться от розничных магазинов.
          </p>
        </div>
      </div>
      <div className={styles["main_description"]}>
        <h2>Описание</h2>
        <p>{product.description}</p>
      </div>
      <div className={styles["main_return"]}>
        <Button className="return-btn" buttonText="Назад" />
      </div>
    </main>
  );
}
