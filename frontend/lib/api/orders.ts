import { apiFetch } from "./apiFetch";
import { limit } from "@/constants/constants";

export async function getOrders() {
  const result = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!result.ok) {
    const text = await result.text();
    console.error(result.status, text);
  }

  return result.json();
}

export async function getOrderDetails(orderId: string) {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const result = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!result.ok) {
    const text = await result.text();
    console.error(result.status, text);
  }

  return result.json();
}

export async function getOrdersAdmin(
  searchField: string,
  search: string,
  status: string,
  order: string,
  sort: string,
  page: string,
) {
  const params = new URLSearchParams({
    searchField: searchField.toString(),
    search: search.toString(),
    status: status.toString(),
    order: order.toString(),
    sort: sort.toString(),
    page: page.toString(),
    limit: limit.toString(),
  });

  const result = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/admin?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!result.ok) {
    const text = await result.text();
    console.error(result.status, text);
  }

  return result.json();
}
