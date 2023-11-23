import { ProductI } from '@/interfaces';
import type { CartState } from './CartProvider';

type CartActionType =
  | { type: '[LOAD] - PRODUCTS'; payload: Array<ProductI> }
  | { type: '[LOAD] - CART'; payload: Array<ProductI> }
  | { type: '[ADD] - PRODUCT'; payload: ProductI }
  | { type: '[REMOVE] - PRODUCT'; payload: number }
  | { type: '[SET TOTAL QUANTITY] - CART' };

export const CartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case '[LOAD] - PRODUCTS':
      return {
        ...state,
        products: action.payload.map(item => ({ ...item, quantity: 0 })),
      };

    case '[LOAD] - CART':
      return {
        ...state,
        cart: action.payload.filter(item => item.quantity > 0),
        totalQuantity: state.cart.reduce((acc, curr) => acc + curr.quantity, 0),
      };

    case '[ADD] - PRODUCT':
      const existsProd = state.cart.find(item => item.id === action.payload.id);

      if (existsProd) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case '[REMOVE] - PRODUCT':
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload),
      };

    case '[SET TOTAL QUANTITY] - CART':
      return {
        ...state,
        totalQuantity: state.cart.reduce((acc, curr) => acc + curr.quantity, 0),
      };

    default:
      return state;
  }
};
