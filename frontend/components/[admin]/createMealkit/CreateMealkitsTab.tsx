"use client";

import { getWeeks } from "@/utils/dates";
import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { RecipeAdmin, RecipePaginated } from "@/types/types";

import PaginationComponent from "@/components/PaginationComponent";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRecipesAdmin } from "@/lib/api/recipes";

export default function CreateMealkitsTab() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [price, setPrice] = useState<number>(0);

  const { data: recipes } = useQuery<RecipePaginated>({
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
  const totalPages = Math.floor(total / 5) === 0 ? 1 : Math.ceil(total / 5);

  console.log(recipes);

  const [selectedWeek, setSelectedWeek] = useState<{
    week_number: number;
    year: number;
    range: string;
    available_from: string;
    available_until: string;
  } | null>(null);
  const weeks = getWeeks();
  console.log(weeks);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Create Mealkits</h1>

      <section className="flex flex-row w-full p-8">
        <div className="w-1/2 outline-1 p-4">
          <h2 className="text-2xl font-bold">Week Information</h2>

          <div>
            <h3 className="text-xl text-gray-600">Week</h3>
            <span>
              <Select
                value={`${selectedWeek ? `${selectedWeek.week_number}` : ""}`}
                onValueChange={(value) => {
                  const selected = weeks.find((w) => `${w.week}` === value);

                  if (!selected) return;

                  setSelectedWeek({
                    week_number: selected.week,
                    year: selected.year,
                    available_from: String(selected.start),
                    available_until: String(selected.end),
                    range: selected.range,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose Week..."></SelectValue>
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {weeks.map((week) => (
                      <SelectItem
                        key={`${week.week} - ${week.year}`}
                        value={`${week.week}`}
                      >
                        Week {week.week}, {week.year} ({week.range})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </span>

            <div className="flex flex-col gap-2">
              <Label htmlFor="calories-per-100g">Price</Label>

              <div className="flex flex-row gap-4 content-center">
                <Input
                  className="w-24"
                  id="calories-per-100g"
                  type="number"
                  placeholder="15.00"
                  value={price}
                  onChange={(e) => {
                    setPrice(Number(e.target.value));
                  }}
                />

                <span>$</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Search Recipes</h2>

          <div className="relative w-full flex flex-row">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
            w-md
            rounded-md
            border
            border-gray-300
            bg-white
            py-2 pl-10 pr-4
            text-sm
            outline-none
            "
            />
          </div>

          <PaginationComponent
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />

          <div className="flex flex-col gap-4 mt-4">
            {recipes?.recipes.map((recipe: RecipeAdmin) => (
              <div
                key={recipe.id}
                className="flex gap-4 p-4 rounded-xl border bg-white shadow-sm"
              >
                <Image
                  src={recipe.avatar_url}
                  alt={recipe.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{recipe.name}</h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex gap-2 mt-2 text-xs">
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {recipe.difficulty}
                    </span>

                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {recipe.servings} servings
                    </span>
                  </div>
                </div>

                <Button>Add</Button>
              </div>
            ))}
          </div>
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>

        <div className="flex-1 outline-1 p-4">
          <h2 className="text-2xl font-bold">Selected Mealkits</h2>

          <div></div>
        </div>
      </section>
    </div>
  );
}
