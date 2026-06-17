export type Product = {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  price: number;
  was?: number;
  rating: number;
  reviewCount: number;
  category: string;
  brand?: string; // whim house "dupe" brand
  bg: string; // gradient for the product tile
  blurb: string;
  perks: string[];
  secondhand?: boolean; // a one-of-a-kind thrifted find
  condition?: string; // flavor text for thrifted items, e.g. "Gently loved"
  limited?: boolean; // a playful, self-aware "limited drop" (it comes back — it's free)
  image?: string; // Unsplash photo id, e.g. "photo-1602143407151-7111542de6e8"
};

export type CartLine = {
  product: Product;
  qty: number;
};

export type Review = {
  name: string;
  stars: number;
  title: string;
  body: string;
  emoji: string;
};
