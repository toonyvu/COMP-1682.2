import { create } from "zustand";
import type { RecipeAdd } from "@/types/types";
import type { IngredientAdd } from "@/types/types";
import type { StepsAdd } from "@/types/types";
import type { RecipeAPIType } from "@/types/types";

type RecipeStore = {
  recipe: RecipeAdd | null;
  ingredients: IngredientAdd[];
  steps: StepsAdd[];

  setRecipeDetails: (recipe: RecipeAdd) => void;
  setIngredients: (ingredients: IngredientAdd[]) => void;
  setSteps: (steps: StepsAdd[]) => void;
  setFullRecipe: (data: RecipeAPIType) => void;

  addIngredient: (ingredient: IngredientAdd) => void;
  removeIngredient: (index: number) => void;
  updateIngredient: (index: number, ingredient: IngredientAdd) => void;

  addStep: (step: StepsAdd) => void;
  removeStep: (index: number) => void;
  updateStep: (index: number, step: StepsAdd) => void;

  resetRecipeStore: () => void;
};

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipe: null,
  ingredients: [],
  steps: [],

  setRecipeDetails: (recipe) => set({ recipe }),

  setIngredients: (ingredients) => set({ ingredients }),

  setSteps: (steps) => set({ steps }),

  setFullRecipe: (data) =>
    set({
      recipe: data.recipe,
      ingredients: data.ingredients,
      steps: data.steps,
    }),

  addIngredient: (ingredient) =>
    set((state) => ({
      ingredients: [...state.ingredients, ingredient],
    })),

  removeIngredient: (index) =>
    set((state) => ({
      ingredients: state.ingredients.filter((_, i) => i !== index),
    })),

  updateIngredient: (index, ingredient) =>
    set((state) => ({
      ingredients: state.ingredients.map((item, i) =>
        i === index ? ingredient : item,
      ),
    })),

  addStep: (step) =>
    set((state) => ({
      steps: [...state.steps, step],
    })),

  removeStep: (index) =>
    set((state) => ({
      steps: state.steps.filter((_, i) => i !== index),
    })),

  updateStep: (index, step) =>
    set((state) => ({
      steps: state.steps.map((item, i) => (i === index ? step : item)),
    })),

  resetRecipeStore: () =>
    set({
      recipe: null,
      ingredients: [],
      steps: [],
    }),
}));
