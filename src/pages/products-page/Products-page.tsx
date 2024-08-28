import styles from "./products.module.scss";
import Loader from "../../components/loader/Loader";
import Card from "./components/Card";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsAction } from "../../store/products/products-api";
import { Products } from "../../types";
import {
  dropDisplayedProducts,
  updateDisplayedProducts,
} from "../../store/products/products-slice";
import ProductsWidget from "./components/Products-widget";

export default function ProductsPage(): JSX.Element {
  const displayedProducts = useSelector(
    (state: RootState) => state.products.displayedProducts
  );
  const [page, setPage] = useState(1);
  const [loadingNewPage, setloadingNewPage] = useState(false);
  const loadingStatus = useSelector(
    (state: RootState) => state.products.loading
  );
  const searchRequest = useSelector(
    (state: RootState) => state.products.searchRequest
  );
  const dispatch: AppDispatch = useDispatch();
  const [initialLoading, setInitialLoding] = useState(true);

  useEffect(() => {
    const initProducts = async () => {
      const result = await dispatch(
        getProductsAction({
          page: 1,
          search: searchRequest,
          context: "displayedProducts",
        })
      );
      const productsData = result.payload as { data: Products };

      if (initialLoading && productsData && productsData.data.length > 0) {
        dispatch(dropDisplayedProducts(productsData.data));
        setInitialLoding(false);
        setPage(2);
      }
    };
    initProducts();
  }, [searchRequest, initialLoading, dispatch]);

  // useEffect(() => {
  //   const initProducts = async () => {
  //   dispatch(
  //     getProductsAction({
  //       search: searchRequest,
  //       page: 1,
  //       context: "displayedProducts",
  //     })
  //   );
  //   dispatch(dropDisplayedProducts(productsData.data));
  // }, [searchRequest]);

  const scrollHandler = (): void => {
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
        const result = await dispatch(
          getProductsAction({
            page,
            search: searchRequest,
            context: "displayedProducts",
          })
        );
        const productsData = result.payload as { data: Products };

        if (productsData && productsData.data.length > 0) {
          dispatch(updateDisplayedProducts(productsData.data));
          setPage((prevState) => prevState + 1);
        }
        setloadingNewPage(false);
      };
      loadProducts();
    }
  }, [loadingNewPage]);

  return (
    <main className={styles["main"]}>
      <ProductsWidget />
      {loadingStatus && page === 1 ? (
        <Loader />
      ) : displayedProducts.length > 0 ? (
        <ul className={styles["main_products"]}>
          {displayedProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <div className={styles["main_products-empty"]}>
          Товары по данному запросу отсутствуют
        </div>
      )}
      {loadingStatus && page > 1 && <Loader />}
    </main>
  );
}
