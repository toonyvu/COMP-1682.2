import { checkKey } from "./apiClient";

export async function getOrderSummary(sessionId: string) {
  const token = await checkKey();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/session/${sessionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to get Order.");
  }

  const data = await res.json();
  return data;
}
