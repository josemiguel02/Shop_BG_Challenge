import { FC, useEffect, useRef } from 'react';
import { Portal } from './Portal';
import { useCart } from '@/hooks/useCart';
import { CartItem } from './CartItem';
import { Link } from 'react-router-dom';

interface CartModalProps {
  onClose: () => void;
}

export const CartModal: FC<CartModalProps> = ({ onClose }) => {
  const bodyRef = useRef(document.body);
  const { cart } = useCart();

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.classList.add('overflow-hidden');
    }
  }, []);

  const handleClose = () => {
    if (bodyRef.current) {
      bodyRef.current.classList.remove('overflow-hidden');
    }

    onClose();
  };

  const getTotal = () => {
    return cart.reduce((acc, curr) => acc + curr.price, 0);
  };

  return (
    <Portal>
      <div
        className='absolute inset-0 z-30 bg-gray-900 bg-opacity-60 backdrop-blur-sm transition-all ease-in'
        onClick={({ target, currentTarget }) =>
          currentTarget === target && handleClose()
        }
      >
        <div className='bg-[#121212] min-h-screen w-9/12 md:max-w-[400px] ml-auto rounded-s-md'>
          <div className='flex flex-col px-4 pt-4 min-h-screen'>
            <h1 className='text-2xl font-semibold mt-5'>Cart</h1>

            {!cart.length ? (
              <h1>No products added to cart</h1>
            ) : (
              <div className='flex flex-col gap-4 flex-1 justify-between py-3'>
                <div className='flex flex-col gap-2'>
                  {cart.map(cart => (
                    <CartItem key={cart.id} cart={cart} />
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className='flex justify-between text-2xl font-semibold mb-5'>
                <span className='block'>Total:</span>

                <span className='block'>${getTotal()}</span>
              </div>

              <Link
                to='/purchase'
                onClick={({ target, currentTarget }) =>
                  currentTarget === target && handleClose()
                }
                className='w-full block text-center border-2 border-blue-700 rounded-md text-blue-700 py-2 px-4 transition-transform active:scale-90 ease-in'
              >
                Purchase
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
