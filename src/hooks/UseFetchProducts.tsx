import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "../store/store";
import { getProductsAction } from "../store/products/products-api";
import { Products } from "../types";

interface FetchProductsParams {
  page: number;
  search?: string;
  context?: "displayedProducts" | "search" | undefined;
  priceFrom?: number | undefined;
  priceTo?: number | undefined;
  ratingFrom?: number | undefined;
}

export function useFetchProducts() {
  const dispatch: AppDispatch = useDispatch();
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

  const fetchProducts = useCallback(
    async ({
      page,
      search = searchRequest,
      context = "displayedProducts",
      priceFrom = filterMinPrice,
      priceTo = filterMaxPrice,
      ratingFrom = filterMinRating,
    }: FetchProductsParams): Promise<Products | null> => {
      const result = await dispatch(
        getProductsAction({
          page,
          search,
          context,
          priceFrom,
          priceTo,
          ratingFrom,
        })
      );
      const productsData = result.payload as { data: Products };
      return productsData?.data || null;
    },
    [dispatch, filterMaxPrice, filterMinPrice, filterMinRating, searchRequest]
  );

  return fetchProducts;
}
