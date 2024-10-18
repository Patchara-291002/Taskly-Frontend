import React from 'react'

export const PlusIcon = ({ w, h, color }) => {
    return (
        <svg width={w} height={h} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.1429 7.35714H6.85714V11.6429C6.85714 11.8702 6.76684 12.0882 6.60609 12.2489C6.44535 12.4097 6.22733 12.5 6 12.5C5.77267 12.5 5.55465 12.4097 5.39391 12.2489C5.23316 12.0882 5.14286 11.8702 5.14286 11.6429V7.35714H0.857143C0.629814 7.35714 0.411797 7.26684 0.251051 7.10609C0.090306 6.94535 0 6.72733 0 6.5C0 6.27267 0.090306 6.05465 0.251051 5.89391C0.411797 5.73316 0.629814 5.64286 0.857143 5.64286H5.14286V1.35714C5.14286 1.12981 5.23316 0.911797 5.39391 0.751051C5.55465 0.590306 5.77267 0.5 6 0.5C6.22733 0.5 6.44535 0.590306 6.60609 0.751051C6.76684 0.911797 6.85714 1.12981 6.85714 1.35714V5.64286H11.1429C11.3702 5.64286 11.5882 5.73316 11.7489 5.89391C11.9097 6.05465 12 6.27267 12 6.5C12 6.72733 11.9097 6.94535 11.7489 7.10609C11.5882 7.26684 11.3702 7.35714 11.1429 7.35714Z" fill={color} />
        </svg>
    )
}

export const AddUserIcon = ({ w, h, color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h}  fill="currentColor" viewBox="0 0 24 24">
            <path fill={color} fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
        </svg>
    )
}