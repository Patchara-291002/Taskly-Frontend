import React from 'react'
import ProfileOverview from './Profile/ProfileOverview'
import ClassOverview from './ClassToDay/ClassOverview'
import ChartOverview from './Chart/ChartOverview'
import Assignment from './Assignment/Assignment'

export default function RightSideOverview() {
    return (
        <div
            className="
                max-w-[420px]
                min-w-[360px]
                w-full
                flex
                flex-col
                gap-[40px]
            "
        >
            <ProfileOverview />
            <ClassOverview />
            <Assignment />
            {/* <ChartOverview /> */}
        </div>
    )
}
