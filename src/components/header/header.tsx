import styles from "./header.module.scss";
import Button from "../../components/button/button";

export default function Header(): JSX.Element {
  return (
    <header className={styles["header"]}>
      <img
        className={styles["header_logo"]}
        src="/img/icons-svg/logo.svg"
        alt="Логотип"
      />
      <nav className={styles["header_menu"]}>
        <Button
          className="header_menu-btn"
          classActive={false}
          buttonText="Товары"
        />
        <Button
          className="header_menu-btn"
          classActive={true}
          buttonText="Заказы"
        />
      </nav>
      <Button className="header_cart-btn" buttonText="Корзина" />
    </header>
  );
}
