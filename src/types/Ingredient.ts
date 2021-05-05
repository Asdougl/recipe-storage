import firebase from 'firebase/app'

export interface Ingredient {
    _id: string;
    item: string;
    qty: number;
    createdAt: firebase.firestore.Timestamp;
    unit?: string;
}

export type ProtoIngredient = Pick<Ingredient, 'item' | 'qty' | 'unit' | 'createdAt'>

type Volume = 'millilitre' | 'centilitre' | 'litre'
type Mass = 'milligram' | 'gram' | 'kilogram'
type Measure = 'teaspoon' | 'tablespoon' | 'cup'

export type Unit = Volume | Mass | Measure;

export const isUnit = (test: string): test is Unit => {
    return (
        ['millilitre', 'centilitre', 'litre'].includes(test)
        ||
        ['milligram', 'gram', 'kilogram'].includes(test)
        ||
        ['teaspoon', 'tablespoon', 'cup'].includes(test)
    )
}

export const createIngredient = (): ProtoIngredient => ({
    item: '',
    qty: 0,
    createdAt: firebase.firestore.Timestamp.now()
})