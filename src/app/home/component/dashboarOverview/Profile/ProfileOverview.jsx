'use client'

import React from 'react'
import { EditIcon } from '../../icon/GlobalIcon';
import { useAuth } from "@/context/AuthContext";

export default function ProfileOverview() {

    const { user } = useAuth();

    const Avatar  = "https://avatars.githubusercontent.com/u/119255542?s=48&v=4"
    
    return (
        <div className='w-full h-[198px] flex flex-col justify-between'>
            <div className='flex justify-between'>
                <p className='font-medium'>Profile</p>
                <button>
                    <EditIcon w={16} h={16} color={'black'} />
                </button>
            </div>
            <div className='flex flex-col justify-center items-center gap-[20px]'>
                <div className='w-[85px] h-[85px] rounded-full overflow-hidden'>
                    {user && <img src={user.profile ? user.profile : Avatar} alt="Profile" referrerPolicy="no-referrer"/> }
                </div>
                {/* <div className='flex flex-col items-center'>
                    <p className='text-[14px] font-medium'>{'User Name'}</p>
                    <p className='text-[12px] font-normal text-[#707070]'>{user?.username || '@username'}</p>
                </div> */}
            </div>
        </div>
    )
}
