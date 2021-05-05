import { isUnit, Unit } from '../types/Ingredient'

type UnitLookup = {
    [key in Unit]: string;
}

const unitLookup: UnitLookup = {
    millilitre: 'mL',
    centilitre: 'cL',
    litre: 'L',
    milligram: 'mg',
    gram: 'g',
    kilogram: 'Kg',
    teaspoon: ' tsp',
    tablespoon: ' tbsp',
    cup: ' cup'
}

export const fromShorthand = (unit: string): Unit | null => {
    const longhand = Object.entries(unitLookup).find(([, short]) => short.trim() === unit || short.trim().toLowerCase() === unit.toLowerCase())
    return longhand && isUnit(longhand[0]) ? longhand[0] : null;
}

export const getUnit = (unit?: string) => {
    return unit && isUnit(unit) ? unitLookup[unit] : '';
}

export const formatUnit = (qty: number, unit?: string) => {
    return unit && isUnit(unit) ? `${qty}${unitLookup[unit]}` : `${qty}`
}