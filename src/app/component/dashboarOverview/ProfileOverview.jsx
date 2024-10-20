'use client'

import React from 'react'
import { EditIcon } from '../icon/GlobalIcon'

export default function ProfileOverview() {
  return (
    <div
        className='
            w-full
            h-[198px]
            flex
            flex-col
            justify-between
        '
    >
      <div
        className='
            flex
            justify-between
        '
      >
        <p
            className='
                font-medium
            '
        >
            Profile
        </p>
        <button
            className=''
        >
            <EditIcon w={16} h={16} color={'black'} />
        </button>
      </div>
      <div
        className='
            flex
            flex-col
            justify-center
            items-center
            gap-[20px]
        '
      >
        <div
            className='
                w-[85px]
                h-[85px]
                rounded-full
                overflow-hidden
            '
        >
            <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'/>
        </div>
        <div
            className='
                flex
                flex-col
                items-center
            '
        >
            <p
                className='
                    text-[14px]
                    font-medium
                '
            >
                {"Supawan Malaihuan"}
            </p>
            <p
                className='
                    text-[12px]
                    font-normal
                    text-[#707070]
                '
            >
                {"@supawan08"}
            </p>
        </div>
      </div>
    </div>
  )
}
