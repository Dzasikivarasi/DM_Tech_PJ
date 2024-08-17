import styles from "./products.module.scss";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsAction } from "../../store/process-api";
import Card from "./components/Card";
import { Products } from "../../types";
import {
  dropDisplayedProducts,
  updateDisplayedProducts,
} from "../../store/process-slice";

export default function ProductsPage(): JSX.Element {
  const displayedProducts = useSelector(
    (state: RootState) => state.products.displayedProducts
  );
  const [page, setPage] = useState(1);
  const [loadingNewPage, setloadingNewPage] = useState(false);
  const loadingStatus = useSelector(
    (state: RootState) => state.products.loading
  );
  const dispatch: AppDispatch = useDispatch();
  const [initialLoading, setInitialLoding] = useState(true);

  useEffect(() => {
    const initProducts = async () => {
      const result = await dispatch(getProductsAction({ page: 1 }));
      const productsData = result.payload as { data: Products };

      if (initialLoading && productsData && productsData.data.length > 0) {
        dispatch(dropDisplayedProducts(productsData.data));
        setInitialLoding(false);
        setPage(2);
      }
    };
    initProducts();
    console.log(displayedProducts);
  }, []);

  const scrollHandler = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setloadingNewPage(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (loadingNewPage) {
      const loadProducts = async () => {
        const result = await dispatch(getProductsAction({ page }));
        const productsData = result.payload as { data: Products };

        if (productsData && productsData.data.length > 0) {
          dispatch(updateDisplayedProducts(productsData.data));
          setPage((prevState) => prevState + 1);
        }
        setloadingNewPage(false);
      };
      loadProducts();
      console.log("clicked");
      console.log(page);
      console.log(displayedProducts);
    }
  }, [loadingNewPage]);

  return (
    <main className={styles["main"]}>
      {loadingStatus && page === 1 ? (
        <Loader />
      ) : (
        <ul className={styles["main_products"]}>
          {displayedProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </ul>
      )}
      {loadingStatus && page > 1 && <Loader />}
    </main>
  );
}
