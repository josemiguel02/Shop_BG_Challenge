import { useReducer, ReactNode, useEffect } from 'react';
import { CartContext } from './CartContext';
import { CartReducer } from './CartReducer';
import { ProductI } from '@/interfaces';
import { CONSTANTS } from '@/constants';
import productSrv from '@/services/products.service';

export interface CartState {
  products: Array<ProductI>;
  cart: Array<ProductI>;
  totalQuantity: number;
}

const INITIAL_STATE: CartState = {
  products: [],
  cart: [],
  totalQuantity: 0,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);

  const loadProducts = async () => {
    try {
      const [, data] = await productSrv.getAll();

      if (!data) return;

      dispatch({ type: '[LOAD] - PRODUCTS', payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (item: ProductI) => {
    dispatch({ type: '[ADD] - PRODUCT', payload: item });
    dispatch({ type: '[SET TOTAL QUANTITY] - CART' });
  };

  const loadCart = () => {
    const cartStr = localStorage.getItem(CONSTANTS.CART_KEY);
    if (!cartStr) return;

    const cart = JSON.parse(cartStr) as Array<ProductI>;
    dispatch({ type: '[LOAD] - CART', payload: cart });
    dispatch({ type: '[SET TOTAL QUANTITY] - CART' });
  };

  const removeItem = (id: number) => {
    dispatch({ type: '[REMOVE] - PRODUCT', payload: id });
  };

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  useEffect(() => {
    const products = state.cart.filter(item => item.quantity > 0);

    if (state.cart.length) {
      localStorage.setItem(CONSTANTS.CART_KEY, JSON.stringify(products));
    }
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
