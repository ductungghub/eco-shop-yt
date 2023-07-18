import React from 'react';
import { formatMoney, renderStarFromNumber } from '../utils/helper';

const ProductCard = ({ image, title, price, totalRatings }) => {
  return (
    <div className='w-1/3 flex-auto px-[10px] mb-[20px]'>
      <div className='flex w-full border'>
        <img className='w-[120px] p-4' src={image} alt='' />
        <div className='flex flex-col gap-1 mt-[15px] items-start w-full text-xs'>
          <span className='line-clamp-1 capitalize text-sm'>
            {title?.toLowerCase()}
          </span>
          <span className='flex h-4'>
            {renderStarFromNumber(totalRatings, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span>{`${formatMoney(price)} VNĐ `}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
