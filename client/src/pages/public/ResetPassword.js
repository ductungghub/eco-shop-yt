import React, { useState } from 'react';
import { Button } from '../../components';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../apis';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      toast.success(response.mes, {
        theme: 'colored',
        hideProgressBar: 'true',
      });
    } else {
      toast.info(response.mes, { theme: 'colored', hideProgressBar: 'true' });
    }
  };

  return (
    <div className='absolute top-0 bottom-0 right-0 left-0 bg-white z-50 flex justify-center py-20'>
      <div className='flex flex-col gap-4'>
        <label htmlFor='password'>Enter your new pwr:</label>
        <input
          type='text'
          name=''
          id='password'
          placeholder='Type here'
          className='border-b-2 pb-2 w-[800px] placeholder:text-sm'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex justify-end items-center gap-4'>
          <Button
            name='Submit'
            handleOnClick={handleResetPassword}
            style='px-4 h-[48px] rounded-md text-white text-[20px] my-2 bg-black font-semibold'
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
