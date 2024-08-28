import styles from "../products.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  dropDisplayedProducts,
  updateSearchRequestValue,
} from "../../../store/products/products-slice";
import { useEffect, useRef, useState } from "react";
import { getProductsAction } from "../../../store/products/products-api";
import { Products } from "../../../types";
import SearchDropdown from "./Search-dropdown";

export default function ProductSearch(): JSX.Element {
  const searchRequest = useSelector(
    (state: RootState) => state.products.searchRequest
  );
  const dispatch: AppDispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [inputData, setInputData] = useState<string>(searchRequest);
  const searchResults = useSelector(
    (state: RootState) => state.products.searchResults
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = async (value: string) => {
    setInputData(value);
    if (value === "") {
      await dispatch(updateSearchRequestValue(value));
      setDropdownVisible(false);
    } else {
      setDropdownVisible(true);
      await dispatch(
        getProductsAction({ page: 1, search: value, context: "search" })
      );
    }
  };

  const handleSearchClick = async () => {
    dispatch(updateSearchRequestValue(inputData));
    const result = await dispatch(
      getProductsAction({
        page: 1,
        search: inputData,
        context: "displayedProducts",
        priceFrom: filterMinPrice,
        priceTo: filterMaxPrice,
        ratingFrom: filterMinRating,
      })
    );
    const productsData = result.payload as { data: Products };
    dispatch(dropDisplayedProducts(productsData.data));
    setDropdownVisible(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={styles["main_widgets-search"]} ref={containerRef}>
      <div className={styles["main_widgets-search-container"]}>
        <img
          src="/DM_Tech_PJ/img/icons-svg/search.svg"
          alt="Поиск"
          onClick={handleSearchClick}
        />
        <input
          placeholder="Введите название товара..."
          value={inputData}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {isDropdownVisible && searchResults.length > 0 && <SearchDropdown />}
    </div>
  );
}
