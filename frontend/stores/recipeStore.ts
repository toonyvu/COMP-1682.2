import { create } from "zustand";
import type { RecipeEdit } from "@/types/types";
import type { IngredientEdit } from "@/types/types";
import type { StepEdit } from "@/types/types";
import type { RecipeAdminEdit } from "@/types/types";

type RecipeStore = {
  recipe: RecipeEdit | null;
  ingredients: IngredientEdit[];
  steps: StepEdit[];

  setRecipeDetails: (recipe: RecipeEdit) => void;
  setIngredients: (ingredients: IngredientEdit[]) => void;
  setSteps: (steps: StepEdit[]) => void;
  setFullRecipe: (data: RecipeAdminEdit) => void;

  addIngredient: (ingredient: IngredientEdit) => void;
  removeIngredient: (index: number) => void;
  updateIngredient: (index: number, ingredient: IngredientEdit) => void;

  addStep: (step: StepEdit) => void;
  removeStep: (index: number) => void;
  updateStep: (index: number, step: StepEdit) => void;

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
