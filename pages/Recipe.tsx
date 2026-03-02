import type { RecipeWithDetails } from "@/types/types";
import RecipeDetails from "@/components/RecipeDetails";

type Props = {
  recipe: RecipeWithDetails;
  isFavorited: boolean;
};

export default function RecipePage({ recipe, isFavorited }: Props) {
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return <RecipeDetails recipe={recipe} isFavorited={isFavorited} />;
}
