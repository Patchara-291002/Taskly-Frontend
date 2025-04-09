import { LinkIcon, PlusIcon, PlusIcon2, TrashSolidIcon } from '@/app/home/component/icon/GlobalIcon'
import { updateProjectById } from '@/api/project'
import React, { useState, useEffect, useRef } from 'react'
import { createContent, deleteContent } from '@/api/project'

export default function ProjectNote({ project, loadProject }) {
  const [projectPayload, setProjectPayload] = useState({
    ...project,
    contents: project?.contents ?? [],
  });

  useEffect(() => {
    if (project) {
      setProjectPayload(prev => ({
        ...prev,
        ...project,
        contents: project.contents ?? [],
      }));
    }
  }, [project]);

  useEffect(() => {
    if (projectPayload._id) {
      const delay = setTimeout(() => {
        updateProjectById(projectPayload._id, projectPayload);
      }, 1000);

      return () => clearTimeout(delay);
    }
  }, [projectPayload]);

  const handleContentUpdate = (index, updates) => {
    setProjectPayload(prev => {
      const updatedContents = [...prev.contents];
      updatedContents[index] = {
        ...updatedContents[index],
        ...updates
      };
      return {
        ...prev,
        contents: updatedContents
      };
    });
  };

  const handleCreateContent = async () => {
    try {
      await createContent(projectPayload._id);
      loadProject();
    } catch (error) {
      console.error("❌ Failed to create content:", error);
    }
  };

  return (
    <div className='relative w-full max-h-[300px] overflow-hidden'>
      <div className='w-full h-[300px] z-10 bg-white rounded-[15px] p-[10px] border-[1px] border-grayBorder overflow-y-auto no-scrollbar'>
        <div className='w-full flex flex-col gap-[10px]'>
          {projectPayload?.contents?.map((content, index) => (
            <NoteCard
              key={index}
              content={content}
              onUpdate={(updates) => handleContentUpdate(index, updates)}
              projectId={projectPayload._id}
              loadProject={loadProject}
            />
          ))}
        </div>
        <button
          className='absolute bottom-2 right-2 w-[40px] h-[40px] bg-primaryOrange rounded-full flex justify-center items-center cursor-pointer'
          onClick={handleCreateContent}
        >
          <PlusIcon2 w={10} h={10} color={"#FFFFFF"} />
        </button>
      </div>
    </div>
  )
}

const NoteCard = ({ projectId, loadProject, content, onUpdate }) => {
  const [isLink, setIsLink] = useState(content.isLink || false);
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustHeight();
  }, [content.content]);

  const handleDeleteContent = async () => {
    try {
      await deleteContent(projectId, content._id);
      loadProject();
    } catch (error) {
      console.error("❌ Failed to create content:", error);
    }
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleTitleChange = (e) => {
    onUpdate({ title: e.target.value });
  };

  const handleContentChange = (e) => {
    onUpdate({ content: e.target.value });
    adjustHeight();
  };

  const toggleLink = () => {
    const newIsLink = !isLink;
    setIsLink(newIsLink);
    onUpdate({ isLink: newIsLink });
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='w-full min-h-[73px] h-full p-[10px] border border-grayBorder rounded-[15px]'>
      <div className='w-full flex justify-between items-center'>
        <input
          type="text"
          value={content.title}
          onChange={handleTitleChange}
          className='text-[#5F5F5F] font-medium bg-transparent outline-none w-full'
          placeholder='Enter your title'
        />
        <div
          className='flex items-center gap-[10px]'
        >
          <button
            onClick={toggleLink}
            className={`p-2 rounded-full transition-colors ${isLink ? 'bg-orange-100' : ''}`}
          >
            <LinkIcon w={12} h={12} color={isLink ? "#FF6200" : "#CBCBCB"} />
          </button>
          <button
            className={`p-2 rounded-full transition-colors hover:bg-red-100`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleDeleteContent}
          >
            <TrashSolidIcon w={12} h={12} color={isHovered ? "red" : "#CBCBCB"} />
          </button>
        </div>
      </div>
      <div>
        {isLink ? (
          <a
            href={content.content}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline block truncate hover:text-blue-600"
            title={content.content} 
          >
            {content.content}
          </a>
        ) : (
          <textarea
            ref={textareaRef}
            value={content.content}
            onChange={handleContentChange}
            className='w-full min-h-[20px] text-[#CBCBCB] font-normal text-[14px] 
              mt-[8px] bg-transparent outline-none resize-none overflow-hidden'
            placeholder='Enter your content'
          />
        )}
      </div>
    </div>
  )
}