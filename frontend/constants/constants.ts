import type { OrderStatus } from "@/types/types";

export const difficultyColor = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export const buttonColors = {
  Ready: "bg-green-600 hover:bg-green-700",
  Loading: "bg-gray-600 disabled:cursor-not-allowed",
};

export const limit = 12;

export const subscriptionPlans = {
  premium: "price_1TRZTsGyHK1KatBRY5Jt71sY",
  deluxe: "price_1TRZUHGyHK1KatBR1EwOrtcB",
};

export const allowedStatuses: Record<OrderStatus, OrderStatus[]> = {
  pending: ["paid", "cancelled"],
  paid: ["preparing", "cancelled"],
  preparing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

export const countryNames = {
  VN: "Vietnam",
  US: "United States",
  GB: "United Kingdom",
  SG: "Singapore",
  CN: "China",
  JP: "Japan",
  CA: "Canada",
};
