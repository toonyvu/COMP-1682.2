import { checkKey } from "./apiClient";
import { limit } from "@/constants/constants";

export async function getMealKits(page: number) {
  const token = await checkKey();

  console.log(process.env.NEXT_PUBLIC_API_URL);

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.message || "Failed to fetch recipes.");
  }

  return data;
}
