import { UserType } from "@/types/types";
import { apiFetch } from "./apiFetch";

export async function getUser(userId: number) {
  if (isNaN(userId)) return;

  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`${res.status}: ${msg}`);
  }

  const data = await res.json();
  return data;
}

export async function updateUser(user: UserType) {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    },
  );

  if (!res.ok) {
    const msg = await res.json();
    throw new Error(`${res.status}: ${msg}`);
  }

  const data = await res.json();
  return data;
}
