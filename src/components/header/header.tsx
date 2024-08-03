import Button from "../../components/button/button";

export default function Header(): JSX.Element {
  return (
    <header className="header">
      <img
        className="header_logo"
        src="../../../public/img/icons-svg/logo.svg"
        alt="Логотип"
      />
      <nav className="header_menu">
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
