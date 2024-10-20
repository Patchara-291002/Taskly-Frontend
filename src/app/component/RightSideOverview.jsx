import React from 'react'
import ProfileOverview from './dashboarOverview/ProfileOverview'

export default function RightSideOverview() {
    return (
        <div
            className="
                max-w-[420px]
                min-w-[360px]
                w-full
            "
        >
            <ProfileOverview />
        </div>
    )
}
