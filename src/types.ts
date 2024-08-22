export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  picture: string;
  rating: number;
};

export type Products = Product[] | [];

export type ProductsMeta = {
  count: number;
  total: number;
};

export type GetProducts = {
  meta: {
    count: number;
    total: number;
    sort: {
      field: string;
      direction: string;
    };
    availableFields: string[];
  };
  data: Products;
};

export type CartItem = {
  product: Product;
  quantity: number;
  createdAt: string;
};

export type CartItems = CartItem[];

export type UpdateCartRequestData = {
  id: string;
  quantity: number;
}[];

export type Order = CartItems;
export type Orders = Order[];

export type GetOrders = {
  meta: ProductsMeta;
  data: Order[];
};
