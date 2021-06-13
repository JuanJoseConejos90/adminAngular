export interface Product {
  id: number;
  name?: String;
  category?: String;
  detail?: String;
  price?: number;
  isPromotion?: boolean;
  sale?: number;
  image?: any;
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
