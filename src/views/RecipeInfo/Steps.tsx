import React, { useState } from 'react'
import { Recipe } from '../../types/Recipe'
import FaIcon from '../../components/FaIcon'
import { timeDisplay } from '../../helpers/time'
import { Button } from '../../components/Button'
import StepRow from '../../components/StepRow'

interface Props {
    recipe: Recipe;
    setCurrIng: (ings: string[]) => void;
    editable: boolean;
}

const Steps = ({ recipe, setCurrIng, editable }: Props) => {

    const [editing, setEditing] = useState(-1)

    return (
        <div>
            <div className="flex justify-between items-center px-4">
                <h2 className="text-2xl font-bold">Steps</h2>
            </div>
            <ol className="">
                {recipe.steps.map((step, index) => (
                    <StepRow key={index}
                        step={step} 
                        index={index} 
                        setCurrIng={setCurrIng} 
                        editable={editable} 
                        editing={editing === index}
                        setEditing={setEditing}
                    />
                ))}
            </ol>
        </div>
    )
}

export default Steps
