export type Difficulty = "Easy" | "Medium" | "Hard";

export type RecipeDetails = {
  name: string;
  description: string;
  servings: number;
  difficulty: Difficulty;
  prep_time: number;
  cooking_time: number;
  avatar_url: string;
  price: number;
};

export type Ingredient = {
  name: string;
  category: string;
  unit_type: string;
  calories_per_100g: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  qty: number;
};

export type Step = {
  step_number: number;
  instruction: string;
};
