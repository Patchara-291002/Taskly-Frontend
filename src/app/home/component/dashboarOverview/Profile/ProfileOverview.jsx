'use client'
import Image from 'next/image'
import React from 'react'
import { EditIcon } from '../../icon/GlobalIcon';
import { useAuth } from "@/context/AuthContext";

export default function ProfileOverview() {

    const { user } = useAuth();

    const Avatar  = "https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/P1/profile.png"
    
    return (
        <div className='w-full h-[198px] flex flex-col justify-between bg-white border border-grayBorder rounded-[10px] p-[15px]'>
            <div className='flex justify-between'>
                {/* <p className='font-medium'>Profile</p> */}
                {/* <button>
                    <EditIcon w={16} h={16} color={'black'} />
                </button> */}
            </div>
            <div className='flex flex-col justify-center items-center h-full gap-[20px]'>
                <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                    {user && <Image width={100} height={100} src={user.profile ? user.profile : Avatar} alt="Profile" referrerPolicy="no-referrer"/> }
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-[14px] font-medium'>{user?.name || "userName"}</p>

                </div>
            </div>
        </div>
    )
}
