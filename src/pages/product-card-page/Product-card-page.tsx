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
import { updateCart } from "../../store/cart/cart-actions";

export default function ProductCardPage(): JSX.Element {
  const displayedProducts = useSelector(
    (state: RootState) => state.products.displayedProducts
  );
  const productsInCart = useSelector((state: RootState) => state.cart.cart);
  const isLoading = useSelector((state: RootState) => state.cart.loading);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = displayedProducts.find((product) => product.id === params.id);
  const quantity = productsInCart.find(
    (product) => product.product.id === params.id
  )?.quantity;
  const productExistsInCart = productsInCart.some(
    (cartItem) => cartItem.product.id === params.id
  );
  const dispatch: AppDispatch = useDispatch();

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
    if (!params.id) return;
    const id = params.id;
    const currentQuantity = quantity || 0;
    updateCart(dispatch, id, currentQuantity + 1, false);
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
          {productExistsInCart && quantity && quantity > 0 ? (
            <div className={styles["main_product-info-widget"]}>
              <CartWidget
                quantity={quantity}
                id={product.id}
                isFromCartPage={false}
              />
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
              disabled={isLoading}
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
