"use client";

import { getWeeks } from "@/utils/dates";
import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createMealkit } from "@/lib/api/mealkits";

import { showToast } from "nextjs-toast-notify";
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

import type { mealkitData, RecipeAdmin, RecipePaginated } from "@/types/types";

import PaginationComponent from "@/components/PaginationComponent";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRecipesAdmin } from "@/lib/api/recipes";

export default function CreateMealkitsTab() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [errors, setErrors] = useState({
    week: "",
    price: "",
  });

  const validateForm = () => {
    const newErrors = {
      week: "",
      price: "",
    };

    let valid = true;

    if (!selectedWeek) {
      newErrors.week = "Please select a week.";
      valid = false;
    }

    if (price <= 0) {
      newErrors.price = "Price must be greater than 0.";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const defaultFormData = {
    week_number: 0,
    year: 0,
    available_from: "",
    available_until: "",
    price: 0,
    recipe_id: 0,
    max_servings: 0,
  };

  const [formData, setFormData] = useState<mealkitData>({
    week_number: 0,
    year: 0,
    available_from: "",
    available_until: "",
    price: 0,
    recipe_id: 0,
    max_servings: 0,
  });
  const [price, setPrice] = useState<number>(0);

  const [selectedRecipe, setSelectedRecipe] = useState<RecipeAdmin | null>(
    null,
  );

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

  const [selectedWeek, setSelectedWeek] = useState<{
    week_number: number;
    year: number;
    range: string;
    available_from: string;
    available_until: string;
  } | null>(null);
  const weeks = getWeeks();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Create Mealkits</h1>

      <section className="flex flex-row w-full p-8">
        <div className="w-1/2 outline-1 p-4">
          <h2 className="text-2xl font-bold">Week Information</h2>

          <div className="outline-1 rounded-xl p-4 my-4 flex flex-row gap-12">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl text-gray-600 font-semibold">Week</h3>
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
                  <SelectTrigger
                    className={errors.week ? "border-red-500" : ""}
                  >
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
              {errors.week && (
                <p className="text-sm text-red-500 mt-1">{errors.week}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="calories-per-100g"
                className="text-xl text-gray-600 font-semibold"
              >
                Price
              </Label>

              <div className="flex flex-row gap-4 content-center">
                <Input
                  className={`w-24 ${errors.price ? "border-red-500" : ""}`}
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
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">{errors.price}</p>
              )}
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

                <Button
                  disabled={selectedRecipe !== null}
                  onClick={() => {
                    if (!validateForm()) return;
                    if (!selectedWeek) return;

                    setSelectedRecipe(recipe);

                    setFormData({
                      week_number: selectedWeek.week_number,
                      year: selectedWeek.year,
                      available_from: selectedWeek.available_from,
                      available_until: selectedWeek.available_until,
                      price,
                      recipe_id: recipe.id,
                      max_servings: recipe.servings,
                    });

                    console.log(formData);
                  }}
                >
                  {selectedRecipe ? "Recipe Selected" : "Add"}
                </Button>
              </div>
            ))}
          </div>
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>

        <div className="flex-1 bg-white outline-1 p-4">
          <h2 className="text-2xl font-bold mb-6">Selected Meal Kit</h2>

          {!selectedRecipe ? (
            <div className="border-2 border-dashed rounded-xl p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-600">
                No recipe selected
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Choose a recipe from the left panel to create a meal kit.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-xl border">
                <div className="relative h-56 w-full">
                  <Image
                    src={selectedRecipe.avatar_url}
                    alt={selectedRecipe.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">
                        {selectedRecipe.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {selectedRecipe.description}
                      </p>
                    </div>

                    <Button
                      variant="destructive"
                      onClick={() => {
                        showToast.info(
                          `${selectedRecipe.name} has been removed.`,
                          {
                            position: "top-left",
                            duration: 3000,
                          },
                        );
                        setSelectedRecipe(null);

                        setFormData((prev) => ({
                          ...prev,
                          recipe_id: 0,
                        }));
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border p-5">
                <h3 className="font-semibold text-lg mb-4">
                  Meal Kit Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Week</p>

                    <p className="font-medium">Week {formData.week_number}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Year</p>

                    <p className="font-medium">{formData.year}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Available From</p>

                    <p className="font-medium">
                      {selectedWeek?.available_from}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Available Until</p>

                    <p className="font-medium">
                      {selectedWeek?.available_until}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Price</p>

                    <p className="font-bold text-green-700">
                      ${formData.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-gray-100 p-4 text-center">
                  <p className="text-sm text-gray-500">Difficulty</p>

                  <p className="font-semibold">{selectedRecipe.difficulty}</p>
                </div>

                <div className="rounded-xl bg-gray-100 p-4 text-center">
                  <p className="text-sm text-gray-500">Servings</p>

                  <p className="font-semibold">{selectedRecipe.servings}</p>
                </div>

                <div className="rounded-xl bg-gray-100 p-4 text-center">
                  <p className="text-sm text-gray-500">Recipe ID</p>

                  <p className="font-semibold">#{selectedRecipe.id}</p>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={async () => {
                  const res = await createMealkit(formData);
                  showToast.success(`${selectedRecipe.name} has been added!`, {
                    position: "top-left",
                    duration: 3000,
                  });
                  setFormData(defaultFormData);
                  console.log(res);
                  setSelectedRecipe(null);
                }}
              >
                Create Meal Kit
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
