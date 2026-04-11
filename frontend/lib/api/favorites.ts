import { checkKey } from "./apiClient";

export async function addFavorite(id: number) {
  const token = await checkKey();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Unable to update favorites.");
  }

  return data;
}

export async function removeFavorite(id: number) {
  const token = await checkKey();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Unable to update favorites.");
  }

  return data;
}
