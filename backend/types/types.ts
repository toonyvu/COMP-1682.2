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
  tags: string[];
};

export type RecipeDetailsEdit = RecipeDetails & {
  id?: number;
};

export type Ingredient = {
  name: string;
  category: string;
  unit_type: string;
  calories_per_100g: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  qty: number;
  avatar_url: string;
};

export type IngredientEdit = Ingredient & {
  id?: number;
};

export type Step = {
  step_number: number;
  instruction: string;
};

export type StepEdit = Step & {
  id?: number;
};

export type Ingredients = IngredientEdit[];
export type Steps = StepEdit[];

export type mealkitData = {
  recipe_id: number;
  week_number: number;
  year: number;
  available_from: string;
  available_until: string;
  price: 0;
  max_servings: number;
};
