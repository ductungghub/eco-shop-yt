import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import path from '../../utils/path';
import Swal from 'sweetalert2';

const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'failed')
      Swal.fire('Oops', 'Dang ky khong thanh cong', 'error').then(() => {
        navigate(`/${path.LOGIN}`);
      });

    if (status === 'success')
      Swal.fire('Congratulation', 'Dang ky thanh cong', 'success').then(() => {
        navigate(`/${path.LOGIN}`);
      });
  });
  return <div className='h-screen w-screen bg-gray-100'></div>;
};

export default FinalRegister;
