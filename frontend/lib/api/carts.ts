import { apiFetch } from "./apiFetch";

export async function addToCart(mealkitId: number) {
  const result = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mealkitId }),
  });

  const data = await result.json();

  return { ok: result.ok, data: data };
}

export async function removeFromCart(mealkitId: number) {
  const result = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/remove`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mealkitId }),
    },
  );

  const data = await result.json();
  return { ok: result.ok, data: data };
}

export async function getFullCart() {
  const result = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: "GET",
  });
  const data = await result.json();
  return { ok: result.ok, data: data };
}
