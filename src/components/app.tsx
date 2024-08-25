import "react-toastify/dist/ReactToastify.css";
import ProductCardPage from "../pages/product-card-page/Product-card-page";
import CartPage from "../pages/cart-page/Cart-page";
import ProductsPage from "../pages/products-page/Products-page";
import OrdersPage from "../pages/orders-page/Orders-page";
import NotFound from "../pages/not-found/Not-found";
import Layout from "./Layout";
import { AppRoute } from "../constants";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function App(): JSX.Element {
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
