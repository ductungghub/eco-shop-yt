import React, { useState } from 'react';
import { formatMoney, renderStarFromNumber } from '../utils/helper';
import label from '../assets/label.png';
import { SelectOption } from './';
import icons from '../utils/icons';
import { Link } from 'react-router-dom';
import path from '../utils/path';

const { AiFillEye, IoMdMenu, AiFillHeart } = icons;

const Product = ({ productData }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className='w-full text-base px-[10px]'>
      <Link
        className='w-full border px-[15px] flex flex-col items-center'
        to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className='relative'>
          {isShowOption && (
            <div className='absolute bottom-[-10px] flex justify-center left-0 right-0 gap-2 animate-slide-top'>
              <SelectOption icon={<AiFillEye />} />
              <SelectOption icon={<IoMdMenu />} />
              <SelectOption icon={<AiFillHeart />} />
            </div>
          )}
          <img
            src={
              productData?.thumb ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvG5Q9vSnhWiURKz5BlQpc6r1nsWJA_L6duJrGCkIjF1Vyfs1TDoxAnCOBHb7E2jzLVuA&usqp=CAU'
            }
            alt='Product img'
            className='w-[274px] h-[274px] object-cover'
          />
          <img
            src={label}
            alt=''
            className='absolute top-0 left-[-39px] w-[100px] h-[35px] object-cover'
          />
          <span className='font-semibold  text-white absolute top-0 left-[-12px] '>
            New
          </span>
        </div>
        <div className='flex flex-col gap-1 mt-[15px] items-start w-full '>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span className='flex'>
            {renderStarFromNumber(productData?.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>
          <span>{`${formatMoney(productData?.price)} VNĐ `}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
