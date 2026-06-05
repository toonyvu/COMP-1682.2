"use client";

import { useUserStore } from "@/stores/userStore";

import { getOrderDetails } from "@/lib/api/orders";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

import type { UserOrder } from "@/types/types";
import type { OrderItems } from "@/types/types";

type Props = {
  orderId: string;
};

export default function OrderDetails({ orderId }: Props) {
  const user = useUserStore((state) => state.user);

  const {
    data: order,
    error,
    isLoading,
  } = useQuery<UserOrder>({
    queryKey: ["orderDetailQuery", orderId],
    queryFn: () => getOrderDetails(orderId),
  });

  console.log(order);

  if (isLoading) {
    return <div>Loading order...</div>;
  }

  if (error) {
    return <div>Failed to load order.</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  const steps = ["pending", "paid", "preparing", "shipped", "delivered"];
  const currentIndex = steps.indexOf(order.status);

  return (
    <div className="mx-auto w-full p-6">
      <h1 className="mb-6 text-3xl font-bold">Order #{order.cus_order_id}</h1>
      <div className="flex items-start">
        {steps.map((step, index) => {
          const completed = index <= currentIndex;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col w-16 items-center">
                <div
                  className={`h-8 w-8 rounded-full border-2 ${
                    completed
                      ? "bg-green-600 border-green-600"
                      : "border-gray-300"
                  }`}
                />

                <span className="mt-2 text-sm font-bold capitalize">
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 mt-4">
                  <div
                    className={`h-1 ${
                      index < currentIndex ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="w-full bg-white border rounded-lg p-2 mt-4">
        <h2 className="font-semibold text-xl my-2 ml-4">Basic Details</h2>
        <hr />
        <div className="flex flex-row justify-between p-4">
          <div>
            <h3 className="text-md font-semibold text-gray-600">Order ID</h3>
            <span className="font-bold text-lg">{order.cus_order_id}</span>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-600">Order Date</h3>
            <span className="font-bold text-lg">
              {new Date(order.created_at).toLocaleString()}
            </span>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-600">
              Payment Method
            </h3>
            <span className="font-bold text-lg capitalize">
              {order.payment_method}
            </span>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-600">Card Brand</h3>
            <span className="font-bold text-lg capitalize">
              {order.card_brand ?? "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-4">
        {/* Order Summary */}
        <div className="rounded-lg border p-4 md:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">Items Purchased</h2>

          <div className="space-y-4">
            {order.items.map((item: OrderItems) => (
              <div
                key={item.mealkit_id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <Image
                  width={100}
                  height={100}
                  src={item.recipe.avatar_url}
                  alt={item.recipe.name}
                  className="h-20 w-20 rounded object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">{item.recipe.name}</h3>

                  <p className="text-sm text-gray-500">Quantity: {item.qty}</p>

                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="font-semibold">
                  ${(item.qty * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Info, Order Totals */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-xl font-semibold">Customer Information</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>First Name</span>
              <span className="font-medium capitalize">{user?.first_name}</span>
            </div>

            <div className="flex justify-between capitalize">
              <span>Last Name</span>
              <span>{user?.last_name}</span>
            </div>

            <div className="flex justify-between">
              <span>Email</span>
              <span>{user?.email}</span>
            </div>

            <div className="flex justify-between">
              <span>Phone Number</span>
              <span>{user?.phone}</span>
            </div>

            <div className="flex justify-between">
              <span>Address</span>
              <span className="w-1/2 text-right">{user?.address}</span>
            </div>
          </div>
          <hr className="mt-4" />

          <div className="mt-4 flex flex-row justify-between">
            <h2 className="mb-4 text-xl font-semibold">Order Total: </h2>
            <span className="font-bold text-xl">
              {(order.amount_total / 100).toFixed(2)}$
            </span>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-6 rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-semibold">Order Information</h2>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Order ID:</strong> {order.cus_order_id}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>

          <p>
            <strong>Stripe Session:</strong> {order.stripe_session_id}
          </p>

          <p>
            <strong>Payment Intent:</strong> {order.stripe_payment_intent_id}
          </p>
        </div>
      </div>
    </div>
  );
}
