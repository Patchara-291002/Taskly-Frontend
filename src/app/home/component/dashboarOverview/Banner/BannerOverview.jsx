import Image from 'next/image';
import React from 'react';
import { useAuth } from "@/context/AuthContext";

export default function BannerOverview() {
    
    const { user } = useAuth();
    const name = user ? user.name.split(' ')[0] : 'User';

    return (
        <div className='w-full h-[170px] bg-primaryorange rounded-[15px] px-[30px] py-[40px] relative'>
            <div className='flex flex-col gap-[14px] max-w-[300px]'>
                <p className='text-[22px] font-medium text-white'>
                    Welcome back, {name || 'name'}
                </p>
                <p className='text-[14px] font-normal text-white text-wrap'>
                    Experience outstanding work opportunities and efficient task management.
                </p>
            </div>
            <div className='absolute -top-20 right-0'>
                <Image 
                    src='https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/1730785237689-dashboard.png'
                    alt='Banner'
                    width={396}
                    height={227}
                />
            </div>
        </div>
    );
}
