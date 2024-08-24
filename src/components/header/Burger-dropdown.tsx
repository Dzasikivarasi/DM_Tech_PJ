import Button from "../button/Button";
import styles from "./header.module.scss";

type BurgerDropdownProps = {
  onProductsButtonClick: () => void;
  onOrdersButtonClick: () => void;
  onCartButtonClick: () => void;
  menuCloseHandler: () => void;
};

export default function BurgerDropdown({
  onProductsButtonClick,
  onOrdersButtonClick,
  onCartButtonClick,
}: BurgerDropdownProps): JSX.Element {
  return (
    <div className={styles["header_mobile-dropdown"]}>
      <div className={styles["header_mobile-dropdown-items"]}>
        <Button
          className="header_cart-btn"
          buttonText="Корзина"
          buttonClickHandler={onCartButtonClick}
        />
        <Button
          className="header_menu-btn"
          buttonText="Товары"
          buttonClickHandler={onProductsButtonClick}
        />
        <Button
          className="header_menu-btn"
          buttonText="Заказы"
          buttonClickHandler={onOrdersButtonClick}
        />
      </div>
    </div>
  );
}
