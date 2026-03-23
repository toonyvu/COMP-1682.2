import type { Recipe } from "@/types/types";
import RecipePage from "@/pages/Recipe";

type Props = {
  params: Promise<{
    recipeId: string;
  }>;
};

export default async function Recipe({ params }: Props) {
  const { recipeId } = await params;

  console.log(recipeId);

  const id = Number(recipeId);

  if (isNaN(id)) {
    throw new Error("Invalid recipe ID");
  }

  return <RecipePage id={id} />;
}
