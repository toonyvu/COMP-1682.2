import { create } from "zustand";

import type { RecipeAdd } from "@/types/types";
import type { Ingredient } from "@/types/types";
import type { Steps } from "@/types/types";

type RecipeStore = {
  recipe: RecipeAdd | null;
  ingredients: Ingredient[];
  steps: Steps[];

  setRecipeDetails: (recipe: RecipeAdd) => void;

  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (index: number) => void;
  updateIngredient: (index: number, ingredient: Ingredient) => void;

  addStep: (step: Steps) => void;
  removeStep: (index: number) => void;
  updateStep: (index: number, step: Steps) => void;

  resetRecipeStore: () => void;
};

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipe: null,
  ingredients: [],
  steps: [],

  setRecipeDetails: (recipe) => set({ recipe }),

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
