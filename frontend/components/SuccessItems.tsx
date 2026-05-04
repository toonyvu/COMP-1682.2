"use client";
import { useEffect, useState } from "react";
import { getOrder } from "@/lib/api/stripe";

type Props = {
  session_id: string;
};
export default function SuccessItems({ session_id }: Props) {
  const [order, setOrder] = useState({});
  useEffect(() => {
    async function getOrderSummary(id: string) {
      const data = await getOrder(id);

      setOrder(data);
    }

    getOrderSummary(session_id);
  }, [session_id]);

  return (
    <div className="flex flex-1 w-full">
      <div className="w-1/2 p-16">
        <h1 className="text-5xl font-black text-black">
          Thank you for your purchase!
        </h1>

        <p className="text-gray-800 mt-5">
          Your order will be processed within 24 hours during working days. We
          will notify you by email once your order has been shipped.
        </p>
      </div>

      <div className="w-1/2 p-16">hi</div>
    </div>
  );
}
