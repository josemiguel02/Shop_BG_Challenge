import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartModal } from './CartModal';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

export const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const { isLoggedIn } = useAuth();
  const { totalQuantity } = useCart();

  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <>
      <div className='flex justify-between py-8'>
        <Link to='/products' className='text-4xl font-semibold'>
          Shop App
        </Link>

        <div className='flex gap-5 items-center'>
          <button
            type='button'
            onClick={() => setShowModal(!showModal)}
            className='relative transition-all ease-out scale-90 hover:scale-100 hover:rotate-6'
          >
            <span className='text-sm bg-red-500 p-3 h-2 w-2 inline-grid place-content-center rounded-full absolute top-0 right-0 z-10'>
              {totalQuantity}
            </span>

            <span className='block text-4xl md:text-5xl'>🛒</span>
          </button>

          {isLoggedIn ? (
            <button
              type='button'
              onClick={handleLogout}
              className='bg-red-500 py-2 px-4 rounded-lg font-semibold hover:opacity-80 transition-all ease-in active:ring-2 active:ring-red-500'
            >
              Logout
            </button>
          ) : (
            <Link
              to='/login'
              className='bg-blue-700 py-2 px-4 rounded-lg font-semibold hover:opacity-80 transition-all ease-in active:ring-2 active:ring-blue-500'
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {showModal && <CartModal onClose={() => setShowModal(!showModal)} />}
    </>
  );
};
