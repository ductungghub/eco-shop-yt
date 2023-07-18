import React, { useEffect, useState } from 'react';
import { ProductCard } from './';
import { apiGetProducts } from '../apis';

const FetureProduct = () => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await apiGetProducts({
      limit: 9,
      totalRatings: 5,
    });
    if (response.success) setProducts(response.productDatas);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='w-full'>
      <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>
        FEATURED PRODUCTS
      </h3>

      <div className='flex flex-wrap mx-[-10px] mt-[15px]'>
        {products?.map((el) => (
          <ProductCard
            key={el._id}
            image={el.thumb}
            title={el.title}
            totalRatings={el.totalRatings}
            price={el.price}
          />
        ))}
      </div>

      <div className='flex justify-between'>
        <img
          className='w-[49%] object-cover'
          src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661'
          alt=''
        />
        <div className='flex flex-col justify-between w-[24%]'>
          <img
            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661'
            alt=''
          />
          <img
            src='https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661'
            alt=''
          />
        </div>

        <img
          className='w-[24%] object-contain'
          src='https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661'
          alt=''
        />
      </div>
    </div>
  );
};

export default FetureProduct;
