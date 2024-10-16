'use client'

import React, { useState } from 'react'

export default function ProjectCard({projectName, day, month, usersProfile, percent, maxWidth}) {

  const ProgressBar = () => {

    return (
      <div
        className='w-full h-[5px] bg-[#EDEDED] relative rounded-full'
      >
        <div
          className={`absolute h-full bg-primaryorange rounded-full`}
          style={{ width: `${percent}%` }}
        />
      </div>
    )
  }

  return (
    <div
      className='w-full h-[160px] bg-white rounded-[15px] p-[15px] flex flex-col justify-between'
      style={{maxWidth: `${maxWidth}px`}}
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
            {projectName}
          </p>
          <div
            className='w-[30px] h-[30px] bg-primaryorange rounded-[8px] flex flex-col justify-center items-center'
          >
            <p
              className='text-[8px] font-bold text-white'
            >
              {day}
            </p>
            <p
              className='text-[8px] font-bold text-white'
            >
              {month}
            </p>
          </div>
        </div>
        <div
          className='flex -space-x-2.5'
        >
           {usersProfile.map((profile, index) => (
            <div key={index} className='w-[20px] h-[20px] rounded-full overflow-hidden'>
              <img src={profile} alt={`User ${index}`} />
            </div>
          ))}
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
