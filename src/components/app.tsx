import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductCardPage from "../pages/product-card/product-card-page";
import Layout from "./layout";
import { AppRoute } from "../constants";
import ProductsPage from "../pages/products-list/products-page";
import OrdersPage from "../pages/orders-page/orders-page";
import CartPage from "../pages/cart-page/cart-page";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}
