import OrderDetails from "@/components/[userpage]/OrderDetails";
import ProfileMenus from "@/components/[userpage]/ProfileMenus";

type Props = {
  orderId: string;
};

export default function OrderDetailsPage({ orderId }: Props) {
  return (
    <div className="flex flex-row">
      <div className="sticky top-12 h-[calc(100vh-3rem)] w-64 overflow-y-auto mt-2 shadow-md">
        <ProfileMenus />
      </div>

      <div className="flex-1">
        <OrderDetails orderId={orderId} />
      </div>
    </div>
  );
}
