'use client'

import React, { useEffect, useState } from 'react'
import { NewButton, DeleteButton } from '../component/GlobalComponent';
import ProjectCard from '../component/dashboarOverview/Project/ProjectCard';
import NewProject from './component/NewProject';
import { fetchProjectsByUser, createProject } from '@/api/project';
import Link from 'next/link';
import useWindowSize from '@/hooks/useWindow';
import Loading from '@/app/component/GlobalComponent/Loading';

export default function Page() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectName, setProjectName] = useState("");

  const { width } = useWindowSize();

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

  const getProjects = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProjectsByUser();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // สำหรับโหลดข้อมูลใหม่ (เช่น หลังจากสร้างหรือลบโปรเจค)
  const loadProjects = async () => {
    try {
      const data = await fetchProjectsByUser();
      setProjects(data);
    } catch (error) {
      console.error('Error reloading projects:', error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleCreateProject = async () => {
    try {
      setIsCreating(true);
      const newProject = await createProject(projectName, startDate, dueDate);
      setIsOpen(false);
      window.location.href = `/home/project/${newProject._id}`;
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='relative w-full z-0'>
      <div className='w-full flex justify-between items-center'>
        <NewButton
          onClick={() => setIsOpen(true)}
          buttonText='New'
        />
        <DeleteButton
          onDelete={onDelete}
          setOnDelete={setOnDelete}
        />
      </div>
      
      {projects && projects.length > 0 ? (
        <div
          className='grid gap-[15px] mt-[20px] z-10'
          style={{ gridTemplateColumns: getGridTemplateColumns() }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              maxWidth={"none"}
              project={project}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-157px)] flex flex-col items-center justify-center">
          <img
            src="https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/P1/undraw_project-completed_fwjq.png"
            alt="No project"
            className='w-[200px] mb-[10px]'
          />
          <p className="text-[16px] font-medium text-[#D4D4D4]">You don't have any projects yet?</p>
          <p className="text-[14px] font-medium text-[#D4D4D4]">Create your first team project</p>
        </div>
      )}
      
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
            isCreating={isCreating}
          />
        )}
      </>
    </div>
  );
}