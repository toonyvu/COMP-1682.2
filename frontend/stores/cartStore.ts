import { CartItem } from "./../types/types";
import { create } from "zustand";
import type { Recipe } from "./../types/types";

type cartStore = {
  cartItems: CartItem[];
  addItem: (item: Recipe) => void;
  removeItem: (item: Recipe) => void;
  setCart: (items: CartItem[]) => void;
};

export const useCartStore = create<cartStore>((set) => ({
  cartItems: [],

  addItem: (recipe: Recipe) =>
    set((state) => {
      const existing = state.cartItems.find(
        (i) => i.mealkit_id === recipe.mealkit_id,
      );

      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.mealkit_id === recipe.mealkit_id ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      } else {
        const item = { ...recipe, qty: 1 };
        return {
          cartItems: [...state.cartItems, item],
        };
      }
    }),

  removeItem: (recipe: Recipe) =>
    set((state) => {
      const existing = state.cartItems.find(
        (i) => i.mealkit_id === recipe.mealkit_id,
      );

      if (existing && existing.qty > 1) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.mealkit_id === recipe.mealkit_id ? { ...i, qty: i.qty - 1 } : i,
          ),
        };
      } else {
        return {
          cartItems: state.cartItems.filter(
            (i) => i.mealkit_id !== recipe.mealkit_id,
          ),
        };
      }
    }),

  setCart: (items) => set({ cartItems: items }),
}));
