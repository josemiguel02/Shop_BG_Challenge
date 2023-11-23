import { CartItem } from '@/components/CartItem';
import { Header } from '@/components/Header';
import { useCart } from '@/hooks/useCart';

const PurchasePage = () => {
  const { cart } = useCart();

  return (
    <div className='container mx-auto max-w-screen-md px-4'>
      <Header />

      <div className='flex flex-col px-4 pt-4'>
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

        <button
          type='button'
          className='w-full block text-center border-2 border-blue-700 rounded-md text-blue-700 py-2 px-4 transition-transform active:scale-90 ease-in'
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default PurchasePage;
