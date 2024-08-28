import styles from "../products.module.scss";
import ProductFilters from "./Product-filters";
import ProductSearch from "./Product-search";

export default function ProductsWidget(): JSX.Element {
  return (
    <div className={styles["main_widgets"]}>
      <ProductFilters />
      <ProductSearch />
    </div>
  );
}
