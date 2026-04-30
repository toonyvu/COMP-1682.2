import { getOrderSummary } from "@/lib/api/stripe";

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const { session_id } = await searchParams;

  return (
    <>
      <h1>Checkout Successful!</h1>
    </>
  );
}
