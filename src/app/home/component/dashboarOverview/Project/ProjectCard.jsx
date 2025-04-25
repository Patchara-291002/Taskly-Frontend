'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { TrashSolidIcon } from '@/app/home/component/icon/GlobalIcon'
import { deleteProject } from '@/api/project'
import Link from 'next/link'

export default function ProjectCard({ project, maxWidth, minWidth=194,  onDelete }) {

  const handleDeleteProject = (e) => {
    e.preventDefault();
    if (project._id) {
      deleteProject(project._id)
        .then(() => {
          console.log("Project deleted successfully")
          window.location.reload()
        })
        .catch((error) => {
          console.error("Error deleting project:", error)
        })
    }
  }

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
          className="absolute h-full bg-primaryOrange rounded-full"
          style={{ width: `${project.progress}%` }}
        />
      </div>
    )
  }

  const usersProfile = project?.users?.map(user => user.userId.profile) || [];

  return (
    <Link
      href={`/home/project/${project._id}`}
    >
      <div
        className={`w-full min-w-[${minWidth}] h-[160px] bg-white rounded-[15px] p-[15px] flex flex-col justify-between border border-grayBorder`}
        // style={{ maxWidth: `${maxWidth}px` }}
      >
        <div className='w-full'>
          <div className='w-full flex justify-between'>
            <p className='text-[14px] font-medium'>
              {project.projectName}
            </p>
            {onDelete ?
              <button
                onClick={handleDeleteProject}
                className='w-[30px] h-[30px] flex justify-center items-center bg-[#FFE0E0] hover:bg-[#FFE0E0] rounded-full z-10'
              >
                <TrashSolidIcon w='16' h='16' color={'#FF0000'} />
              </button>
              :
              <div className='w-[30px] h-[30px] bg-primaryOrange rounded-[8px] flex flex-col justify-center items-center'>
                <p className='text-[8px] font-bold text-white'>
                  {formatDay(project.dueDate)}
                </p>
                <p className='text-[8px] font-bold text-white'>
                  {formatMonth(project.dueDate)}
                </p>
              </div>
            }

          </div>
        </div>
        <div className='w-full'>
          <div className='flex -space-x-2.5'>
            {usersProfile.slice(0, 4).map((profile, index) => (
              <div key={index} className='w-[20px] h-[20px] rounded-full overflow-hidden'>
                <Image width={20} height={20} src={profile} alt={`User ${index}`} />
              </div>
            ))}
          </div>
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
    </Link>
  )
}
