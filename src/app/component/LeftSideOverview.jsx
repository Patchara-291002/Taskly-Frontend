import React from 'react'
import BannerOverview from './dashboarOverview/BannerOverview'
import ProjectOverview from './dashboarOverview/ProjectOverview'

export default function LeftSideOverview() {
    return (
        <div
            className="
                min-w-[700px]
            "
        >
            <BannerOverview />
            <ProjectOverview />
        </div>
    )
}
