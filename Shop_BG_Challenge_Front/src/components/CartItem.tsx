import { FC, useEffect, useState } from 'react';
import { ProductI } from '@/interfaces';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  cart: ProductI;
}

export const CartItem: FC<CartItemProps> = ({ cart }) => {
  const { urlImage, name, description, quantity, price } = cart;
  const [currentQuantity, setQuantity] = useState(quantity);

  const { addToCart } = useCart();

  useEffect(() => {
    if (currentQuantity < 0) setQuantity(0);
  }, [currentQuantity]);

  const changeQuantity = (value: number) => {
    addToCart({
      ...cart,
      quantity: value,
    });
  };

  if (currentQuantity <= 0) return null;

  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-4 items-center'>
        <img
          src={urlImage}
          loading='lazy'
          className='aspect-square h-12 w-12 object-cover rounded-md'
          alt={description}
        />

        <div>
          <span>{name}</span>
          <span className='text-gray-300 line-clamp-1'>{description}</span>
          <small className='font-semibold'>${price * currentQuantity}</small>
        </div>
      </div>

      <div className='flex bg-gray-200 text-gray-600 items-center'>
        <button
          className='h-8 w-8 inline-grid place-content-center text-sm p-2 hover:opacity-80 transition-all ease-in active:ring-2'
          onClick={() => {
            setQuantity(prev => prev! + 1);

            changeQuantity(1);
          }}
        >
          +
        </button>

        <span className='font-mono font-medium'>{currentQuantity}</span>

        <button
          className='h-8 w-8 inline-grid place-content-center text-sm p-2 hover:opacity-80 transition-all ease-in active:ring-2'
          onClick={() => {
            setQuantity(prev => prev! - 1);

            changeQuantity(-1);
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};
