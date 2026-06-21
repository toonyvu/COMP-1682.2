import OrderDetailsPageAdmin from "@/pages/OrderDetailsPageAdmin";

type Props = {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ userId: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { userId } = await searchParams;
  const { orderId } = await params;
  return <OrderDetailsPageAdmin orderId={orderId} userId={userId} />;
}
