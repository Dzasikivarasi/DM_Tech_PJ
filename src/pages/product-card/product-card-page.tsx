import { useSelector } from "react-redux";
import Button from "../../components/button/button";
import Rating from "../../components/rating/rating";
import styles from "./product-card.module.scss";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AppRoute } from "../../constants";
import { formatNumber } from "../../utils";
import DOMPurify from "dompurify";

export default function ProductCardPage(): JSX.Element {
  const displayedProducts = useSelector(
    (state: RootState) => state.products.displayedProducts
  );
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = displayedProducts.find((product) => product.id === params.id);

  useEffect(() => {
    const { id } = params;
    const productExists = displayedProducts.find(
      (product) => product.id === id
    );

    if (!productExists) {
      navigate(AppRoute.NotFound);
    }
  }, [params, navigate, displayedProducts]);

  const onReturnButtonClick = () => {
    navigate(AppRoute.Products);
  };

  if (!product) {
    return <div>Загрузка...</div>;
  }
  const cleanHtml = DOMPurify.sanitize(product.description || "");

  return (
    <main className={styles["main"]}>
      <div className={styles["main_product"]}>
        <div className={styles["main_product-picture"]}>
          <img
            src={product.picture}
            alt="Фото товара"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <div className={styles["main_product-info"]}>
          <h1 className={styles["main_product-info-title"]}>{product.title}</h1>
          <Rating rating={product.rating} />
          <p className={styles["main_product-info-price"]}>
            {formatNumber(product.price)} ₽
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
        <p dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      </div>
      <div className={styles["main_return"]}>
        <Button
          className="return-btn"
          buttonText="Назад"
          buttonClickHandler={onReturnButtonClick}
        />
      </div>
    </main>
  );
}
