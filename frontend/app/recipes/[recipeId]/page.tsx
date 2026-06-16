import type { Recipe } from "@/types/types";
import RecipePage from "@/pages/Recipe";

type Props = {
  params: Promise<{
    recipeId: string;
  }>;

  searchParams: Promise<{ mealkit?: string }>;
};

export default async function Recipe({ params, searchParams }: Props) {
  const { recipeId } = await params;
  const { mealkit } = await searchParams;

  console.log(recipeId);

  const id = Number(recipeId);
  const mealkitId = Number(mealkit);

  if (isNaN(id)) {
    throw new Error("Invalid recipe ID");
  }

  return <RecipePage id={id} mealkitId={mealkitId} />;
}
