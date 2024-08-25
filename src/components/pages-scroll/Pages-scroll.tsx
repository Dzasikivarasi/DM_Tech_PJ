import styles from "./pages-scroll.module.scss";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getOrdersAction } from "../../store/orders/orders-api";
import { ORDERS_LIMIT_PER_CLICK } from "../../constants";
import { useState } from "react";
import { updateCount } from "../../utils";

export default function PagesScroll(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const ordersData = useSelector((state: RootState) => state.orders);
  const [activePage, setActivePage] = useState<number>(1);
  const totalOrders = ordersData?.meta?.total ?? 0;
  const pages = Math.ceil(totalOrders / ORDERS_LIMIT_PER_CLICK);

  const onButtonClick = (pageNumber: number) => {
    dispatch(getOrdersAction({ page: pageNumber }));
    setActivePage(pageNumber);
    console.log("pageNumber");
  };

  const updatePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= pages) {
      setActivePage(newPage);
      dispatch(getOrdersAction({ page: newPage }));
    }
  };

  const onRightButtonClick = (): void => {
    const newPage = updateCount(activePage, "increment", pages);
    updatePage(newPage);
    console.log(newPage);
  };

  const onLeftButtonClick = (): void => {
    const newPage = updateCount(activePage, "decrement", pages);
    updatePage(newPage);
    console.log(newPage);
  };

  return (
    <div className={`${styles.scroll}`}>
      <Button
        className="scroll_left-btn"
        buttonText={""}
        buttonClickHandler={onLeftButtonClick}
        disabled={activePage === 1}
      />
      <div className={styles["scroll_pages"]}>
        {pages > 0 ? (
          Array.from({ length: pages }).map((_, index) => (
            <Button
              key={index}
              className="scroll_page-btn"
              buttonText={`${index + 1}`}
              buttonClickHandler={() => onButtonClick(index + 1)}
              classActive={index + 1 === activePage}
            />
          ))
        ) : (
          <Button className="scroll_page-btn" buttonText={"..."} />
        )}
      </div>
      <Button
        className="scroll_right-btn"
        buttonText={""}
        buttonClickHandler={onRightButtonClick}
        disabled={activePage === pages}
      />
    </div>
  );
}
