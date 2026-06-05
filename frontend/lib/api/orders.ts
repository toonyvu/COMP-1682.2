import { checkKey } from "./apiClient";

export async function getOrders() {
  const token = await checkKey();

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.ok) {
    const text = await result.text();
    console.error(result.status, text);
  }

  return result.json();
}

export async function getOrderDetails(orderId: string) {
  const token = await checkKey();

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!result.ok) {
    const text = await result.text();
    console.error(result.status, text);
  }

  return result.json();
}
