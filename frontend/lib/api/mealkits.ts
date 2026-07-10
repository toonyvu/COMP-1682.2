import { limit } from "@/constants/constants";

import type { mealkitData, TagFilters } from "@/types/types";
import { apiFetch } from "./apiFetch";

export async function getMealKits(
  page: number,
  week: number,
  filters: TagFilters,
  search?: string,
) {
  console.log(process.env.NEXT_PUBLIC_API_URL);

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    week: week.toString(),
  });

  const ids = [
    ...filters.cookingTimes,
    ...filters.cuisines,
    ...filters.flavors,
    ...filters.recipeTypes,
  ].map(Number);

  ids.forEach((id) => {
    params.append("ids", id.toString());
  });

  if (search?.trim()) {
    params.append("search", search);
  }

  const result = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mealkits?${params}`,
    {
      method: "GET",
    },
  );

  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.message || "Failed to fetch recipes.");
  }

  return data;
}

export async function createMealkit(formData: mealkitData) {
  const result = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/mealkits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mealkitData: formData }),
  });

  console.log(process.env.NEXT_PUBLIC_API_URL);

  if (!result.ok) {
    const text = await result.text();
    console.log(text);
    throw new Error(`HTTP ${result.status}`);
  }

  const data = await result.json();
  return data;
}
