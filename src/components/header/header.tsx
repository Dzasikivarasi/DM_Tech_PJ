import styles from "./header.module.scss";
import Button from "../../UI/button/Button";
import BurgerMenu from "./Burger-menu";
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
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const onProductsButtonClick = (): void => {
    navigate(AppRoute.Products);
    setActivePpoductsPage(true);
    setActiveOrdersPage(false);
    setMenuIsOpen(false);
  };

  const onOrdersButtonClick = (): void => {
    navigate(AppRoute.Orders);
    setActivePpoductsPage(false);
    setActiveOrdersPage(true);
    setMenuIsOpen(false);
  };

  const onCartButtonClick = (): void => {
    navigate(AppRoute.Cart);
    setActivePpoductsPage(false);
    setActiveOrdersPage(false);
    setMenuIsOpen(false);
  };

  const onLogoClick = (): void => {
    navigate(AppRoute.Products);
    setActivePpoductsPage(true);
    setActiveOrdersPage(false);
    setMenuIsOpen(false);
  };

  return (
    <>
      <header className={styles["header"]}>
        <img
          onClick={onLogoClick}
          className={styles["header_logo"]}
          src="/DM_Tech_PJ/img/icons-svg/logo.svg"
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
        <BurgerMenu
          menuIsOpen={menuIsOpen}
          setMenuIsOpen={setMenuIsOpen}
          onProductsButtonClick={onProductsButtonClick}
          onOrdersButtonClick={onOrdersButtonClick}
          onCartButtonClick={onCartButtonClick}
        />
      </header>
    </>
  );
}
