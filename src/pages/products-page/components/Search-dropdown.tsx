import { useDispatch, useSelector } from "react-redux";
import styles from "../products.module.scss";
import { AppDispatch, RootState } from "../../../store/store";
import { getProductByIDAction } from "../../../store/products/products-api";
import { AppRoute } from "../../../constants";
import { useNavigate } from "react-router";

export default function SearchDropdown(): JSX.Element {
  const searchResults = useSelector(
    (state: RootState) => state.products.searchResults
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const cardClickHandler = async (id: string) => {
    await dispatch(getProductByIDAction({ id }));
    navigate(`${AppRoute.Products}/${id}`);
  };

  return (
    <div className={styles["main_widgets-search-results"]}>
      {searchResults.map((product) => (
        <span
          className={styles["main_widgets-search-results-item"]}
          key={product.id}
          onClick={() => cardClickHandler(product.id)}
        >
          {product.title}
        </span>
      ))}
    </div>
  );
}
