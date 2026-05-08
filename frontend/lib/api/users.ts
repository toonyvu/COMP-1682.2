import { checkKey } from "./apiClient";

export async function getUser(userId: number) {
  console.log(userId);
  const token = await checkKey();

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
