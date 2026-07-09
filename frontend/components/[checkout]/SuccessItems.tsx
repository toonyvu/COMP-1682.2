"use client";
import { useEffect, useState } from "react";
import { getOrder } from "@/lib/api/stripe";
import type { Order } from "@/types/types";
import { convertDateMonth } from "@/utils/dates";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  session_id: string;
};
export default function SuccessItems({ session_id }: Props) {
  const [order, setOrder] = useState<Order>();
  const orderDate = convertDateMonth(order?.order.order.created_at);
  const address = order?.order.checkoutData.customer_details;

  const orderItems = order?.order.items;

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
        <h1 className="text-6xl font-black text-black">
          Thank you for your purchase!
        </h1>

        <p className="text-gray-800 mt-5 text-lg">
          Your order will be processed within 24 hours during working days. We
          will notify you by email once your order has been shipped.
        </p>

        <h2 className="text-3xl text-black font-black mt-10 mb-5">
          Billing address
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-20 items-end">
            <h3 className="text-black text-xl font-black w-16">Name</h3>
            <p className="text-lg">{address?.name}</p>
          </div>
          <div>
            <div className="flex flex-row gap-20 items-start">
              <h3 className="text-black text-xl font-black w-16">Address</h3>
              <p className="text-lg">
                {address?.address.line1}, {address?.address.city},{" "}
                {address?.address.country}
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-20 items-start">
              <h3 className="text-black text-xl font-black w-16">Email</h3>
              <p className="text-lg">{address?.email}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-20 items-start">
              <h3 className="text-black text-xl font-black w-16">Phone</h3>
              <p className="text-lg">{address?.phone}</p>
            </div>
          </div>

          <div className="mt-4">
            <Link
              href={`http://localhost:3000/profile/orders/${order?.order.order.cus_order_id}`}
            >
              <Button className="bg-green-600 text-white h-12 rounded-2xl p-2 w-fit hover:bg-green-800">
                View Order Status
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-1/2 p-16">
        <div className="bg-[#EBEBEB] w-220 right-10 h-10 rounded-2xl absolute"></div>
        <div className="w-full h-full relative top-5 bg-[#F6F6F6] z-50 p-10">
          <h1 className="text-black text-4xl font-black h-16">Order Summary</h1>
          <hr className="border-t-2" />
          <div className="flex flex-row p-8 items-center text-center">
            <div className="flex-1 border-r-2 border-l-2 text-left pl-4">
              <h1 className="mb-1 text-xl font-medium">Date</h1>
              <p className="font-black text-lg">{orderDate}</p>
            </div>
            <div className="flex-1 border-r-2 text-left pl-4">
              <h1 className="mb-1 text-xl font-medium">Order No.</h1>
              <p className="font-black text-lg">
                {order?.order.order.cus_order_id}
              </p>
            </div>
            <div className="flex-1 border-r-2 text-left pl-4">
              <h1 className="mb-1 text-xl font-medium">Payment Method</h1>
              <p className="font-black text-lg ">
                {order?.order.paymentType === "card"
                  ? `${order?.order.paymentBrand?.toUpperCase()} Card`
                  : order?.order.paymentType}
              </p>
            </div>
          </div>
          <hr className="border-t-2 border-dashed" />
          <div className="flex flex-col p-8 gap-y-4">
            {orderItems?.map((item) => (
              <div key={item.id} className="flex flex-row">
                <Image
                  src={item.avatar_url}
                  width={100}
                  height={100}
                  className="rounded-2xl"
                  alt={item.name}
                ></Image>

                <div className="flex flex-col text-gray-800 ml-8">
                  <h1 className="font-black text-2xl">{item.name}</h1>
                  <p className="text-gray-500 text-xl">Qty: {item.qty}</p>
                </div>

                <div className="flex-1">
                  <h1 className="font-black text-2xl place-self-end">
                    ${item.price}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <hr className="border-t-2" />
          <div className="flex flex-row pt-8">
            <h1 className="font-black text-3xl">Order Total</h1>
            <h1 className="font-black text-3xl ml-auto">
              $
              {(Number(order?.order.checkoutData.amount_total) / 100).toFixed(
                2,
              )}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
