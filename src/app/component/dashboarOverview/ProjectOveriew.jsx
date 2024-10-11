import React from 'react'
import ProjectCard from './ProjectCard'
import { LeftArrowIcon, RightArrowIcon } from '../icon/DashboardIcon'

export default function ProjectOveriew() {
  return (
    <div
        className='max-w-[632px] max-h-[202px] min-h-min w-full h-full'
    >
        <div 
            className='w-full flex flex-row justify-between mb-[20px]'
        >
            <h2 className='text-black font-medium'>
                Project Overview
            </h2>
            <div
                className='flex gap-[15px] items-center'
            >
                <button
                    className='w-[20px] h-[20px] flex justify-center items-center border-[1px] border-black rounded-full'
                >
                    <LeftArrowIcon w='6' color='black' />
                </button>
                <button
                    className='w-[20px] h-[20px] flex justify-center items-center border-[1px] border-black rounded-full'
                >
                    <RightArrowIcon w='6' color='black' />
                </button>
            </div>
        </div>
        <div className='w-full h-full flex justify-between'>
            <ProjectCard />
        </div>
    </div>
  )
}
