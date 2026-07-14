import { apiFetch } from "./apiFetch";

export async function getNotifications() {
  const result = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!result.ok) {
    const text = await result.text();
    console.error(text);
  }

  return result.json();
}
