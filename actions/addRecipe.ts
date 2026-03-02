"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/utils/getUser";

export async function ToggleFavorite(data: FormData) {
  const { supabase, user } = await getUser();
  const recipeId = Number(data.get("recipeId"));

  const { data: existing } = await supabase
    .from("recipefavorites")
    .select("id")
    .eq("user_id", user?.id)
    .eq("recipe_id", recipeId)
    .maybeSingle();

  if (existing) {
    await supabase.from("recipefavorites").delete().eq("id", existing.id);
  } else {
    await supabase.from("recipefavorites").insert({
      recipe_id: recipeId,
      user_id: user?.id,
    });
  }

  revalidatePath(`/recipes/${recipeId}`);
}
