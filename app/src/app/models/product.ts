export interface Product {
  id: number;
  name: String;
  category: String;
  detail: String;
  price: String;
  isPromotion: boolean;
  sale: String;
  image: any;
}

export interface responseProducts {
  code: number;
  response: boolean;
  products: Product[];
}

export interface response {
  code: number;
  response: boolean;
}
