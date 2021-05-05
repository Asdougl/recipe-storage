import React, { FC } from 'react'
import { Link } from 'react-router-dom';

type ButtonColor = 'blue' | 'green' | 'red' | 'yellow';

type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
    color?: ButtonColor;
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    submit?: boolean;
    children?: React.ReactNode;
}

const colors = (color?: ButtonColor) => {
    switch(color) {
        case 'blue': {
            return 'bg-blue-200 text-blue-500 focus:ring-blue-300 border-blue-200'
        }
        case 'green': {
            return 'bg-green-200 text-green-600 focus:ring-green-300'
        }
        case 'red': {
            return 'bg-red-200 text-red-500 focus:ring-red-300'
        }
        case 'yellow': {
            return 'bg-yellow-200 text-yellow-600 focus:ring-yellow-300'
        }
        default: {
            return 'bg-gray-200 text-gray-500 focus:ring-gray-300'
        }
    }
}

const sizeClass = (size?: ButtonSize) => {
    switch(size) {
        case 'sm': {
            return 'px-1 py-0'
        }
        case 'lg': {
            return 'px-4 py-2'
        }
        default: {
            return 'px-2 py-1'
        }
    }
}

interface ButtonProps extends BaseProps {
    onClick?: () => void;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, color, onClick, disabled, className, size, submit }, ref) => {
    return (
        <button
            onClick={onClick}
            className={`${sizeClass(size)} rounded-lg ${colors(color)} focus:outline-none focus:ring hover:bg-opacity-60 border transition-colors ${className}`}
            disabled={disabled}
            type={!submit ? 'button' : 'submit'}
            ref={ref}
        >
            {children}
        </button>
    )
})

interface LinkButtonProps extends BaseProps {
    to: string;
}

export const LinkButton = ({ children, color, className, to }: LinkButtonProps) => {
    return (
        <Link 
            to={to}
            className={`px-4 py-1 rounded-lg ${colors(color)} focus:outline-none focus:ring hover:bg-opacity-60 border transition-colors ${className}`}
        >
            {children}
        </Link>
    )
}

export const CircleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, color, onClick, disabled, className }, ref) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1 rounded-lg ${colors(color)} focus:outline-none focus:ring hover:bg-opacity-60 border transition-colors ${className}`}
            disabled={disabled}
            ref={ref}
        >
            {children}
        </button>
    )
})