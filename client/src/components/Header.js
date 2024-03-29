import React from 'react';
import logo from '../assets/logo.png';
import icons from '../utils/icons';
import { Link } from 'react-router-dom';
import path from '../utils/path';

function Header() {
  const { FaPhone, MdMail, BsBagPlusFill, FaUser } = icons;
  return (
    <div className=' w-main h-[110px] py-[35px] flex justify-between'>
      <Link to={path.HOME}>
        <img src={logo} alt='logo' className='w-[234px] object-contain' />
      </Link>
      <div className='flex text-[13px]'>
        <div className='flex flex-col items-center px-6 border-r '>
          <span className='flex items-center gap-4'>
            <FaPhone color='red' />
            <span className='font-semibold'> (+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className='flex flex-col items-center px-6 border-r'>
          <span className='flex items-center gap-4'>
            <MdMail color='red' />
            <span className='font-semibold'> SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className='flex items-center justify-center gap-2 px-6 border-r'>
          <BsBagPlusFill color='red' />
          <span> 0 item(s)</span>
        </div>
        <div className='flex items-center justify-center px-6 gap-2'>
          <FaUser color='red' />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
