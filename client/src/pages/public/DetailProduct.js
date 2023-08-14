import React from 'react';
import { useParams } from 'react-router-dom';

const DetailProduct = () => {
  const { pid, title } = useParams();
  console.log(pid, title);

  return (
    <div className='w-full'>
      <div className='h-[81px] bg-gray-100'>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default DetailProduct;
