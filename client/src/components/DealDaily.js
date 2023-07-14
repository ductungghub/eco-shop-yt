import React, { useState, useEffect, memo } from 'react';
import icons from '../utils/icons';
import { apiGetProducts } from '../apis/product';
import { formatMoney, renderStarFromNumber } from '../utils/helper';
import Countdown from './Countdown';
import moment from 'moment';
import { secondToHms } from '../utils/helper';

const { AiFillStar, IoMdMenu } = icons;
let idInterval;

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [expriedTime, setExpriedTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 5),
      totalRatings: 5,
    });
    if (response.success) {
      setDealDaily(response.productDatas[0]);

      const today = `${moment().format('MM/DD/YYYY')} 00:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const number = secondToHms(seconds);

      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    } else {
      setHour(7);
      setMinute(59);
      setSecond(59);
    }
  };

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expriedTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpriedTime(!expriedTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, expriedTime, hour]);

  return (
    <div className="border w-full flex-auto">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 text-[20px] font-semibold flex justify-center text-gray-700">
          DAILY DEALS
        </span>
        <span className="flex-1"></span>
      </div>

      <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
        <img
          src={
            dealDaily?.thumb ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvG5Q9vSnhWiURKz5BlQpc6r1nsWJA_L6duJrGCkIjF1Vyfs1TDoxAnCOBHb7E2jzLVuA&usqp=CAU'
          }
          alt="Product img"
          className="w-full object-contain"
        />
        <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
        <span className="flex">
          {renderStarFromNumber(dealDaily?.totalRatings, 20)}
        </span>
        <span>{`${formatMoney(dealDaily?.price)} VNĐ `}</span>
      </div>

      <div className="px-4 mt-8">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Countdown unit={'Hours'} number={hour} />
          <Countdown unit={'Minutes'} number={minute} />
          <Countdown unit={'Seconds'} number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium"
        >
          <IoMdMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
