import React from 'react';
import { navigation } from '../utils/contants';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div className='w-main border-y h-[48px] py-2 mb-6 text-sm flex items-center'>
      {navigation.map((el) => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) =>
            isActive
              ? 'pr-12 hover:text-main text-main'
              : 'pr-12 hover:text-main'
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
}

export default Navigation;
