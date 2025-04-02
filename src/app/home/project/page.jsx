'use client'

import React, { useEffect, useState } from 'react'
import { NewButton } from '../component/GlobalComponent';
import ProjectCard from '../component/dashboarOverview/Project/ProjectCard';
import NewProject from './component/NewProject';
import { fetchProjectsByUser, createProject } from '@/api/project';
import Link from 'next/link';
import useWindowSize from '@/hooks/useWindow';
import { is } from 'date-fns/locale';

export default function page() {

  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1440;

  const getGridTemplateColumns = () => {
    if (width < 444) {
      return 'repeat(1, 1fr)';
    }
    if (width >= 444 && width < 684) {
      return 'repeat(2, 1fr)';
    }
    if (width >= 684 && width < 1000) {
      return 'repeat(3, 1fr)';
    }
    if (width >= 1000 && width < 1440) {
      return 'repeat(4, 1fr)';
    }
    return 'repeat(5, 1fr)';
  };

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
        className='grid gap-[15px] mt-[20px] z-10'
        style={{ gridTemplateColumns: getGridTemplateColumns() }}
      >
        {projects &&
          projects.map((project, index) => (
            <Link
              key={index}
              href={`/home/project/${project._id}`}
            >
              <ProjectCard
                maxWidth={"none"}
                project={project}
              />
            </Link>
          ))
        }
      </div>
      <>
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
      </>
    </div>
  )
}
