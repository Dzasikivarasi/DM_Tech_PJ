import { useState } from "react";
import styles from "../products.module.scss";
import FilterInput from "./Filter-input";
import Button from "../../../UI/button/Button";
import {
  dropDisplayedProducts,
  dropFilters,
  updateFilters,
} from "../../../store/products/products-slice";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../../store/products/products-api";
import { Products } from "../../../types";
import { AppDispatch, RootState } from "../../../store/store";
import FilterSelect from "./Filter-select";
import { validateFilterPrice } from "../../../utils";

export default function ProductFilters(): JSX.Element {
  const filterMinPrice = useSelector(
    (state: RootState) => state.products.filters.minPrice
  );
  const filterMaxPrice = useSelector(
    (state: RootState) => state.products.filters.maxPrice
  );
  const filterMinRating = useSelector(
    (state: RootState) => state.products.filters.minRating
  );
  const [minPrice, setMinPrice] = useState<number | undefined>(filterMinPrice);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(filterMaxPrice);
  const [minRating, setMinRating] = useState<number | undefined>(
    filterMinRating
  );
  const dispatch: AppDispatch = useDispatch();
  const searchRequest = useSelector(
    (state: RootState) => state.products.searchRequest
  );

  const handleFiltersChange = (
    value: number,
    type: "minPrice" | "maxPrice" | "minRating"
  ) => {
    switch (type) {
      case "minPrice":
        setMinPrice(value ? value : undefined);
        break;
      case "maxPrice":
        setMaxPrice(value ? value : undefined);
        break;
      case "minRating":
        setMinRating(value ? value : undefined);
        break;
      default:
        break;
    }
  };

  const onFilterButtonClick = async () => {
    const filtersValid = validateFilterPrice(minPrice, maxPrice);
    if (filtersValid) {
      const newFilters = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        minRating: minRating,
      };
      dispatch(updateFilters(newFilters));
      const result = await dispatch(
        getProductsAction({
          page: 1,
          search: searchRequest,
          context: "displayedProducts",
          priceFrom: minPrice,
          priceTo: maxPrice,
          ratingFrom: minRating,
        })
      );
      const productsData = result.payload as { data: Products };
      dispatch(dropDisplayedProducts(productsData.data));
    }
  };

  const onFilterDropButtonClick = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinRating(undefined);
    dispatch(dropFilters());
  };

  return (
    <div className={styles["main_widgets-filters"]}>
      <div className={styles["main_widgets-filters-list"]}>
        <FilterInput
          title="Цена от:"
          type="minPrice"
          value={minPrice}
          handleInputChange={handleFiltersChange}
        />
        <FilterInput
          title="Цена до:"
          type="maxPrice"
          value={maxPrice}
          handleInputChange={handleFiltersChange}
        />
        <FilterSelect
          title="Минимальный рейтинг:"
          value={minRating}
          handleInputChange={handleFiltersChange}
        />
      </div>
      <div className={styles["main_widgets-filters-controls"]}>
        <Button
          className="filter-btn"
          buttonText={"Применить"}
          buttonClickHandler={onFilterButtonClick}
        />
        <Button
          className="filter-drop-btn"
          buttonText={"Сбросить"}
          buttonClickHandler={onFilterDropButtonClick}
        />
      </div>
    </div>
  );
}
