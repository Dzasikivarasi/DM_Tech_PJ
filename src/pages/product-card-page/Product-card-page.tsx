import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/Button";
import Rating from "../../components/rating/Rating";
import styles from "./product-card.module.scss";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AppRoute } from "../../constants";
import { formatNumber } from "../../utils";
import DOMPurify from "dompurify";
import CartWidget from "../../components/cart-widget/Cart-widget";
import { updateProductsInCartCount } from "../../store/process-slice";

export default function ProductCardPage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const displayedProducts = useSelector(
    (state: RootState) => state.products.displayedProducts
  );
  const productsInCartCount = useSelector(
    (state: RootState) => state.products.productsInCartCount
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

  const onAddButtonClick = () => {
    dispatch(updateProductsInCartCount(1));
  };

  const onCreateOrderClick = () => {
    navigate(AppRoute.Cart);
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
          {productsInCartCount && productsInCartCount > 0 ? (
            <div className={styles["main_product-info-widget"]}>
              <CartWidget />
              <Button
                className="submit-btn"
                buttonText="Оформить заказ"
                buttonClickHandler={onCreateOrderClick}
              />
            </div>
          ) : (
            <Button
              className="submit-btn"
              buttonText="Добавить в корзину"
              buttonClickHandler={onAddButtonClick}
            />
          )}

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
