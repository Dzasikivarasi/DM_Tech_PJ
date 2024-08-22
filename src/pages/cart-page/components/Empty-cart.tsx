import Button from "../../../components/button/Button";
import { AppRoute } from "../../../constants";
import styles from "../cart-page.module.scss";
import { useNavigate } from "react-router";

export default function EmptyCart(): JSX.Element {
  const navigate = useNavigate();

  const onBacktoShopClick = () => {
    navigate(AppRoute.Products);
  };
  return (
    <>
      <div className={styles["cart_empty"]}>
        <p>Корзина пуста</p>
      </div>
      <Button
        className="cart-btn"
        buttonText={"Вернуться к покупкам"}
        buttonClickHandler={onBacktoShopClick}
      />
    </>
  );
}
