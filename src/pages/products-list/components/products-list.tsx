import styles from "../products.module.scss";

export default function ProductsList(): JSX.Element {
  return (
    <ul className={styles["main_products"]}>
      <li className={styles["main_products-card"]}>
        <div className={styles["main_products-card-picture"]}>
          <img
            src="../../../../../public/img/no-picture.jpg"
            alt="Фото товара"
          />
        </div>
        <p className={styles["main_products-card-name"]}>Куртка Lassie</p>
        <div className={styles["main_products-card-rating"]}></div>
        <p className={styles["main_products-card-price"]}>4 799 ₽</p>
      </li>
    </ul>
  );
}

// <div className={styles.container}>
//   <header className={styles['header']}>
//     <Logo className={styles['header_logo']} />
//     <nav className={styles['header_menu']}>
//       <Button
//         className="header_menu-btn"
//         classActive={true}
//         buttonText="Товары"
//       />
//       <Button
//         className="header_menu-btn"
//         classActive={false}
//         buttonText="Заказы"
//       />
//     </nav>
//     <Cart />
//     <Button className="header_cart-btn" buttonText="Корзина" />
//   </header>
// </div>
