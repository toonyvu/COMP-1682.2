type Difficulty = "Easy" | "Medium" | "Hard";

export type Recipe = {
  id: number;
  name: string;
  description: string;
  avatar_url: string;
  servings: number;
  difficulty: Difficulty;
  prep_time: number;
  cooking_time: number;
  created_at: string;
};

export type RecipeWithDetails = Recipe & {
  recipeingredients: {
    ingredient_id: number;
    ingredients: Ingredient;
  }[];

  recipesteps: {
    id: number;
    recipe_id: number;
    step_number: number;
    instruction: string;
    created_at: string;
  }[];
};
export type Ingredient = {
  id: number;
  name: string;
  category: string;
  unit_type: string;
  calories_per_100g: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  created_at: string;
};
