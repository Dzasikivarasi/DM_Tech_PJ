import { useNavigate } from "react-router-dom";
import styles from "../orders-page.module.scss";
import { CartItem } from "../../../types";
import { formatNumber } from "../../../utils";
import { AppRoute } from "../../../constants";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { getProductByIDAction } from "../../../store/products/products-api";

type OrderInfoProductProps = {
  product: CartItem;
};

export default function OrderInfoProduct({
  product,
}: OrderInfoProductProps): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const onLoadProductClick = async () => {
    await dispatch(getProductByIDAction({ id: product.product.id }));
    navigate(`${AppRoute.Products}/${product.product.id}`);
  };

  return (
    <li className={styles["order_info-list-item"]}>
      <div className={styles["order_info-list-item-picture"]}>
        <img
          src={product.product.picture}
          alt="Фото товара"
          onClick={onLoadProductClick}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
      <p className={styles["order_info-list-item-title"]}>
        {product.product.title}
      </p>
      <p className={styles["order_info-list-item-count"]}>
        {formatNumber(product.product.price)} ₽ * {product.quantity} шт.
      </p>
      <p className={styles["order_info-list-item-price"]}>
        {formatNumber(product.product.price)} ₽
      </p>
    </li>
  );
}
