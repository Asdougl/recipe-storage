import React from 'react'
import Page from '../components/layout/Page'
import { firestore } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom'
import { Recipe } from '../types/Recipe'
import RecipeCard from '../components/RecipeCard'
import FaIcon from '../components/FaIcon'

interface Props {
    
}

const Recipes = (props: Props) => {

    const recipeRef = firestore.collection('recipes')
    const [recipes, loading, error] = useCollectionData<Recipe>(recipeRef, { idField: '_id' })

    console.log(recipes);

    return (
        <Page title="Your Recipes">
            {loading ? 
                <div className="flex items-center justify-center pt-20">
                    <FaIcon icon="spinner-third" spin size="4x" />
                </div>
            :
                <div className="flex">
                    {recipes && recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
                </div>
            }
        </Page>
    )
}

export default Recipes
