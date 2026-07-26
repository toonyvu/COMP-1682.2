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

export async function updateOrderStatus(orderId: number, status: string) {
  if (status !== "cancelled") {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/admin/updateStatus`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          status: status,
        }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to update Order Status");
    }

    if (res.status === 204) {
      return;
    }

    return res.json();
  } else {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/cancelOrder`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
        }),
      },
    );

    if (!res.ok) {
      let message = "Failed to update Order Status";

      try {
        const error = await res.json();
        message = error.message ?? message;
      } catch {}

      throw new Error(message);
    }

    if (res.status === 204) {
      return;
    }
  }
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

export async function getOrderDetailsAdmin(orderId: string, userId: string) {
  const result = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/admin/${orderId}?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!result.ok) {
    const text = await result.json();
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
