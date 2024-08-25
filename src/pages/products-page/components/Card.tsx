import styles from "../products.module.scss";
import Rating from "../../../components/rating/Rating";
import { useDispatch } from "react-redux";
import { AppRoute } from "../../../constants";
import { AppDispatch } from "../../../store/store";
import { Product } from "../../../types";
import { formatNumber } from "../../../utils";
import { useNavigate } from "react-router";
import { getProductByIDAction } from "../../../store/products/products-api";

type CardProps = {
  product: Product;
};

export default function Card({ product }: CardProps): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onLoadProductClick = async () => {
    await dispatch(getProductByIDAction({ id: product.id }));
    navigate(`${AppRoute.Products}/${product.id}`);
  };

  return (
    <li className={styles["main_products-card"]} onClick={onLoadProductClick}>
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
  );
}
