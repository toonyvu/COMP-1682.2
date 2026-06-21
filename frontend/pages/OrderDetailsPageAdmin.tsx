import OrderDetailsAdmin from "@/components/[admin]/getOrders/OrderDetailsAdmin";

type Props = {
  orderId: string;
  userId: string;
};
export default function OrderDetailsPageAdmin({ orderId, userId }: Props) {
  return <OrderDetailsAdmin orderId={orderId} userId={userId} />;
}
