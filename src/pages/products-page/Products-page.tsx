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
  const [page, setPage] = useState<number>(1);
  const [loadingNewPage, setloadingNewPage] = useState<boolean>(false);
  const loadingStatus = useSelector(
    (state: RootState) => state.products.loading
  );
  const searchRequest = useSelector(
    (state: RootState) => state.products.searchRequest
  );
  const filterMinPrice = useSelector(
    (state: RootState) => state.products.filters.minPrice
  );
  const filterMaxPrice = useSelector(
    (state: RootState) => state.products.filters.maxPrice
  );
  const filterMinRating = useSelector(
    (state: RootState) => state.products.filters.minRating
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
          priceFrom: filterMinPrice,
          priceTo: filterMaxPrice,
          ratingFrom: filterMinRating,
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
  }, [
    searchRequest,
    initialLoading,
    dispatch,
    filterMinPrice,
    filterMaxPrice,
    filterMinRating,
  ]);

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
            priceFrom: filterMinPrice,
            priceTo: filterMaxPrice,
            ratingFrom: filterMinRating,
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
  }, [
    dispatch,
    filterMaxPrice,
    filterMinPrice,
    filterMinRating,
    loadingNewPage,
    page,
    searchRequest,
  ]);

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
        <div className={styles["main_products-empty"]}>Товары отсутствуют</div>
      )}
      {loadingStatus && page > 1 && <Loader />}
    </main>
  );
}
