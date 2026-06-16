"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getOrdersAdmin } from "@/lib/api/orders";

import { useQuery } from "@tanstack/react-query";

export default function OrdersTabAdmin() {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("orderId");
  const [sort, setSort] = useState("amount_total");
  const [order, setOrder] = useState("desc");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: orders = [], isLoading } = useQuery({
    queryKey: [
      "adminOrdersQuery",
      debouncedSearch,
      searchField,
      status,
      sort,
      order,
      page,
    ],

    queryFn: () =>
      getOrdersAdmin(
        searchField,
        debouncedSearch,
        status,
        order,
        sort,
        String(page),
      ),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  console.log(orders);

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-bold font-bold text-3xl pt-10 ml-10">Orders</h1>
      <div className="mx-auto w-4/5 space-y-6 px-4 py-8">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search Field */}
            <Select value={searchField} onValueChange={setSearchField}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectGroup>
                  <SelectLabel>Search Fields</SelectLabel>

                  <SelectItem value="orderId">Order ID</SelectItem>

                  <SelectItem value="username">Username</SelectItem>

                  <SelectItem value="firstName">First Name</SelectItem>

                  <SelectItem value="lastName">Last Name</SelectItem>

                  <SelectItem value="phone">Phone</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Search Input */}
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="flex-1"
            />
          </div>

          {/* Sort Controls */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectGroup>
                  <SelectLabel>Sort Fields</SelectLabel>

                  <SelectItem value="created_at">Created At</SelectItem>

                  <SelectItem value="amount_total">Price</SelectItem>

                  <SelectItem value="status">Status</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={order} onValueChange={setOrder}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Order" />
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectGroup>
                  <SelectLabel>Order</SelectLabel>

                  <SelectItem value="asc">Ascending</SelectItem>

                  <SelectItem value="desc">Descending</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Status Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { label: "All Orders", value: "" },
              { label: "Paid", value: "paid" },
              { label: "Shipped", value: "shipped" },
              { label: "Completed", value: "completed" },
              { label: "Cancelled", value: "cancelled" },
            ].map((item) => (
              <Button
                key={item.value || "all"}
                variant={status === item.value ? "default" : "outline"}
                onClick={() => {
                  setStatus(item.value);
                  setPage(1);
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {orders.length === 0 && (
        <div className="place-self-center mt-15">No orders found.</div>
      )}

      {orders && (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="w-4/5 mx-auto rounded-xl border bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold">
                      {order.cus_order_id}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "completed"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    Order #{order.id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold">
                    ${Number(order.amount_total / 100).toFixed(2)}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Customer + Payment */}
              <div className="grid gap-6 border-b p-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-medium text-gray-900">Customer</h3>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{order.customer.username}</p>

                    {(order.customer.first_name ||
                      order.customer.last_name) && (
                      <p>
                        {order.customer.first_name} {order.customer.last_name}
                      </p>
                    )}

                    {order.customer.phone && <p>{order.customer.phone}</p>}

                    {order.customer.address && <p>{order.customer.address}</p>}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-medium text-gray-900">Payment</h3>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      Method:{" "}
                      <span className="font-medium">
                        {order.payment_method}
                      </span>
                    </p>

                    <p>
                      Currency:{" "}
                      <span className="uppercase">{order.currency}</span>
                    </p>

                    {order.card_brand && <p>Card: {order.card_brand}</p>}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="p-6">
                <h3 className="mb-4 font-medium text-gray-900">
                  Items ({order.items.length})
                </h3>

                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div
                      key={item.mealkit_id}
                      className="flex items-center gap-4 rounded-lg border p-4"
                    >
                      <Image
                        src={item.recipe.avatar_url}
                        width={50}
                        height={50}
                        alt={item.recipe.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h4 className="font-medium">{item.recipe.name}</h4>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.qty}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>

                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
