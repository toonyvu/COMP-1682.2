import Image from "next/image";

import * as cartService from "@/lib/api/carts";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";

import cart from "@/public/shopping-basket (1).png";

import { useCartStore } from "@/stores/cartStore";

export default function CartSheet() {
  const cartItems = useCartStore((state) => state.cartItems);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const setCart = useCartStore((state) => state.setCart);

  const addCartBackend = async (mealkitId: number) => {
    await cartService.addToCart(mealkitId);
  };

  const removeCartBackend = async (mealkitId: number) => {
    await cartService.removeFromCart(mealkitId);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          className="hover:scale-105"
          width={50}
          height={50}
          alt={"Shop"}
          src={cart}
        />
      </SheetTrigger>
      <SheetContent className="z-100 flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}

          {cartItems.map((item) => {
            const price = Number(item.price);
            const subtotal = price * item.qty;

            return (
              <div
                key={item.mealkit_id}
                className="flex gap-4 border rounded-xl p-3"
              >
                {/* Image */}
                <div className="relative w-20 h-20 shrink-0">
                  <Image
                    src={item.avatar_url}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1">
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>

                  <p className="text-sm text-gray-500">
                    {item.servings} servings
                  </p>

                  {/* Price + Qty Controls */}
                  <div className="flex items-center mt-auto">
                    <p className="font-semibold">${price.toFixed(2)}</p>

                    <div className="ml-auto flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          removeItem(item);
                          removeCartBackend(item.mealkit_id);
                        }}
                      >
                        -
                      </Button>

                      <span className="w-6 text-center">{item.qty}</span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          addItem(item);
                          addCartBackend(item.mealkit_id);
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <p className="text-sm text-gray-600 mt-1">
                    Subtotal: ${subtotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <SheetFooter className="p-5 border-t flex flex-col gap-3">
          {/* Total */}
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>
              $
              {cartItems
                .reduce(
                  (total, item) => total + Number(item.price) * item.qty,
                  0,
                )
                .toFixed(2)}
            </span>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
