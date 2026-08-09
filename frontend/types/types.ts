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
  tags: string[];
};

export type Tag = {
  id: number;
  name: string;
};

export type TagFilters = {
  cookingTimes: string[];
  recipeTypes: string[];
  cuisines: string[];
  flavors: string[];
};

export type mealkitData = {
  recipe_id: number;
  week_number: number;
  available_from: string;
  available_until: string;
  year: number;
  price: number;
  max_servings: number;
};

export type RecipeAdmin = {
  id: number;
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

export type RecipePaginated = {
  total: number;
  recipes: RecipeAdmin[];
};

export type RecipeStore = {
  recipe: RecipeAdd | null;
  ingredients: IngredientAdd[];
  steps: StepsAdd[];
};

export type RecipeAPIType = {
  recipe: RecipeAdd;

  ingredients: IngredientAdd[];

  steps: StepsAdd[];
};

export type RecipeAdminEdit = {
  recipe: RecipeEdit;

  ingredients: IngredientEdit[];

  steps: StepEdit[];
};

export type RecipeAdd = {
  name: string;
  description: string;
  tags: string[];
  avatar_url: string;
  servings: number;
  difficulty: Difficulty;
  prep_time: number;
  cooking_time: number;
};

export type RecipeEdit = RecipeAdd & {
  id?: number;
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
  id: number;
  name: string;
  category: string;
  unit_type: string;
  calories_per_100g: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  unit: string;
  qty: number;
  avatar_url: string;
};

export type IngredientAdd = {
  id?: number;
  name: string;
  category: string;
  unit_type: string;
  calories_per_100g: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  qty: number;
  avatar_url: string;
};

export type IngredientEdit = IngredientAdd & {
  id?: number;
};
export type Steps = {
  id: number;
  recipe_id: number;
  step_number: number;
  instruction: string;
  created_at: string;
};

export type StepsAdd = {
  id?: number;
  step_number: number;
  instruction: string;
};

export type StepEdit = StepsAdd & {
  id?: number;
};

export type RecipeWithDetails = Recipe & {
  mealkitData: {
    recipe_id: number;
    week_number: number;
    year: number;
    price: number;
    available_from: string;
    available_until: string;
    max_servings: number;
    created_at: string;
  };
  recipeingredients: Ingredient[];

  recipesteps: Steps[];

  recipeTags: Tag[];

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
  dob: Date | undefined;
  created_at: string;
  address: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
};

export type Notificaiton = {
  user_id: number;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  id: number;
  created_at: string;
  action_url: string;
};

export type OrderItems = {
  max_servings: number;
  mealkit_id: number;
  price: number;
  qty: number;
  week_number: number;
  year: number;
  recipe: {
    avatar_url: string;
    cooking_time: number;
    description: number;
    difficulty: Difficulty;
    id: number;
    name: string;
    prep_time: string;
    servings: number;
  };
};

export type UserOrder = {
  amount_total: number;
  card_brand: string;
  created_at: string;
  currency: string;
  cus_order_id: string;
  id: number;
  payment_method: string | null;
  status: OrderStatus;
  stripe_payment_intent_id: string;
  stripe_session_id: string;
  user_id: number;
  line_1: string;
  line_2: string;
  city: string;
  country: string;
  postal_code: number;
  state: string;
  items: OrderItems[];
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Customer = {
  address: string | null;
  first_name: string | null;
  id: number;
  last_name: string | null;
  phone: number | null;
  username: string;
};

export type OrderItemsAdmin = {
  mealkit_id: number;
  price: number;
  qty: number;
  recipe: {
    avatar_url: string;
    id: number;
    name: string;
  };
};

export type OrderAdmin = {
  amount_total: number;
  card_brand: string | null;
  created_at: string;
  currency: string;
  cus_order_id: string;
  customer: Customer;
  id: number;
  payment_method: string;
  status: string;
  stripe_payment_intent_id: string;
  stripe_session_id: string;
  user_id: number;
  items: OrderItemsAdmin[];
  line_1: string | null;
  line_2: string | null;
  city: string | null;
  country: string | null;
  postal_code: number | null;
  state: string | null;
};
