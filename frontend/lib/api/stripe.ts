import { apiFetch } from "./apiFetch";

export async function getOrder(sessionId: string) {
  console.log(sessionId);

  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/session/${sessionId}`,
    {
      method: "GET",
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
