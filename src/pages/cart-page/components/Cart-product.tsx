import styles from "../cart-page.module.scss";
import Button from "../../../components/button/Button";
import CartWidget from "../../../components/cart-widget/Cart-widget";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppRoute } from "../../../constants";
import { updateCart } from "../../../store/cart/cart-actions";
import { AppDispatch } from "../../../store/store";
import { CartItem } from "../../../types";
import { formatNumber } from "../../../utils";

type CartProductProps = {
  product: CartItem;
};

export default function CartProduct({
  product,
}: CartProductProps): JSX.Element {
  const finalProductSum = product.product.price * product.quantity;
  const dispatch: AppDispatch = useDispatch();

  const onDeleteButtonClick = (): void => {
    updateCart(dispatch, product.product.id, -1, true);
  };

  return (
    <li className={styles["cart_products-item"]} key={product.product.id}>
      <Link to={`${AppRoute.Products}/${product.product.id}`}>
        <div className={styles["cart_products-item-picture"]}>
          <img
            src={product.product.picture}
            alt="Фото товара"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      </Link>
      <p className={styles["cart_products-item-title"]}>
        {product.product.title}
      </p>
      <div className={styles["cart_products-item-count"]}>
        <CartWidget
          quantity={product.quantity}
          id={product.product.id}
          isFromCartPage={true}
        />
      </div>
      {product.quantity === 0 ? (
        <Button
          className="cart_delete-btn"
          buttonText="Удалить"
          buttonClickHandler={onDeleteButtonClick}
        />
      ) : (
        <div className={styles["cart_products-item-price"]}>
          {product.quantity > 1 && (
            <p className={styles["cart_products-item-price-perone"]}>
              {formatNumber(product.product.price)} ₽ за шт.
            </p>
          )}
          <p className={styles["cart_products-item-price-sum"]}>
            {formatNumber(finalProductSum)} ₽
          </p>
        </div>
      )}
    </li>
  );
}
