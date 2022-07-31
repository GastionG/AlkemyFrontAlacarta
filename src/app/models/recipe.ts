export interface Recipes{
    recipes: Recipe[]
}

export interface Recipe{
    id: number,
    title: string,
    image: string,
    summary: string,
    healthScore: number,
    readyInMinutes: number,
    pricePerServing: number,
    vegan: boolean
}

export class recipeVoid{
    id: number = 0;
    title: string = '';
    image: string = '';
    summary: string = '';
    healthScore: number = 0;
    readyInMinutes: number = 0;
    pricePerServing: number = 0;
    vegan: boolean = false;
}