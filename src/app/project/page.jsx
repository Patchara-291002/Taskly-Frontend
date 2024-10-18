'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import { PlusIcon } from '../component/icon/GlobalIcon'
import { NewButton } from '../component/GlobalComponent';
import ProjectCard from '../component/dashboarOverview/ProjectCard';

export default function page() {

  const [isHover, setIsHover] = useState(false);

  const projects = [
    {
      projectName: "Project 1",
      day: 30,
      month: "Sep",
      percent: 70,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
    {
      projectName: "Project 2",
      day: 29,
      month: "Sep",
      percent: 40,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
    {
      projectName: "Project 2",
      day: 29,
      month: "Sep",
      percent: 40,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
    {
      projectName: "Project 2",
      day: 29,
      month: "Sep",
      percent: 40,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
    {
      projectName: "Project 2",
      day: 29,
      month: "Sep",
      percent: 40,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
    {
      projectName: "Project 2",
      day: 29,
      month: "Sep",
      percent: 40,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
    {
      projectName: "Project 2",
      day: 29,
      month: "Sep",
      percent: 40,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
    {
      projectName: "Project 2",
      day: 29,
      month: "Sep",
      percent: 40,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
    {
      projectName: "Project 2",
      day: 29,
      month: "Sep",
      percent: 40,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
    {
      projectName: "Project 2",
      day: 29,
      month: "Sep",
      percent: 40,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
    {
      projectName: "Project 2",
      day: 29,
      month: "Sep",
      percent: 40,
      usersProfile: [
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      ]
    },
  ];

  return (
    <div
      className=''
    >
      <NewButton
        onClick={() => { }}
        buttonText='New'
      />
      <div
        className='grid grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-[15px] mt-[20px]'
      >
        {
          projects.map((project, index) => (
            <ProjectCard
              key={index}
              projectName={project.projectName}
              day={project.day}
              month={project.month}
              usersProfile={project.usersProfile}
              percent={project.percent}
              maxWidth={268}
            />
          ))
        }
      </div>
      <div
        className='w-full flex justify-end relative'
      >
        <div
          className='absolute -right-12'
        >
          <Image width={351} height={328} src='/Image/projectcharacter.png' />
        </div>
      </div>
    </div>
  )
}
