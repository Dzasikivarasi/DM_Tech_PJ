import styles from "../products.module.scss";
import Card from "./card";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function ProductsList(): JSX.Element {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <ul className={styles["main_products"]}>
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </ul>
  );
}
