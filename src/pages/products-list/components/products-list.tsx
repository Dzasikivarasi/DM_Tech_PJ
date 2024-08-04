import styles from "../products.module.scss";
import { PRODUCTS } from "../../../mock-data";
import Card from "./card";

export default function ProductsList(): JSX.Element {
  return (
    <ul className={styles["main_products"]}>
      {PRODUCTS.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </ul>
  );
}
