import styles from "./products.module.scss";
import Loader from "../../components/loader/Loader";
import Card from "./components/Card";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  dropDisplayedProducts,
  updateDisplayedProducts,
} from "../../store/products/products-slice";
import ProductsWidget from "./components/Products-widget";
import { useFetchProducts } from "../../hooks/UseFetchProducts";
import { EMPTY_PRODUCTS_TEXT } from "../../constants";

export default function ProductsPage(): JSX.Element {
  const displayedProducts =
    useSelector((state: RootState) => state.products.displayedProducts) || [];
  const fetchProducts = useFetchProducts();
  const [page, setPage] = useState<number>(1);
  const [loadingNewPage, setloadingNewPage] = useState<boolean>(false);
  const loadingStatus = useSelector(
    (state: RootState) => state.products.loading
  );
  const totalProductsCount = useSelector(
    (state: RootState) => state.products.totalCount
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
      const productsData = await fetchProducts({
        page: 1,
      });

      if (initialLoading && productsData && productsData.length > 0) {
        dispatch(dropDisplayedProducts(productsData));
        setInitialLoding(false);
        setPage(2);
      }
    };
    initProducts();
  }, []);

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
    if (loadingNewPage && displayedProducts.length < totalProductsCount) {
      const loadMoreProducts = async () => {
        const productsData = await fetchProducts({
          page,
        });

        if (productsData && productsData.length > 0) {
          dispatch(updateDisplayedProducts(productsData));
          setPage((prevState) => prevState + 1);
        }
        setloadingNewPage(false);
      };
      loadMoreProducts();
    }
  }, [
    dispatch,
    filterMaxPrice,
    filterMinPrice,
    filterMinRating,
    loadingNewPage,
    page,
    searchRequest,
    fetchProducts,
    totalProductsCount,
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
        <div className={styles["main_products-empty"]}>
          {EMPTY_PRODUCTS_TEXT}
        </div>
      )}
      {loadingStatus && page > 1 && <Loader />}
    </main>
  );
}
