import RecipeDetails from "@/components/[recipe]/RecipeDetails";

type Props = {
  id: number;
  mealkitId: number;
};

export default function RecipePage({ id, mealkitId }: Props) {
  console.log(id);
  return <RecipeDetails id={id} mealkitId={mealkitId} />;
}
