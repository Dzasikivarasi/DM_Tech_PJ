import styles from "./header.module.scss";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../constants";
import { useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function Header(): JSX.Element {
  const [activeProductsPage, setActivePpoductsPage] = useState<boolean>(true);
  const [activeOrdersPage, setActiveOrdersPage] = useState<boolean>(false);
  const navigate = useNavigate();
  const productsInCart = useSelector((state: RootState) => state.cart.cart);

  const onProductsButtonClick = () => {
    navigate(AppRoute.Products);
    setActivePpoductsPage(true);
    setActiveOrdersPage(false);
  };

  const onOrdersButtonClick = () => {
    navigate(AppRoute.Orders);
    setActivePpoductsPage(false);
    setActiveOrdersPage(true);
  };

  const onCartButtonClick = () => {
    navigate(AppRoute.Cart);
    setActivePpoductsPage(false);
    setActiveOrdersPage(false);
  };

  const onLogoClick = () => {
    navigate(AppRoute.Products);
    setActivePpoductsPage(true);
    setActiveOrdersPage(false);
  };

  return (
    <header className={styles["header"]}>
      <img
        onClick={onLogoClick}
        className={styles["header_logo"]}
        src="/img/icons-svg/logo.svg"
        alt="Логотип"
      />
      <nav className={styles["header_menu"]}>
        <Button
          className="header_menu-btn"
          classActive={activeProductsPage}
          buttonText="Товары"
          buttonClickHandler={onProductsButtonClick}
        />
        <Button
          className="header_menu-btn"
          classActive={activeOrdersPage}
          buttonText="Заказы"
          buttonClickHandler={onOrdersButtonClick}
        />
      </nav>
      <div className={styles["header_cart"]}>
        <Button
          className="header_cart-btn"
          buttonText="Корзина"
          buttonClickHandler={onCartButtonClick}
        />
        <p>({productsInCart.length})</p>
      </div>
    </header>
  );
}
