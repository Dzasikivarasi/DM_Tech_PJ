import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductCardPage from "../pages/product-card-page/Product-card-page";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import { AppRoute } from "../constants";
import ProductsPage from "../pages/products-page/Products-page";
import OrdersPage from "../pages/orders-page/Orders-page";
import NotFound from "../pages/not-found/Not-found";
import CartPage from "../pages/cart-page/Cart-page";
import { useEffect } from "react";
import { getCartAction } from "../store/cart/cart-api";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={AppRoute.Products} replace />} />
          <Route index path={AppRoute.Products} element={<ProductsPage />} />
          <Route path={AppRoute.Orders} element={<OrdersPage />} />
          <Route path={AppRoute.Cart} element={<CartPage />} />
          <Route
            path={`${AppRoute.Products}/:id`}
            element={<ProductCardPage />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
