import { checkKey } from "./apiClient";

export async function addToCart(mealkitId: number) {
  const token = await checkKey();

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mealkitId }),
  });

  const data = await result.json();

  return { ok: result.ok, data: data };
}

export async function removeFromCart(mealkitId: number) {
  const token = await checkKey();

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mealkitId }),
  });

  const data = await result.json();
  return { ok: result.ok, data: data };
}

export async function getFullCart() {
  const token = await checkKey();

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return { ok: result.ok, data: data };
}
