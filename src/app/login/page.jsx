'use client'

import React, { useState } from 'react';

export default function LoginPage() {
  // const handleLogin = () => {
  //   window.location.href = 'http://localhost:3000/auth/google';
  // };

  const LeftSide = () => {

    const [isHover, setIsHover] = useState(false)

    return (
      <div
        className='w-full min-h-dvh flex justify-center items-center'
      >
        <p
          className='absolute top-[20px] left-[20px] text-primaryorange font-bold text-[20px]'
        >
          TASKLY
        </p>
        <div
          className='flex flex-col items-center gap-[20px]'
        >
          <p
            className='text-primaryorange text-[36px] font-bold'
          >
            Sign in to Taskly
          </p>
          <div
            className='flex flex-col items-center gap-[10px]'
          >
            <div
              className='w-[55px] h-[55px] border-2 border-[#D9D9D9] rounded-full'
            >
            </div>
            <p
              className='text-[#BEBEBE] text-[14px] font-normal'
            >
              or use your email for registration
            </p>
          </div>
          <div
            className='flex flex-col items-center gap-[10px]'
          >
            <input
              className='w-[500px] h-[50px] bg-[#EEEBEA] rounded-[10px]'
            />
            <input
              className='w-[500px] h-[50px] bg-[#EEEBEA] rounded-[10px]'
            />
          </div>
          <p
            className='text-black text-[16px] font-medium'
          >
            Forgot your password ?
          </p>
          <div
            className={`flex justify-center items-center w-[235px] h-[60px] mt-[40px] rounded-full ${ isHover ? "bg-white" : "bg-primaryorange"}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <p
              className={`text-[20px] font-bold ${ isHover ? "text-primaryorange" : "text-white"}`}
            >
              SIGN IN
            </p>
          </div>
        </div>
      </div>
    )
  }
  const RightSide = () => {

    const [isHover, setIsHover] = useState(false)
    
    return (
      <div
        className='w-full max-w-[500px] h-dvh bg-primaryorange'
      >
        <div
          className='w-full h-full flex flex-col justify-center items-center gap-[20px]'
        >
          <p
            className='text-white text-[36px] font-bold'
          >
            Welcome Back
          </p>
          <p
            className='text-white text-[18px] font-normal'
          >
            Enter your personal detail
            <br></br>
            and start journey with us
          </p>
          <div
            className={`flex justify-center items-center w-[235px] h-[60px] mt-[40px] rounded-full ${ isHover ? "bg-white border-0" : "bg-none border-2"}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => ""}
          >
            <p
              className={`text-[20px] font-bold ${ isHover ? "text-primaryorange" : "text-white"}`}
            >
              SIGN UP
            </p>
          </div>
        </div>
      </div>
    )
  }
  return (
    // <div>
    //   <h1>Login</h1>
    //   <button onClick={handleLogin}>
    //     Login with Google
    //   </button>
    // </div>
    <div
      className='w-full min-h-dvh flex flex-row'
    >
      <LeftSide />
      <RightSide />
    </div>
  );
}


