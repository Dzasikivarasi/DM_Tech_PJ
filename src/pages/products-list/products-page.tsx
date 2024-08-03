import styles from "./products.module.scss";
import ProductsList from "./components/products-list";
import ProductsNavigation from "./components/products-navigation";

export default function ProductsPage(): JSX.Element {
  return (
    <main className={styles["main"]}>
      <ProductsList />
      <ProductsNavigation />
    </main>
  );
}
