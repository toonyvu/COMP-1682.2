import { apiFetch } from "./apiFetch";

export async function addFavorite(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Unable to update favorites.");
  }

  return data;
}

export async function removeFavorite(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Unable to update favorites.");
  }

  return data;
}
