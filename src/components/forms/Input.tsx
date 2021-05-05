import React, { useRef } from 'react'

interface Props {
    value: string;
    onChange: (val: string) => void;
    password?: boolean;
    placeholder?: string;
    label?: string;
    error?: string | boolean;
    className?: string;
    compact?: boolean;
}

const genId = () => Math.random().toString(36).substr(2, 7);

const Input = React.forwardRef<HTMLInputElement, Props>(({ value, onChange, password, placeholder, label, error, className, compact }, ref) => {

    const id = useRef(genId())

    return (
        <div className={`flex flex-col gap-1 ${!compact ? 'py-2' : ''} ${className}`}>
            {label && <label htmlFor={id.current} className="text-sm">{label}</label>}
            <input 
                id={id.current}
                type={!password ? 'text' : 'password'}
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
                className={`border rounded focus:outline-none focus:ring focus:ring-blue-200 shadow-sm ${!compact ? 'px-3 py-1' : 'px-1'} ${error ? 'border-red-300' : 'border-gray-300'}`}
                placeholder={placeholder}
                ref={ref}
            />
            {typeof error === 'string' && error}
        </div>
    )
})

export default Input
