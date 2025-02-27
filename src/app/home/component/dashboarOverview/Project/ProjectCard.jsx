'use client'

import React, { useState } from 'react'

export default function ProjectCard({ project, maxWidth }) {

  console.log(project)

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
  };

  // Component ProgressBar แสดงแถบความคืบหน้า
  const ProgressBar = () => {
    return (
      <div className='w-full h-[5px] bg-[#EDEDED] relative rounded-full'>
        <div
          className="absolute h-full bg-primaryorange rounded-full"
          style={{ width: `${project.progress}%` }}
        />
      </div>
    )
  }

  // ดึงข้อมูล profile จาก users ใน project
  const usersProfile = project?.users?.map(user => user.userId.profile) || [];

  return (
    <div
      className='w-full h-[160px] bg-white rounded-[15px] p-[15px] flex flex-col justify-between'
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <div className='w-full'>
        <div className='w-full flex justify-between'>
          <p className='text-[14px] font-medium'>
            {project.projectName}
          </p>
          <div className='w-[30px] h-[30px] bg-primaryorange rounded-[8px] flex flex-col justify-center items-center'>
            <p className='text-[8px] font-bold text-white'>
              {formatDay(project.dueDate)}
            </p>
            <p className='text-[8px] font-bold text-white'>
              {formatMonth(project.dueDate)}
            </p>
          </div>
        </div>
        <div className='flex -space-x-2.5'>
          {usersProfile.map((profile, index) => (
            <div key={index} className='w-[20px] h-[20px] rounded-full overflow-hidden'>
              <img src={profile} alt={`User ${index}`} />
            </div>
          ))}
        </div>
      </div>
      <div className='w-full'>
        <p className='text-[12px] font-medium'>
          Progress
        </p>
        <div className='w-full flex flex-row items-center gap-[15px]'>
          <ProgressBar />
          <p className='text-[12px] font-medium'>
            {project.progress}%
          </p>
        </div>
      </div>
    </div>
  )
}
