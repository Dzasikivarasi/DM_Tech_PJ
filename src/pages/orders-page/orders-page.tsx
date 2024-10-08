import styles from "./orders-page.module.scss";
import OrderCard from "./components/Order-card";
import PagesScroll from "../../components/pages-scroll/Pages-scroll";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAction } from "../../store/orders/orders-api";
import { EMPTY_ORDERS_TEXT } from "../../constants";

export default function OrdersPage(): JSX.Element {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAction({ page: 1 }));
  }, []);

  return (
    <div className={styles["orders"]}>
      {orders && orders.length > 0 ? (
        <>
          <ul className={styles["orders_list"]}>
            {orders.map((orderGroup, index) => (
              <OrderCard key={index} order={orderGroup} />
            ))}
          </ul>
          <PagesScroll />
        </>
      ) : (
        <div className={styles["orders_empty"]}>{EMPTY_ORDERS_TEXT}</div>
      )}
    </div>
  );
}
