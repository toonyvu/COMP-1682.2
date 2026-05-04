import { checkKey } from "./apiClient";

export async function getOrder(sessionId: string) {
  const token = await checkKey();
  console.log(sessionId);
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
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }

  const data = await res.json();
  console.log(data);
  return data;
}
