import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useCart } from '@/hooks/useCart';

const ProductsPage = () => {
  const { products, addToCart } = useCart();

  return (
    <div className='container mx-auto max-w-screen-lg px-4'>
      <Header />

      <div className='grid gap-2 md:gap-5 grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))]'>
        {products.map(product => {
          const { id, name, price, description, urlImage, stock } = product;

          return (
            <div
              key={id}
              className='p-4 bg-[#fff1] rounded-md flex flex-col justify-between gap-4'
            >
              <img
                src={urlImage}
                loading='lazy'
                className='aspect-square h-40 w-full object-cover rounded-md'
                alt={description}
              />

              <div>
                <Link
                  to={`/products/${id}`}
                  className='text-xl font-semibold tracking-tight hover:underline decoration-wavy'
                >
                  {name}
                </Link>

                <p className='text-gray-300'>{description}</p>

                <span className='text-gray-300'>Stock: {stock}</span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-xl font-semibold'>${price}</span>

                <button
                  type='button'
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  className='text-sm py-2 px-4 bg-blue-700 rounded-lg font-semibold hover:opacity-80 transition-all ease-in active:ring-2'
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
