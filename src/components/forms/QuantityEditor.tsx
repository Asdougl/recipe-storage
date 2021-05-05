import React, { useEffect, useState } from 'react'
import { isUnit, Unit } from '../../types/Ingredient'
import { formatUnit, fromShorthand } from '../../helpers/units'
import FaIcon from '../FaIcon'

interface Props {
    value: number;
    setValue: (val: number) => void;
    unit?: string;
    setUnit?: (unit?: Unit) => void;
    className?: string;
    compact?: boolean;
}

const QuantityEditor = React.forwardRef<HTMLInputElement, Props>(({ value, setValue, unit, setUnit, className, compact }: Props, ref) => {

    const [current, setCurrent] = useState(formatUnit(value, unit))
    const [valid, setValid] = useState(true)

    // const process = (value: string) => {
        
    // }

    useEffect(() => {
        const match = current.match(/^([0-9./]+)\s*([a-zA-Z]*)$/)
        if(match) {
            setValid(true);
            const fractionmatch = match[1].match(/(\d+)\/(\d+)/);
            if(fractionmatch) {
                setValue(+fractionmatch[1] / +fractionmatch[2])
            } else {
                setValue(!isNaN(+match[1]) ? +match[1] : 0)
            }
            if(setUnit && match[2]) {
                // Got units
                if(isUnit(match[2])) {
                    setUnit(match[2])
                } else {
                    const trimmed = match[2].slice(0, -1);
                    if(isUnit(trimmed)) {
                        setUnit(trimmed)
                    } else {
                        const longhand = fromShorthand(match[2])
                        if(longhand) {
                            setUnit(longhand)
                        } else {
                            setUnit(undefined)
                            setValid(false)
                        }
                    }
                }
                
            }
        } else {
            setValue(0)
            setUnit?.(undefined)
            setValid(false)
        }
    },[current])

    return (
        <div className={`border rounded flex items-center ${!compact ? 'px-2 py-1' : 'px-1 py-0'} focus-within:ring ${valid ? 'focus-within:ring-green-300 border-green-400' : 'focus-within:ring-red-300 border-red-400'} ${className}`}>
            <input 
                type="text"
                value={current}
                onChange={e => setCurrent(e.currentTarget.value)}
                className="w-0 bg-transparent flex-grow focus:outline-none"
                ref={ref}
            />
        </div>
    )
})

export default QuantityEditor
