import styles from "./header.module.scss";
import BurgerIcon from "./Burger-icon";
import BurgerDropdown from "./Burger-dropdown";

type BurgerMenuProps = {
  menuIsOpen: boolean;
  setMenuIsOpen: (isOpen: boolean) => void;
  onProductsButtonClick: () => void;
  onOrdersButtonClick: () => void;
  onCartButtonClick: () => void;
};

export default function BurgerMenu({
  menuIsOpen,
  setMenuIsOpen,
  onProductsButtonClick,
  onOrdersButtonClick,
  onCartButtonClick,
}: BurgerMenuProps): JSX.Element {
  const menuHandler = (): void => {
    setMenuIsOpen(!menuIsOpen);
  };

  const menuCloseHandler = (): void => {
    setMenuIsOpen(false);
  };

  return (
    <div className={styles["header_mobile"]}>
      <BurgerIcon menuHandler={menuHandler} />
      {menuIsOpen && (
        <BurgerDropdown
          menuCloseHandler={menuCloseHandler}
          onProductsButtonClick={onProductsButtonClick}
          onOrdersButtonClick={onOrdersButtonClick}
          onCartButtonClick={onCartButtonClick}
        />
      )}
    </div>
  );
}
