import React, { FC } from 'react'
import { useStore } from '../../store'


export const ChartIcon: FC = ({ }) => {
    const { darkMode } = useStore(s => s)
    const backgroundColor = darkMode ? ' #DADCE0 ' : ' #0000007d '
    const barsColor = darkMode ? ' #273B4A ' : ' white '
    return (
        <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4.93549" y="6" width="29.6129" height="24" rx="2" fill={`${backgroundColor}`} fillOpacity="1" />
            <path d="M13.1613 15L13.1613 24" stroke={barsColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.7419 18V24" stroke={barsColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26.3226 12V24" stroke={barsColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
