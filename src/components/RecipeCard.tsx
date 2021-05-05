import React from 'react'
import { Link } from 'react-router-dom'
import { Recipe } from '../types/Recipe'

interface Props {
    recipe: Recipe
}

const RecipeCard = ({ recipe }: Props) => {
    return (
        <Link to={`/recipe/${recipe._id}`} className="rounded w-64 h-48 flex flex-col shadow overflow-hidden hover:bg-gray-50 transition-colors focus:ring focus:ring-blue-300">
            <div className="bg-gray-300 h-2/3">

            </div>
            <div className="flex-grow px-3 py-1">
                <div className="font-semibold">{recipe.name}</div>
                <div>by @{recipe.creator.username}</div>
            </div>
        </Link>
    )
}

export default RecipeCard
