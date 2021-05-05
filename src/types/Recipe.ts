export interface Recipe {
    _id: string;
    creator: RecipeCreator;
    name: string;
    steps: Step[];
}

export type ProtoRecipe = Pick<Recipe, 'creator' | 'name' | 'steps'>

export interface Step {
    action: string;
    items?: string[];
    time?: number;
}

export interface RecipeCreator {
    uid: string;
    username: string;
}