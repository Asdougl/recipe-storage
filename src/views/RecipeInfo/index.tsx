import React, { useContext, useEffect, useState } from 'react'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router'
import { firestore } from '../../firebase'
import { createIngredient, Ingredient, ProtoIngredient } from '../../types/Ingredient'
import { Recipe } from '../../types/Recipe'
import { formatUnit, getUnit } from '../../helpers/units'
import Page from '../../components/layout/Page'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import FaIcon from '../../components/FaIcon'
import { UserContext } from '../../context/UserContext'
import { timeDisplay } from '../../helpers/time'
import QuantityEditor from '../../components/forms/QuantityEditor'
import IngredientRow from '../../components/IngredientRow'
import Input from '../../components/forms/Input'
import IngredientList from './IngredientList'
import Steps from './Steps'

interface Props {
    
}

const RecipeInfo = (props: Props) => {

    const { recipe: recipeid } = useParams<{ recipe: string }>()

    const user = useContext(UserContext)

    const recipeRef = firestore.collection('recipes').doc(recipeid);
    const ingredientsRef = recipeRef.collection('ingredients')
    
    const [recipe, recLoading, recError] = useDocumentData<Recipe>(recipeRef, { idField: '_id' })
    const ingredientsQuery = ingredientsRef.orderBy('createdAt', 'asc')
    const [ingredients, ingLoading, ingError] = useCollectionData<Ingredient>(ingredientsQuery, { idField: '_id' })

    const [isOwner, setIsOwner] = useState(false)
    const [currIng, setCurrIng] = useState<string[]>([])

    const updateIngredient = (ing: Ingredient) => {
        console.log("UPDATING", ing)
        const { _id, ...proto } = ing;
        ingredientsRef.doc(ing._id).update(proto)
    }

    const addIngredient = (ing: ProtoIngredient) => {
        ingredientsRef.add(ing)
    }

    const deleteIngredient = (id: string) => {
        ingredientsRef.doc(id).delete()
    }

    useEffect(() => {
        setIsOwner(!!recipe && !!user && recipe.creator.uid === user.uid)
    },[recipe, user])

    return (
        <Page>
            { !recipe || !ingredients ? <h3>Loading...</h3> : <>
                {/* Title bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                    <div className="flex md:items-baseline md:gap-2 flex-col md:flex-row">
                        <h1 className="text-4xl font-bold md:py-4">{recipe.name}</h1>
                        <h2 className="text-center">by <Link className="text-blue-400 hover:text-blue-500" to={`/${recipe.creator.username}`}>@{recipe.creator.username}</Link></h2>
                    </div>
                    <div className="flex justify-center gap-2">
                        <Button 
                            className="flex items-center justify-center gap-1"
                        >
                            <FaIcon icon="bookmark" size="sm" />
                            Bookmark
                        </Button>
                        <Button 
                            color="blue" 
                            className="flex items-center justify-center gap-1"
                        >
                            <FaIcon icon="play" size="sm" />
                            Start
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col md:grid grid-cols-2 gap-4">
                    <IngredientList 
                        ingredients={ingredients} 
                        currIngredients={currIng} 
                        editable={isOwner} 
                        onEdit={updateIngredient}
                        onAdd={addIngredient}
                        onDelete={deleteIngredient}
                    />
                    <Steps 
                        recipe={recipe} 
                        setCurrIng={setCurrIng} 
                        editable={isOwner} 
                    />
                </div>
            </>}
        </Page>
    )
}

export default RecipeInfo
