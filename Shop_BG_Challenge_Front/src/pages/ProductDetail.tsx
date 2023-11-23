import { useCallback, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import productSrv from '@/services/products.service';
import { ProductI } from '@/interfaces';
import { Header } from '@/components/Header';
import { useCart } from '@/hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductI>();

  const { addToCart } = useCart();

  const getProduct = useCallback(async () => {
    try {
      if (!id) return;

      const [, data] = await productSrv.getById(Number(id));

      if (!data) return;

      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  if (!id) return <Navigate to='/products' />;

  return (
    <div className='container mx-auto max-w-screen-lg px-4'>
      <Header />

      <div className='flex justify-center mt-20'>
        <div className='flex gap-4 w-full bg-[#fff1] rounded-md max-w-xl min-h-[200px]'>
          <img
            src={product?.urlImage}
            loading='lazy'
            className='aspect-square w-60  object-cover rounded-s-md'
            alt={product?.description}
          />

          <div className='flex flex-col w-full p-4 gap-2 justify-center'>
            <div>
              <h1 className='text-2xl font-semibold tracking-tight'>
                {product?.name}
              </h1>

              <p className='text-gray-300'>{product?.description}</p>
              <span className='text-gray-300'>Stock: {product?.stock}</span>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-xl font-semibold'>${product?.price}</span>

              <button
                type='button'
                onClick={() => addToCart({ ...product!, quantity: 1 })}
                className='text-sm py-2 px-4 bg-blue-700 rounded-lg font-semibold hover:opacity-80 transition-all ease-in active:ring-2'
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
