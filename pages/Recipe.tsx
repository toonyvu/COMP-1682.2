import type { RecipeWithDetails } from "@/types/types";
import RecipeDetails from "@/components/RecipeDetails";

type Props = {
  recipe: RecipeWithDetails;
};

export default function RecipePage({ recipe }: Props) {
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return <RecipeDetails recipe={recipe} />;
}
