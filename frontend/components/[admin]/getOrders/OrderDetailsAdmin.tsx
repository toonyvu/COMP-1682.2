"use client";

export type Props = {
  orderId: string;
  userId: string;
};

import { showToast } from "nextjs-toast-notify";
import type { UserOrder } from "@/types/types";
import loading from "@/public/loading.svg";
import type { OrderItems } from "@/types/types";
import type { OrderStatus } from "@/types/types";
import { countryNames } from "@/constants/constants";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { getOrderDetailsAdmin } from "@/lib/api/orders";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getUserAdmin } from "@/lib/api/users";
import type { UserType } from "@/types/types";
import { updateOrderStatus } from "@/lib/api/orders";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { allowedStatuses } from "@/constants/constants";

export default function OrderDetailsAdmin({ orderId, userId }: Props) {
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const { data: order, isLoading } = useQuery<UserOrder>({
    queryKey: ["adminOrderDetailsQuery", orderId, userId],

    queryFn: () => getOrderDetailsAdmin(orderId, userId),
  });

  const { data: user } = useQuery<UserType>({
    queryKey: ["UserInfoQuery", userId],

    queryFn: () => getUserAdmin(Number(userId)),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      orderId,
      currentStatus,
    }: {
      orderId: number;
      currentStatus: OrderStatus;
    }) => updateOrderStatus(orderId, currentStatus),

    onSuccess: (_, variables) => {
      console.log("Success!");
      showToast.success(
        `Successfully changed status to ${variables.currentStatus}!`,
        {
          position: "top-left",
          duration: 3000,
          transition: "slideInUp",
        },
      );
    },

    onError: () =>
      showToast.error("Failed to change order status.", {
        position: "top-left",
        duration: 3000,
        transition: "slideInUp",
      }),
  });

  if (!order) {
    return <div>Order not found.</div>;
  }

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-row gap-4">
          <Image
            src={loading}
            height={80}
            width={80}
            alt={"Loading"}
            className="animate-spin"
          ></Image>
        </div>
        <h1 className="mt-5">Fetching Recipes...</h1>
      </div>
    );
  }

  const currentStatus = status ?? order.status;
  const statusOptions = [currentStatus, ...allowedStatuses[currentStatus]];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Order #{order.cus_order_id}
              </h1>

              <p className="mt-2 text-gray-500">
                User #{order.user_id} ·{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <div>
              <Select
                value={status ?? order.status}
                onValueChange={(value) => setStatus(value as OrderStatus)}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>

                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectLabel>Order Status</SelectLabel>
                    {statusOptions.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="mt-4 w-36 bg-green-600 hover:bg-green-800">
                    {updateStatusMutation.isPending
                      ? "Saving..."
                      : "Save Order"}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently change
                      the order status!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogCancel
                    onClick={() => {
                      setStatus(null);
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-green-600"
                    onClick={() => {
                      if (!status) return;
                      updateStatusMutation.mutate({
                        orderId: order.id,
                        currentStatus: status,
                      });
                    }}
                  >
                    Save
                  </AlertDialogAction>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white shadow p-6 rounded-xl col-span-2">
            <h2 className="mb-4 text-lg font-semibold">User Details</h2>

            <div className="space-y-2">
              <p>Username: {user?.username}</p>
              <p>First Name: {user?.first_name ?? "N/A"}</p>
              <p>Last Name: {user?.last_name ?? "N/A"}</p>
              <p>Address: {order.line_1 ?? "N/A"}</p>
              <p>Apt/Suite/Floor: {order.line_2 ?? "N/A"}</p>
              <p>City: {order.city ?? "N/A"}</p>
              <p>State: {order.state ?? "N/A"}</p>
              <p>
                Country:{" "}
                {countryNames[order.country as keyof typeof countryNames] ??
                  "N/A"}
              </p>
              <p>Postal Code: {order.postal_code ?? "N/A"}</p>
              <p>Email: {user?.email ?? "N/A"}</p>
              <p>Phone: {user?.phone ?? "N/A"}</p>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">Payment Details</h2>

            <div className="space-y-2">
              <p>Method: {order.payment_method}</p>
              <p>Currency: {order.currency.toUpperCase()}</p>
              <p>Card: {order.card_brand ?? "N/A"}</p>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

            <div className="space-y-2">
              <p className="">
                Total:{" "}
                <span className="font-semibold">
                  ${Number(order.amount_total / 100).toFixed(2)}
                </span>
              </p>
              <p>Items: {order.items.length}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-6 text-lg font-semibold">Items Ordered</h2>

          <div className="space-y-4">
            {order.items.map((item: OrderItems) => (
              <div
                key={item.mealkit_id}
                className="flex gap-4 border-b pb-4 last:border-b-0"
              >
                <Image
                  width={250}
                  height={250}
                  src={item.recipe.avatar_url}
                  alt={item.recipe.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">{item.recipe.name}</h3>

                  <p className="text-sm text-gray-500">Quantity: {item.qty}</p>

                  <p className="text-sm text-gray-500">
                    Unit Price: ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="font-semibold">
                  ${(item.qty * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <details className="rounded-xl bg-white p-6 shadow">
          <summary className="cursor-pointer font-semibold">
            Technical Details
          </summary>

          <div className="mt-4 space-y-2 text-sm text-gray-500">
            <p>Payment Intent: {order.stripe_payment_intent_id}</p>
            <p>Session ID: {order.stripe_session_id}</p>
          </div>
        </details>
      </div>
    </div>
  );
}
