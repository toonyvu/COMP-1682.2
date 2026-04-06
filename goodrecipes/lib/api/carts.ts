import { checkKey } from "./apiClient";

export async function addToCart(
  userId: number,
  mealkitId: number,
  week: number,
) {
  const token = checkKey();

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, mealkitId, week }),
  });

  const data = await result.json();

  return { ok: result.ok, data: data };
}

export async function removeFromCart(userId: number, mealkitId: number) {
  const token = await checkKey();

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, mealkitId }),
  });

  const data = await result.json();
  return { ok: result.ok, data: data };
}

export async function getFullCart(userId: number) {
  const token = await checkKey();

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type:": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await result.json();
  return { ok: result.ok, data: data };
}
