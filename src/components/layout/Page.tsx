import React, { FC } from 'react'

type PageWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface Props {
    title?: string;
    width?: PageWidth;
}

const widthClassName = (width?: PageWidth) => {
    switch(width) {
        case 'sm': return 'max-w-screen-sm';
        case 'md': return 'max-w-screen-md';
        case 'lg': return 'max-w-screen-lg';
        case 'xl': return 'max-w-screen-xl';
        default: return 'max-w-screen-2xl';
    }
}

const Page: FC<Props> = ({ title, width, children }) => {
    return (
        <div className="w-screen flex justify-center">
            <div className={`w-full px-4 py-2 ${widthClassName(width)}`}>
                {title && <h2 className="text-4xl font-bold lg:px-8 py-4">{title}</h2>}
                {children}
            </div>
        </div>
    )
}

export default Page
