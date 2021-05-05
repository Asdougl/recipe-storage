import React, { useState } from 'react'
import { timeDisplay } from '../helpers/time'
import { Step } from '../types/Recipe'
import { Button } from './Button'
import FaIcon from './FaIcon'

interface Props {
    step: Step;
    index: number;
    setCurrIng: (ingids: string[]) => void;
    editable: boolean;
    editing: boolean;
    setEditing: (cb: (curr: number) => number) => void;
}

const StepRow = ({ step, index, setCurrIng, editable, editing, setEditing }: Props) => {
    return (
        <li className={`flex flex-col group ${editing ? 'bg-gray-100' : 'bg-transparent'} rounded`}>
            <div className="flex gap-2 items-center">
                <span className="opacity-50 w-6 text-right">{index + 1}.</span>
                <span>{step.action}</span>
                <span className="text-xs">
                    {step.time && (
                        <span>
                            <FaIcon icon="stopwatch" />&nbsp;
                            <span className="opacity-50">{timeDisplay(step.time)}</span>
                        </span>
                    )}
                    {step.items && step.items.length > 0 && (
                        <span 
                            onMouseEnter={() => step.items ? setCurrIng(step.items) : []}
                            onMouseLeave={() => setCurrIng([])}
                            className="hover:bg-gray-200 rounded"
                        >
                            <FaIcon icon="shopping-basket" />&nbsp;
                            <span className="opacity-50">{step.items.length} items</span>
                        </span>
                    )}
                </span>
                {editable && (
                    <button 
                        onClick={() => setEditing(curr => curr === index ? -1 : index)}
                        className="opacity-0 group-hover:opacity-50 hover:bg-gray-200 hover:opacity-75 px-1 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    ><FaIcon icon="pencil" size="sm" /></button>
                )}
            </div>
            {editing && (
                <div className="flex gap-2 items-center p-1 pl-6">
                    <Button size="sm">items</Button>
                    <Button size="sm">time</Button>
                    <Button size="sm">temp</Button>
                    <Button size="sm">optional</Button>
                </div>
            )}
        </li>
    )
}

export default React.memo(StepRow)
