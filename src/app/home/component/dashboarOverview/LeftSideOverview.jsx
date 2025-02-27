import React from 'react'
import BannerOverview from './Banner/BannerOverview'
import ProjectOverview from './Project/ProjectOverview'
import TaskOverview from './Task/TaskOverview'

export default function LeftSideOverview() {
    return (
        <div
            className="
                min-w-[700px]
                w-full
            "
        >
            <BannerOverview />
            <ProjectOverview />
            <TaskOverview />
        </div>
    )
}
