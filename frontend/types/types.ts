export type Difficulty = "Easy" | "Medium" | "Hard";

export type Subscriptions = "free" | "premium" | "deluxe";

export type Recipe = {
  recipe_id: number;
  mealkit_id: number;
  name: string;
  description: string;
  avatar_url: string;
  servings: number;
  difficulty: Difficulty;
  prep_time: number;
  cooking_time: number;
  created_at: string;
  price: string;
};

export type RecipeAPIType = {
  recipe: RecipeAdd;

  ingredients: IngredientAdd[];

  steps: StepsAdd[];
};

export type RecipeAdd = {
  name: string;
  description: string;
  avatar_url: string;
  servings: number;
  difficulty: Difficulty;
  prep_time: number;
  cooking_time: number;
  price: number;
};

export type DateInfo = {
  week: number;
  year: number;
  start: Date;
  end: Date;
  range: string;
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

export type IngredientAdd = {
  name: string;
  category: string;
  unit_type: string;
  calories_per_100g: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  qty: number;
};

export type Steps = {
  id: number;
  recipe_id: number;
  step_number: number;
  instruction: string;
  created_at: string;
};

export type StepsAdd = {
  step_number: number;
  instruction: string;
};

export type RecipeWithDetails = Recipe & {
  recipeingredients: Ingredient[];

  recipesteps: Steps[];

  isFavorited: boolean;
};

export type CartItem = Recipe & {
  qty: number;
};

export type Order = {
  order: {
    checkoutData: {
      amount_total: string;
      amount_subtotal: string;
      customer_details: {
        address: {
          city: string;
          country: string;
          line1: string;
          line2: string;
          postal_code: string;
          state: string;
        };

        name: string;
        email: string;
        phone: number;
      };
    };

    items: [
      {
        avatar_url: string;
        id: number;
        mealkit_id: number;
        name: string;
        order_id: number;
        price: string;
        qty: number;
      },
    ];

    order: {
      amount_total: string;
      created_at: string;
      currency: string;
      id: number;
      status: string;
      stripe_payment_intent_id: string;
      stripe_session_id: string;
      user_id: number;
      cus_order_id: string;
    };

    paymentBrand: string;
    paymentType: string;
    wallet: string | null;
  };
};

export type UserType = {
  id: string;
  role: string;
  username: string;
  tier: string | "free" | "premium" | "deluxe";
  email: string;
  bio: string;
  avatar_url: string;
  dob: string;
  created_at: string;
  address: string;
  first_name: string;
  last_name: string;
  phone: string;
};
