'use client'

import React from 'react'
import Chart from './Chart';

export default function ChartOverview() {

    return (
        <div
            className='w-full h-[230px] bg-white rounded-[15px] p-[15px]'
        >
            <div
                className='w-full h-full'
            >
                <div>
                    <p
                        className='font-medium'
                    >
                        All task by completion status
                    </p>
                </div>
                <div
                    className='w-full h-full flex items-center justify-center gap-[30px]'
                >

                    <div
                        className='w-[128px]'
                    >
                        <Chart />
                    </div>
                    <div
                        className='flex flex-col justify-between h-[94px]'
                    >
                        <div
                            className='flex flex-row items-center gap-[7px]'
                        >
                            <div>
                                <div className='w-[12px] h-[12px] rounded-full bg-[#3479FF]' />
                            </div>
                            <p
                                className='text-[12px]'
                            >
                                {`Complete ${"50"}%`}
                            </p>
                        </div>
                        <div
                            className='flex flex-row items-center gap-[7px]'
                        >
                            <div>
                                <div className='w-[12px] h-[12px] rounded-full bg-[#FFC56A]' />
                            </div>
                            <p
                                className='text-[12px]'
                            >
                                {`In progress ${"40"}%`}
                            </p>
                        </div>
                        <div
                            className='flex flex-row items-center gap-[7px]'
                        >
                            <div>
                                <div className='w-[12px] h-[12px] rounded-full bg-[#5AC3B4]' />
                            </div>
                            <p
                                className='text-[12px]'
                            >
                                {`Fail ${"10"}%`}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
