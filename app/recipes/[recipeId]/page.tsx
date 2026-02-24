import type { Recipe } from "@/types/types";
import RecipePage from "@/pages/Recipe";
import { getUser } from "@/utils/getUser";

type Props = {
  params: Promise<{ recipeId: string }>;
};

export default async function Recipe({ params }: Props) {
  const { supabase } = await getUser();
  const { recipeId } = await params;

  const { data, error } = await supabase
    .from("recipes")
    .select(
      `*, recipeingredients 
      (ingredient_id, 
        ingredients (*)
      )`,
    )
    .eq("id", recipeId)
    .single();

  if (error) {
    console.log(error);
  }
  return <RecipePage recipe={data} />;
}
