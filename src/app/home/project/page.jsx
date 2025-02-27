'use client'

import React, { useEffect, useState } from 'react'
import { NewButton } from '../component/GlobalComponent';
import ProjectCard from '../component/dashboarOverview/Project/ProjectCard';
import NewProject from './component/NewProject';
import { fetchProjectsByUser, createProject } from '@/api/project';
import Link from 'next/link';

export default function page() {

  const [projects, setProjects] = useState([])
  

  useEffect(() => {

    const getProjects = async () => {
      try {
        const data = await fetchProjectsByUser()
        console.log(data)
        setProjects(data)
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }

    getProjects();
  }, [])

  const [isOpen, setIsOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectName, setProjectName] = useState("")

  const handleCreateProject = async () => {
    try {
      const newProject = await createProject(projectName, startDate, dueDate);
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  }
  return (
    <div
      className='relative w-full z-0'
    >
      <div
        className='w-full flex justify-between items-center'
      >
        <NewButton
          onClick={() => setIsOpen(true)}
          buttonText='New'
        />
      </div>
      <div
        className='grid grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-[15px] mt-[20px] z-10'
      >
        {projects &&
          projects.map((project, index) => (
            <Link
              key={index}
              href={`/home/project/${project._id}`}
            >
              <ProjectCard
                maxWidth={350}
                project={project}
              />
            </Link>
          ))
        }
      </div>
      {/* <div
        className='fixed -z-10 bottom-0 -right-0'
      >
        <Image width={351} height={328} alt='project' priority={false} src='/Image/projectcharacter.png' />
      </div> */}
      {isOpen && (
        <NewProject
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          startDate={startDate}
          setStartDate={setStartDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          projectName={projectName}
          setProjectName={setProjectName}
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  )
}
