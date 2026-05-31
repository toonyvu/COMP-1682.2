import RecipeDetails from "@/components/[recipe]/RecipeDetails";

type Props = {
  id: number;
};

export default function RecipePage({ id }: Props) {
  console.log(id);
  return <RecipeDetails id={id} />;
}
