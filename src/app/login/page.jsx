'use client'

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import PopUp from './component/PopUp';

function LoginContent() {
  const searchParams = useSearchParams();
  const [opendPopUp, setOpendPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setOpendPopUp(true);
    }
  }, [searchParams]);

  const getStart = (type) => {
    setPopUpType(type);
    setOpendPopUp(true);
  }

  const closePopUp = () => {
    setOpendPopUp(false);
    setPopUpType('');
  }

  return (
    <div className='w-full min-h-dvh flex items-center'>
      <div className='w-full flex justify-center gap-[60px]'>
        <div>
          <Image 
            src='https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/1737035043562-study-login-page.png'
            alt="Study login page"
            width={500}
            height={500}
            priority
          />
        </div>
        <div className='my-auto'>
          <div className='flex flex-col gap-[30px]'>
            <p className='text-primaryOrange font-bold text-[40px]'>
              Manage your tasks and projects
              <br />
              More easily
            </p>
            <p className='text-[#707070] font-normal text-[20px]'>
              Organize projects effortlessly with task management, to-do lists
              <br />
              and class reminders—stay prepared for anything!
            </p>
          </div>
          <div className='flex gap-[1rem] mt-[50px]'>
            <button
              className='bg-primaryOrange w-[160px] py-[8px] rounded-[8px] font-semibold text-[14px] text-white'
              onClick={() => getStart('signUp')}
            >
              Get Started
            </button>
            <button
              className='bg-primaryOrange/20 w-[160px] py-[8px] rounded-[8px] font-semibold text-[14px] text-primaryOrange'
            >
              Explore features
            </button>
          </div>
        </div>
      </div>
      <p className='absolute left-[20px] top-[20px] text-primaryOrange font-bold text-[20px]'>
        Taskly
      </p>
      {opendPopUp && <PopUp closePopUp={closePopUp} type={popUpType} setType={setPopUpType} />}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}