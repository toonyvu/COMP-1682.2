import EditRecipeDetailsPage from "@/pages/EditRecipeDetailsPage";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <EditRecipeDetailsPage id={id} />;
}
