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

export type MealKitList = {
  mealkits: Recipe[];
  limit: number;
  page: number;
  total: number;
};

export type Ingredient = {
  ingredient_id: number;
  name: string;
  category: string;
  unit_type: string;
  calories_per_100g: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  unit: string;
  qty: number;
};

export type Steps = {
  id: number;
  recipe_id: number;
  step_number: number;
  instruction: string;
  created_at: string;
};

export type RecipeWithDetails = Recipe & {
  recipeingredients: Ingredient[];

  recipesteps: Steps[];

  isFavorited: boolean;
};
