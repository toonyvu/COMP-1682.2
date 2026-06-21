"use client";

import Image from "next/image";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { Button } from "../ui/button";
import { buttonColors } from "@/constants/constants";
import { createCheckoutSession } from "@/lib/api/checkout";

export default function Checkout() {
  const cartItems = useCartStore((state) => state.cartItems);
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0,
  );

  async function handleCheckout() {
    try {
      setLoading(true);
      await createCheckoutSession();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* Items */}
        <div className="col-span-2 bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.mealkit_id} className="flex gap-4 border-b pb-4">
                <Image
                  src={item.avatar_url}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="w-24 h-24 rounded-md object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="text-sm text-gray-600">{item.description}</p>

                  <div className="mt-2 text-sm text-gray-500">
                    <p>Servings: {item.servings}</p>
                    <p>Difficulty: {item.difficulty}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p>Qty: {item.qty}</p>

                  <p className="font-semibold">
                    ${(Number(item.price) * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg border p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Button
            className={`text-white w-full ${!loading ? buttonColors.Ready : buttonColors.Loading}`}
            onClick={handleCheckout}
          >
            {!loading ? "Checkout" : "Loading"}
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}
