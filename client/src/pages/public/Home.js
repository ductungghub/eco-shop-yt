import React from 'react';
import { Slidebar, Banner, DealDaily, FetureProduct } from '../../components';
import BestSeller from '../../components/BestSeller';

const Home = () => {
  return (
    <>
      <div>
        <div className='w-main flex'>
          <div className='flex flex-col  gap-5 w-[25%] flex-auto'>
            <Slidebar />
            <DealDaily />
          </div>
          <div className='flex flex-col  gap-5 pl-5 w-[75%] flex-auto'>
            <Banner />
            <BestSeller />
          </div>
        </div>

        <div className='my-8'>
          <FetureProduct />
        </div>
        <div className='w-full h-[500px]'></div>
      </div>
    </>
  );
};

export default Home;
