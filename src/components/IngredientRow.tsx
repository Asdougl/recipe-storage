import React, { useEffect, useState } from 'react'
import { getUnit } from '../helpers/units'
import { Ingredient, ProtoIngredient } from '../types/Ingredient'
import { Button } from './Button'
import FaIcon from './FaIcon'
import Input from './forms/Input'
import QuantityEditor from './forms/QuantityEditor'

interface Props {
    ing: Ingredient;
    highlight: boolean;
    editable: boolean;
    onChange: (ing: Ingredient) => void;
    onDelete: (id: string) => void;
}

const IngredientRow = ({ ing, highlight, editable, onChange, onDelete }: Props) => {

    console.log("RENDER INGREDIENTROW")

    const [editing, setEditing] = useState(false)
    const [copy, setCopy] = useState({ ...ing })

    const change = (e: React.FormEvent) => {
        e.preventDefault()
        onChange(copy);
        setEditing(false)
    }

    useEffect(() => {
        setCopy({ ...ing })
    },[ing])

    return (
        <li 
            className={`rounded transition-colors group ${highlight? 'bg-yellow-200' : 'bg-transparent'}`}
        >
            <form onSubmit={change} className="flex items-center gap-1">

                {/* Quantity */}
                {!editing ? (
                    <span className="text-right w-16">
                        {ing.qty}
                        {ing.unit && <span className="opacity-50">{getUnit(ing.unit)}</span>}
                    </span>
                ) : (
                    <QuantityEditor 
                        className="w-16 bg-white"
                        value={copy.qty}
                        setValue={val => setCopy(curr => ({ ...curr, qty: val }))}
                        unit={copy.unit}
                        setUnit={val => setCopy(curr => ({ ...curr, unit: val }))}
                        compact
                    />
                )}
                
                {/* TIMES */}
                <span className="text-center opacity-50 px-2">&times; </span>

                {/* Title */}
                {!editing ? (
                    <span className="">{ing.item}</span>
                ):(
                    <Input className="flex-grow" compact value={copy.item} onChange={val => setCopy(curr => ({ ...curr, item: val }))} />
                )}

                {/* Actions */}
                {editable && (<div className="flex">
                    {editing ? (<>
                        <Button onClick={() => setEditing(false)} className="rounded-r-none border-r-0" size="sm">
                            <FaIcon icon="times" />
                        </Button>
                        <Button color="red" className="rounded-l-none rounded-r-none border-l-0 border-r-0" size="sm" onClick={() => onDelete(ing._id)}>
                            <FaIcon icon="trash" />
                        </Button>
                        <Button color="green" className="rounded-l-none border-l-0" size="sm" submit>
                            <FaIcon icon="check" />
                        </Button>
                    </>) : (
                        <button 
                            onClick={() => setEditing(true)}
                            className="opacity-0 group-hover:opacity-50 hover:bg-gray-200 hover:opacity-75 px-1 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        ><FaIcon icon="pencil" size="sm" /></button>
                    )}
                </div>)}
            </form>
        </li>
    )
}

export default IngredientRow
