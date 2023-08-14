import React, { useState } from 'react';

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className='w-full flex flex-col relative'>
      {value.trim() !== '' && (
        <label
          htmlFor={nameKey}
          className='text-[8px] absolute top-[-6px] left-[12px] block text-gray-600 bg-white px-1'
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || 'text'}
        className='px-[14px] py-[13px] rounded-md placeholder:text-[17px] border w-full outline-none'
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className='text-main italic'>
          {invalidFields.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  );
};

export default InputField;
