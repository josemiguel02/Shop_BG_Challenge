import { createContext } from 'react';
import { ProductI } from '@/interfaces';

interface CartContextProps {
  products: Array<ProductI>;
  cart: Array<ProductI>;
  totalQuantity: number;
  addToCart: (item: ProductI) => void;
  removeItem: (id: number) => void
}
export const CartContext = createContext({} as CartContextProps);
