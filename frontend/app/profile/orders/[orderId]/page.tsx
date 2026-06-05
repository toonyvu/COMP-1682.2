import OrderDetailsPage from "@/pages/OrderDetailsPage";

type Props = {
  params: Promise<{ orderId: string }>;
};
export default async function Page({ params }: Props) {
  const { orderId } = await params;

  return <OrderDetailsPage orderId={orderId} />;
}
