import React, { useState, useCallback, useEffect } from 'react';
import { InputField, Button } from '../../components';
import {
  apiForgotPassword,
  apiLogin,
  apiRegister,
  apiFinalRegister,
} from '../../apis';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import path from '../../utils/path';
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from '../../utils/helper';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: '',
  });

  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: '',
    });
  };

  const [isVerifiedmail, setIsVerifiedmail] = useState(false);
  const [token, setToken] = useState('');
  const [invalidFields, setInvalidFields] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.mes, {
        theme: 'colored',
        hideProgressBar: 'true',
      });
    } else {
      toast.info(response.mes, { theme: 'colored', hideProgressBar: 'true' });
    }
  };

  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  //SUBMIT
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;

    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);

    if (invalids === 0) {
      if (isRegister) {
        const response = await apiRegister(payload);
        if (response.success) {
          setIsVerifiedmail(true);
        } else {
          Swal.fire('Oops', response.mes, 'error');
        }
      } else {
        const rs = await apiLogin(data);
        if (rs.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              userData: rs.userData,
            })
          );
          navigate(`/${path.HOME}`);
        } else {
          Swal.fire('Oops', rs.mes, 'error');
        }
      }
    }
  }, [payload, isRegister, dispatch, navigate]);

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire('Congratulation', response.mes, 'success').then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else Swal.fire('Oops', response.mes, 'error');
    setIsVerifiedmail(false);
    setToken('');
  };

  return (
    <div className='w-screen h-screen relative'>
      {isVerifiedmail && (
        <div className='absolute top-0 bottom-0 right-0 left-0 bg-slate-800 opacity-90 z-50 flex flex-col justify-center items-center'>
          <div className='bg-white w-[400px] rounded-md flex flex-col gap-4 p-4'>
            <h4>Checking your mail to active Account:</h4>
            <input
              type='text'
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder='Enter your code:'
              className='p-2 border rounded-md outline-dotted hover:outline-none'
            />
            <button
              className='px-4 py-2 bg-blue-500 text-white rounded-md font-semibold'
              type='button'
              onClick={finalRegister}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className='absolute top-0 bottom-0 right-0 left-0 bg-white z-50 flex justify-center py-20'>
          <div className='flex flex-col gap-4'>
            <label htmlFor='email'>Enter your mail:</label>
            <input
              type='text'
              name=''
              id='email'
              placeholder='Example: email@gmail.com'
              className='border-b-2 pb-2 w-[800px] placeholder:text-sm'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='flex justify-end items-center gap-4'>
              <Button name='Submit' handleOnClick={handleForgotPassword} />
              <Button
                name='Back'
                handleOnClick={() => setIsForgotPassword(false)}
                style='px-4 h-[48px] rounded-md text-white text-[20px] my-2 bg-black font-semibold'
              />
            </div>
          </div>
        </div>
      )}

      <div className='w-screen h-[80vh] bg-[#f0f2f5] flex justify-center items-center '>
        <div className='w-main flex justify-center items-center gap-16'>
          <div className='w-[38%] flex flex-col gap-6'>
            <Link
              to={`/${path.HOME}`}
              className='font-bold text-[36px] cursor-pointer text-blue-500'
            >
              Digital World
            </Link>
            <span className='text-[14px]'>
              Facebook helps you connect and share with the people in your life.
            </span>
          </div>
          <div className='w-[40%] p-4 bg-white rounded-md flex flex-col items-center gap-4 shadow-lg border-none shadow-gray-400'>
            {isRegister && (
              <div className='flex items-center gap-2'>
                <InputField
                  value={payload.firstname}
                  setValue={setPayload}
                  nameKey='firstname'
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
                <InputField
                  value={payload.lastname}
                  setValue={setPayload}
                  nameKey='lastname'
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              </div>
            )}
            <InputField
              value={payload.email}
              setValue={setPayload}
              nameKey='email'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            {isRegister && (
              <InputField
                value={payload.mobile}
                setValue={setPayload}
                nameKey='mobile'
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            )}
            <InputField
              value={payload.password}
              type='password'
              setValue={setPayload}
              nameKey='password'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <Button
              name={isRegister ? 'Register' : 'Log in'}
              handleOnClick={handleSubmit}
              fw
            />
            {!isRegister && (
              <span
                className='text-[14px] text-[#1877f2] hover:underline cursor-pointer'
                onClick={() => setIsForgotPassword(true)}
              >
                Forgotten password?
              </span>
            )}

            <div className={`mx-[16px] border-b w-full border-[#dadde1]`}></div>
            {!isRegister && (
              <div
                onClick={() => setIsRegister(true)}
                className='px-[16px] mb-2 bg-[#42b72a] h-[48px] flex justify-center items-center text-white rounded-md font-semibold cursor-pointer'
              >
                Create new account
              </div>
            )}
            {isRegister && (
              <span
                onClick={() => setIsRegister(false)}
                className='text-[14px] text-[#1877f2] hover:underline cursor-pointer'
              >
                Already have an account?
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
