import { checkKey } from "./apiClient";
import { UserType } from "@/types/types";

export async function getUser(userId: number) {
  const token = await checkKey();

  if (isNaN(userId)) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  const token = await checkKey();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const msg = await res.json();
    throw new Error(`${res.status}: ${msg}`);
  }
}
