import type { Recipe, RecipeAPIType } from "@/types/types";
import { checkKey } from "./apiClient";

export async function getRecipe(id: number) {
  const token = await checkKey();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to get recipe.");
  }

  return data;
}

export async function createRecipe(recipe: RecipeAPIType) {
  const token = await checkKey();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipe),
  });

  if (!res.ok) {
    throw new Error("Failed to create recipe!");
  }

  return res.json();
}
