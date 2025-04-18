import React, { useState } from 'react'
import { PlusIcon, TrashIcon, TrashSolidIcon } from './icon/GlobalIcon'

export const NewButton = ({ onClick, buttonText = "New" }) => {

    const [isHover, setIsHover] = useState(false)

    return (
        <button
            className='px-[14px] py-[4px] border-[1px] rounded-full border-primaryOrange hover:bg-primaryOrange'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
        >
            <div
                className='flex flex-row gap-[5px] justify-center items-center'
            >
                <PlusIcon w='12' h='12' color={isHover ? '#FFFFFF' : '#FF6200'} />
                <p
                    className={`text-[14px] ${isHover ? 'text-white' : 'text-primaryOrange'}`}
                >
                    {buttonText}
                </p>
            </div>
        </button>
    )
}

export const AddUserButton = ({ onClick, buttonText = "New" }) => {

    const [isHover, setIsHover] = useState(false)

    return (
        <button
            className='px-[14px] py-[4px] border-[1px] rounded-full border-primaryorange hover:bg-primaryorange'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
        >
            <div
                className='flex flex-row gap-[5px] justify-center items-center'
            >
                <PlusIcon w='12' h='12' color={isHover ? '#FFFFFF' : '#FF6200'} />
                <p
                    className={`text-[14px] ${isHover ? 'text-white' : 'text-primaryorange'}`}
                >
                    {buttonText}
                </p>
            </div>
        </button>
    )
}

export const BlurBackground = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <div
            className='fixed inset-0 flex items-center justify-center z-10'
            onClick={onClose}
        >
            <div 
                className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
            ></div>
            <div className='w-full flex justify-center  z-20'
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export const DeleteButton = ({ onDelete, setOnDelete }) => {

    return (
        <div>
            <button
                onClick={() => setOnDelete(!onDelete)}
            >
                <div
                    className='w-[30px] h-[30px] flex justify-center items-center rounded-full'
                    style={{ background: onDelete ? '#FFE0E0' : '' }}
                >
                    <TrashSolidIcon w='16' h='16' color={ onDelete ? '#FF0000' : '#CBCBCB'} />
                </div>
            </button>
        </div>
    )
}