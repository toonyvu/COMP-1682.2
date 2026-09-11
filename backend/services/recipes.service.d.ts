import type { RecipeDetails, Ingredient, Step, RecipeDetailsEdit, Ingredients, Steps } from "../types/types.js";
export declare function getRecipeDetails(id: number, mealkitId: number): Promise<any>;
export declare function createRecipeService(recipe: RecipeDetails, ingredients: Ingredient[], steps: Step[]): Promise<{
    recipe: any;
    ingredients: any[];
    steps: any[];
} | undefined>;
export declare function getAllRecipesAdmin(page: number, limit: number, search?: string): Promise<{
    recipes: any[];
    total: any;
}>;
export declare function getRecipeAdmin(id: number): Promise<{
    recipe: any;
    ingredients: any[];
    steps: any[];
}>;
export declare function editRecipeService(recipe: RecipeDetailsEdit, ingredients: Ingredients, steps: Steps): Promise<void>;
//# sourceMappingURL=recipes.service.d.ts.map