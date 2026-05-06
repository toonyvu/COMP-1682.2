"use client";
import { useEffect, useState } from "react";
import { getOrder } from "@/lib/api/stripe";
import Image from "next/image";
import type { Order } from "@/types/types";
import sayGex from "@/public/gay.jpg";

type Props = {
  session_id: string;
};
export default function SuccessItems({ session_id }: Props) {
  const [order, setOrder] = useState<Order>();
  const address = order?.order.checkoutData.customer_details;

  useEffect(() => {
    async function getOrderSummary(id: string) {
      const data = await getOrder(id);

      setOrder(data);
    }

    getOrderSummary(session_id);
  }, [session_id]);

  return (
    <div className="flex flex-1 w-full">
      <div className="w-1/2 p-48">
        <h1 className="text-5xl font-black text-black">
          Thank you for your purchase!
        </h1>

        <p className="text-gray-800 mt-5">
          Your order will be processed within 24 hours during working days. We
          will notify you by email once your order has been shipped.
        </p>

        <h2 className="text-2xl text-black font-black mt-10 mb-5">
          Billing address
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-20 items-end">
            <h3 className="text-black text-lg font-black w-16">Name</h3>
            <p className="">{address?.name}</p>
          </div>
          <div>
            <div className="flex flex-row gap-20 items-start">
              <h3 className="text-black text-lg font-black w-16">Address</h3>
              <p className="">
                {address?.address.line1}, {address?.address.city},{" "}
                {address?.address.country}
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-20 items-start">
              <h3 className="text-black text-lg font-black w-16">Email</h3>
              <p className="">{address?.email}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-20 items-start">
              <h3 className="text-black text-lg font-black w-16">Phone</h3>
              <p className="">{address?.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 p-16">
        <Image src={sayGex} height={500} width={500} alt={"saygex"} />
        <h1>one gay sex please</h1>
      </div>
    </div>
  );
}
