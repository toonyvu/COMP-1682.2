import type { Recipe } from "@/types/types";
import RecipePage from "@/pages/Recipe";
import { getUser } from "@/utils/getUser";

type Props = {
  params: Promise<{ recipeId: string }>;
};

export default async function Recipe({ params }: Props) {
  const { supabase, user } = await getUser();
  const { recipeId } = await params;

  const { data, error } = await supabase
    .from("recipes")
    .select(
      `*, recipeingredients 
      (ingredient_id, 
        ingredients (*)), recipesteps (*)`,
    )
    .eq("id", recipeId)
    .single();

  if (error) {
    console.log(error);
  }

  let isFavorited = false;
  if (user) {
    const { data: favorite } = await supabase
      .from("recipefavorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("recipe_id", recipeId)
      .maybeSingle();

    isFavorited = !!favorite;
  }
  return <RecipePage recipe={data} isFavorited={isFavorited} />;
}
