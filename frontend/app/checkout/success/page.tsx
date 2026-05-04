import SuccessItems from "@/components/SuccessItems";

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const session_id = params.session_id;

  return <SuccessItems session_id={session_id ?? ""} />;
}
