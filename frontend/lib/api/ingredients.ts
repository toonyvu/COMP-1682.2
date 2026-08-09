import { apiFetch } from "./apiFetch";

export async function getIngredients(page: number, limit: number) {
  console.log("Hi");
  const result = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ingredients?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.message || "Failed to fetch ingredients.");
  }

  return data;
}
