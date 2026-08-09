import type { RecipeAPIType, RecipeAdminEdit } from "@/types/types";

import { apiFetch } from "./apiFetch";
import { limit } from "@/constants/constants";

export async function getRecipe(id: number, mealkitId: number) {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}?mealkitId=${mealkitId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to get recipe.");
  }

  return data;
}

export async function createRecipe(recipe: RecipeAPIType) {
  const res = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!res.ok) {
    const errorText = await res.json();
    console.error("Create recipe failed:", errorText);

    throw new Error(errorText || "Failed to create recipe!");
  }

  return res.json();
}

export async function editRecipeAdmin(recipe: RecipeAdminEdit) {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/edit`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    },
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to edit recipe");
  }

  return;
}

export async function getRecipesAdmin(page: number, search: string) {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/admin?page=${page}&limit=${limit}&search=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const msg = await res.text();
    console.log(msg);
    throw new Error(`${res.status}: ${msg}`);
  }

  const data = await res.json();

  return data;
}

export async function getRecipeAdmin(id: number) {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/admin/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok) {
    const msg = await res.text();
    console.log(msg);
    throw new Error(`${res.status}: ${msg}`);
  }

  const data = await res.json();

  return data;
}
