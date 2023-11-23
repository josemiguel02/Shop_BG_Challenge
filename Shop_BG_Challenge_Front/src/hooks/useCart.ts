import { useContext } from 'react';
import { CartContext } from '@/context';

export const useCart = () => ({
  ...useContext(CartContext),
});
