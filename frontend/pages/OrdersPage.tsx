import OrdersTab from "@/components/[userpage]/OrdersTab";
import ProfileMenus from "@/components/[userpage]/ProfileMenus";

export default function OrdersPage() {
  return (
    <div className="flex flex-row">
      <div className="sticky top-12 h-[calc(100vh-3rem)] w-64 overflow-y-auto mt-2">
        <ProfileMenus />
      </div>

      <div className="flex-1">
        <OrdersTab></OrdersTab>
      </div>
    </div>
  );
}
