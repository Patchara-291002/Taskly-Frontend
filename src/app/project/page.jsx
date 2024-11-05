'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { NewButton } from '../component/GlobalComponent';
import ProjectCard from '../component/dashboarOverview/Project/ProjectCard';
import { fetchProjectsByUserId } from '@/api/project';
import { useSelector } from 'react-redux';

export default function page() {

  const user = useSelector((state) => state.user)
  const userId = user._id

  const [projects, setProjects] = useState([])

  useEffect(() => {
    if (!userId) return;

    const getProjects = async () => {
      try {
        const data = await fetchProjectsByUserId(userId)
        console.log(data)
        setProjects(data)
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }

    getProjects();
  }, [userId])


  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate(); // คืนค่าเป็นตัวเลขของวัน
  };

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' }); 
  };

  const getUsersProfilePictures = (users) => {
    return users.map(user => user.userId.profilePicture);
  };

  return (
    <div
      className='relative w-full z-0'
    >
      <NewButton
        onClick={() => { }}
        buttonText='New'
      />
      <div
        className='grid grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-[15px] mt-[20px] z-10'
      >
        {
          projects.map((project, index) => (
            <ProjectCard
              key={index}
              projectName={project.projectName}
              day={formatDay(project.startDate)}
              month={formatMonth(project.startDate)}
              usersProfile={getUsersProfilePictures(project.users)}
              percent={project.progress}
              maxWidth={350}
            />
          ))
        }
      </div>
      <div
        className='fixed -z-10 bottom-0 -right-0'
      >
        <Image width={351} height={328} alt='project' priority={false} src='/Image/projectcharacter.png' />
      </div>
    </div>
  )
}
