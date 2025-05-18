export type Product = {
    id: string;
    title: string;
    description: string;
    discountPercentage: number;
    rating: number;
    stock: number;
    price: number;
    brand?: string;
    category?: string;
  thumbnail?: string;
  images?: Array<string>;
  }
  