"use client";

import {
  ClipboardList,
  BadgeCheck,
  Truck,
  CheckCheck,
  XCircle,
  Search,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

import { getOrders } from "@/lib/api/orders";
import { Button } from "../ui/button";

import { useState } from "react";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import type { UserOrder, OrderItems } from "@/types/types";

import { TimestampToDate } from "@/utils/dates";

export default function OrdersTab() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("newest");
  const [searchField, setSearchField] = useState("orderId");
  const [status, setStatus] = useState("");

  const router = useRouter();

  const {
    data: orders,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["ordersQuery"],

    queryFn: async () => {
      const res = await getOrders();
      return res.orders;
    },
  });

  const filteredOrders = orders?.filter((order: UserOrder) => {
    const term = search.toLowerCase();

    const matchesStatus =
      status === "" || order.status.toLowerCase() === status.toLowerCase();

    const matchesSearch =
      term === ""
        ? true
        : searchField === "orderId"
          ? order.cus_order_id.toLowerCase().includes(term)
          : order.items.some((item) =>
              item.recipe.name.toLowerCase().includes(term),
            );

    return matchesStatus && matchesSearch;
  });

  const sortedOrders = [...(filteredOrders ?? [])].sort((a, b) => {
    switch (sortField) {
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

      case "oldest":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

      case "high-to-low":
        return b.amount_total - a.amount_total;

      case "low-to-high":
        return a.amount_total - b.amount_total;

      default:
        return 0;
    }
  });

  console.log(orders);
  return (
    <div className="w-full bg-gray-100 h-full p-8">
      <header className="">
        <h1 className="font-black text-3xl mb-2">All Orders</h1>
        <p className="text-gray-600">Check your orders here.</p>
      </header>

      <div className="flex flex-row my-2 gap-2 w-1/2">
        <Button
          className={`flex flex-1 items-center gap-2 ${status === "" ? "bg-gray-100 text-green-800 border-b-2 border-b-green-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-b-2 border-b-gray-600"}  rounded-none`}
          onClick={() => {
            setStatus("");
          }}
        >
          <ClipboardList size={18} />
          <p className="text-lg">All Orders</p>
        </Button>

        <Button
          className={`flex flex-1 items-center gap-2 rounded-none ${status === "Paid" ? "bg-gray-100 text-green-800 border-b-2 border-b-green-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-b-2 border-b-gray-600"}`}
          onClick={() => {
            setStatus("Paid");
          }}
        >
          <BadgeCheck size={18} />
          <p className="text-lg">Paid</p>
        </Button>

        <Button
          className={`flex flex-1 items-center gap-2 rounded-none ${status === "Shipped" ? "bg-gray-100 text-green-800 border-b-2 border-b-green-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-b-2 border-b-gray-600"}`}
          onClick={() => setStatus("Shipped")}
        >
          <Truck size={18} />
          <p className="text-lg">Shipped</p>
        </Button>

        <Button
          className={`flex flex-1 items-center gap-2 rounded-none ${status === "Completed" ? "bg-gray-100 text-green-800 border-b-2 border-b-green-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-b-2 border-b-gray-600"}`}
          onClick={() => setStatus("Completed")}
        >
          <CheckCheck size={18} />
          <p className="text-lg">Completed</p>
        </Button>

        <Button
          className={`flex flex-1 items-center gap-2 rounded-none ${status === "Cancelled" ? "bg-gray-100 text-green-800 border-b-2 border-b-green-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-b-2 border-b-gray-600"}`}
          onClick={() => setStatus("Cancelled")}
        >
          <XCircle size={18} />
          <p className="text-lg">Cancelled</p>
        </Button>
      </div>

      <div className="relative w-full flex flex-row">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-md
            rounded-md
            border
            border-gray-300
            bg-white
            py-2 pl-10 pr-4
            text-sm
            outline-none
            "
        />
        <div className="flex flex-row ml-auto gap-8">
          <Select
            value={searchField}
            onValueChange={(value) => setSearchField(value)}
          >
            <SelectTrigger className="w-36 bg-white">
              <SelectValue placeholder="Filter search" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Search</SelectLabel>
                <SelectItem value="orderId">Order ID</SelectItem>
                <SelectItem value="recipeName">Recipe Name</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={sortField}
            onValueChange={(value) => setSortField(value)}
          >
            <SelectTrigger className="w-36 bg-white">
              <SelectValue placeholder="Sort..." />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="high-to-low">High to Low</SelectItem>
                <SelectItem value="low-to-high">Low to High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <section className="space-y-6 mt-6">
        {sortedOrders?.length === 0 && (
          <div className="place-self-center mt-24">
            <h1>No orders found.</h1>
          </div>
        )}
        {sortedOrders?.map((order: UserOrder) => (
          <div
            key={order.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <h2 className="font-bold text-lg">
                  Order #{order.cus_order_id}
                </h2>
                <p className="text-sm text-gray-500">
                  {TimestampToDate(order.created_at)}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-xl mb-1">
                  ${Number(order.amount_total).toFixed(2)}
                </p>

                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="divide-y">
              {order.items.map((item: OrderItems) => (
                <div
                  key={item.mealkit_id}
                  className="flex gap-4 p-4"
                  onClick={() => {
                    router.push(`/recipes/${item.recipe.id}`);
                  }}
                >
                  <Image
                    width={200}
                    height={200}
                    src={item.recipe.avatar_url}
                    alt={item.recipe.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.recipe.name}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.recipe.description}
                    </p>
                  </div>

                  <div className="text-right min-w-30">
                    <p>
                      Qty: <strong>{item.qty}</strong>
                    </p>

                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 border-t">
              <Button
                className="px-4 py-2 border rounded-md hover:bg-gray-200 bg-white h-full text-black outline-1 outline-gray-700"
                onClick={() => router.push(`orders/${order.cus_order_id}`)}
              >
                View Details
              </Button>

              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800">
                Reorder
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
