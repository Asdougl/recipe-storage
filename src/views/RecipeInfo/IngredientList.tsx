import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../components/Button'
import FaIcon from '../../components/FaIcon'
import Input from '../../components/forms/Input'
import QuantityEditor from '../../components/forms/QuantityEditor'
import IngredientRow from '../../components/IngredientRow'
import { createIngredient, Ingredient, ProtoIngredient } from '../../types/Ingredient'

interface Props {
    ingredients: Ingredient[]
    currIngredients: string[]
    editable: boolean
    onEdit: (ing: Ingredient) => void;
    onAdd: (ing: ProtoIngredient) => void;
    onDelete: (id: string) => void;
}

const IngredientList = ({ ingredients, currIngredients, editable, onEdit, onAdd, onDelete }: Props) => {

    const [newIng, setNewIng] = useState(createIngredient())
    const [addNew, setAddNew] = useState(false)

    const quantityRef = useRef<HTMLInputElement | null>(null)

    const add = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(newIng);
        setNewIng(createIngredient())
        setAddNew(false)
    }

    const cancel = () => {
        setAddNew(false)
        setNewIng(createIngredient())
    }

    useEffect(() => {
        if(quantityRef.current) quantityRef.current.focus()
        else console.log("NOØøøøøø")
    },[addNew])

    return (
        <div>
            <div className="flex justify-between items-center px-4">
                <h2 className="text-2xl font-bold">Ingredients</h2>
            </div>
            <ul className="px-2 pb-2">
                {ingredients.map(ing => (
                    <IngredientRow 
                        key={ing._id} 
                        ing={ing} 
                        highlight={currIngredients.includes(ing._id)} 
                        editable={editable} 
                        onChange={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
            {editable && (
                addNew ? (
                    <form onSubmit={add} className="flex rounded items-center px-2 gap-1">
                        <QuantityEditor 
                            className="w-16 h-full bg-white"
                            value={newIng.qty}
                            setValue={val => setNewIng(curr => ({ ...curr, qty: val }))}
                            unit={newIng.unit}
                            setUnit={val => setNewIng(curr => ({ ...curr, unit: val }))}
                            compact
                            ref={quantityRef}
                        />
                        <span className="px-2">&times;</span>
                        <Input 
                            className="flex-grow"
                            value={newIng.item}
                            onChange={val => setNewIng(curr => ({ ...curr, item: val }))}
                            compact
                        />
                        <Button size="sm" submit>
                            <FaIcon icon="plus" />
                        </Button>
                        <Button size="sm" onClick={cancel}>
                            <FaIcon icon="times" />
                        </Button>
                    </form>
                
                ) : (
                    <button 
                        className="text-sm w-full flex justify-center items-center hover:bg-gray-100 py-1 rounded focus:outline-none focus:ring focus:ring-blue-300 opacity-40 hover:opacity-100"
                        onClick={() => setAddNew(true)}
                    >
                        <FaIcon icon="plus" /> Add Ingredient
                    </button>
                )
            )}
        </div>
    )
}

export default IngredientList
