import React from 'react'

export const LeftArrowIcon = ({ w, h, color }) => {
    return (
        <svg width={w} height={h} viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.00024 6.99927L1.00024 3.99927L4.00024 0.999267" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export const RightArrowIcon = ({ w, h, color }) => {
    return (
        <svg width={w} height={h} viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.999755 1.00073L3.99976 4.00073L0.999755 7.00073" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
