import React from 'react'
import { CrossIcon } from '@/app/home/component/icon/GlobalIcon'

export default function PopUp( {closePopUp} ) {
    return (
        <div
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-10'
        >
            <div
                className='w-full h-full flex justify-center items-center'ห
            >
                <div
                    className='relative w-[560px] h-[600px] bg-white'
                >
                    <button
                        className='absolute right-[20px] top-[20px]'
                        onClick={closePopUp}
                    >
                        <CrossIcon w='15' h='15' color='black' />
                    </button>
                </div>
            </div>
        </div>
    )
}
