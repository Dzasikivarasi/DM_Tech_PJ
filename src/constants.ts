export const BACKEND_URL = "https://skillfactory-task.detmir.team";
export const GET_PRODUCTS_ENDPOINT = "/products";
export const LOAD_CART_ENDPOINT = "/cart";
export const UPDATE_CART_ENDPOINT = "/cart/update";
export const SUBMIT_CART_ENDPOINT = "/cart/submit";
export const GET_ORDERS_ENDPOINT = "/orders";

export const PRODUCTS_LIMIT_PER_CLICK = 15;
export const ORDERS_LIMIT_PER_CLICK = 5;

export const LOAD_ERROR = "Ошибка загрузки данных";
export const UPDATE_CART_ERROR = "Не удалось добавить товар в корзину";
export const EMPTY_CART_ERROR = "В корзине нет товаров для отправки";
export const CREATE_ORDER_ERROR = "Возникла ошибка при оформлении заказа";
export const DUPLICATE_ORDER_NOTIFICATION = "Заказ скопирован в корзину";
export const CREATE_ORDER_NOTIFICATION = "Заказ отправлен";

export const NOT_FOUND_PAGE_TEXT = "Такой страницы не существует";

export enum AppRoute {
  Products = "/products",
  Orders = "/orders",
  Cart = "/cart",
  NotFound = "/404",
}
export const MAX_PRODUCT_QUANTITY = 10;
export const MIN_PRODUCT_QUANTITY = 0;
