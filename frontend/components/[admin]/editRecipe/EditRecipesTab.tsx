"use client";
import { getRecipesAdmin } from "@/lib/api/recipes";
import { difficultyColor } from "@/constants/constants";
import PaginationComponent from "@/components/PaginationComponent";
import { useQuery } from "@tanstack/react-query";
import type { RecipePaginated } from "@/types/types";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditRecipesTab() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  const { data: recipes, isLoading } = useQuery<RecipePaginated>({
    queryKey: ["RecipeQuery", page, debouncedSearch],

    queryFn: async () => {
      return await getRecipesAdmin(page, debouncedSearch);
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const total = recipes?.total ?? 0;
  const totalPages = Math.floor(total / 12) === 0 ? 1 : Math.ceil(total / 12);

  if (!recipes) return <h1>No Recipes found.</h1>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="font-bold text-3xl mb-2">Edit Recipes</h1>
      <p className="text-gray-500">Manage your recipes: </p>

      <div className="mt-4 flex flex-row gap-4">
        <Input
          className="w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        <Button className="bg-green-600 hover:bg-green-800">Search</Button>
      </div>

      <PaginationComponent
        setPage={setPage}
        totalPages={totalPages}
        page={page}
      ></PaginationComponent>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {recipes.recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="flex gap-4 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            {/* Image */}
            <Image
              src={recipe.avatar_url}
              alt={recipe.name}
              width={120}
              height={120}
              className="h-30 w-30 rounded-lg object-cover"
            />

            {/* Details */}
            <div className="flex flex-1 flex-col">
              <h2 className="text-xl font-semibold">{recipe.name}</h2>

              <p className="mt-1 text-sm text-gray-500">{recipe.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyColor[recipe.difficulty]}`}
                >
                  Difficulty: {recipe.difficulty}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Prep: {recipe.prep_time} min
                </span>

                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  Cook: {recipe.cooking_time} min
                </span>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  Serves {recipe.servings}
                </span>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                Created on {new Date(recipe.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center justify-end gap-4">
              <Button
                className="bg-green-600 hover:bg-green-800 w-16 p-4"
                onClick={() => {
                  router.push(`/admin/dashboard/recipes/edit/${recipe.id}`);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
