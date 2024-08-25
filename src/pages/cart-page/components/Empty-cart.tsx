import styles from "../cart-page.module.scss";
import Button from "../../../UI/button/Button";
import { AppRoute } from "../../../constants";
import { useNavigate } from "react-router";

export default function EmptyCart(): JSX.Element {
  const navigate = useNavigate();

  const onBacktoShopClick = (): void => {
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
