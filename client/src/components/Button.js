import React from 'react';

const Button = ({ name, handleOnClick, style, iconBefore, iconAfter, fw }) => {
  return (
    <button
      type='button'
      className={
        style
          ? style
          : `px-4 h-[48px] rounded-md text-white text-[20px] my-2 bg-[#1877f2] font-semibold ${
              fw ? 'w-full' : 'w-fit'
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {iconBefore}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default Button;
