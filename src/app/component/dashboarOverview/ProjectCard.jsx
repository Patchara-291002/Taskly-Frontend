'use client'

import React, { useState } from 'react'

export default function ProjectCard() {

  const [projectName, setProjectName] = useState("");
  const [day , setDate] = useState(0)
  const [month, setMonth] = useState("");
  const [user, setUser] = useState([
    {
      userName: "John",
      userProfile: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    }
  ])
  const [percent, setPercent] = useState(70);

  const data = {
    name: name,
    day: day,
    month: month,
    user: [userName,userProfile],
    percent: percent,
  }

  
  const ProgressBar = () => {

    return (
      <div
        className='w-full h-[5px] bg-[#EDEDED] relative rounded-full'
      >
        <div
          className={`absolute h-full bg-primaryorange rounded-full`}
          style={{ width: `${data.percent}%` }}
        />
      </div>
    )
  }

  return (
    <div
      className='w-[200px] h-[160px] bg-white rounded-[15px] p-[15px] flex flex-col justify-between'
    >
      <div
        className='w-full'
      >
        <div
          className='w-full flex justify-between'
        >
          <p
            className='text-[14px] font-medium'
          >
            {"Production"}
          </p>
          <div
            className='w-[30px] h-[30px] bg-primaryorange rounded-[8px] flex flex-col justify-center items-center'
          >
            <p
              className='text-[8px] font-bold text-white'
            >
              {30}
            </p>
            <p
              className='text-[8px] font-bold text-white'
            >
              {"Sep"}
            </p>
          </div>
        </div>
        <div
          className='flex -space-x-2.5'
        >
          <div
            className='w-[20px] h-[20px] rounded-full overflow-hidden'
          >
            <img src={data.user.userProfile} />
          </div>
          <div
            className='w-[20px] h-[20px] rounded-full overflow-hidden'
          >
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      <div
        className='w-full'
      >
        <p
          className='text-[12px] font-medium'
        >
          Progress
        </p>
        <div
          className='w-full flex flex-row items-center gap-[15px]'
        >
          <ProgressBar />
          <p
            className='text-[12px] font-medium'
          >
            {percent}%
          </p>
        </div>
      </div>
    </div>
  )
}
