import styles from "./products.module.scss";
import ProductsList from "./components/products-list";
import Loader from "../../components/loader/loader";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProductsAction } from "../../store/process-api";

export default function ProductsPage(): JSX.Element {
  const loadingStatus = useSelector(
    (state: RootState) => state.products.loading
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, []);

  return (
    <main className={styles["main"]}>
      {loadingStatus ? <Loader /> : <ProductsList />}
    </main>
  );
}
