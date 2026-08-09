"use client";

import type { MealKitList, TagFilters } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { difficultyColor } from "@/constants/constants";
import { useEffect, useState } from "react";
import PaginationComponent from "@/components/PaginationComponent";
import { showToast } from "nextjs-toast-notify";
import { Input } from "../ui/input";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

import { getMealKits } from "@/lib/api/mealkits";

import loading from "@/public/loading.svg";

import * as cartApi from "@/lib/api/carts";

import CartSheet from "./CartSheet";

import { Button } from "@/components/ui/button";

import { useCartStore } from "@/stores/cartStore";

import { useQuery } from "@tanstack/react-query";

type Props = {
  week: number;
};
export default function MealkitList({ week }: Props) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [filters, setFilters] = useState<TagFilters>({
    cookingTimes: [] as string[],
    recipeTypes: [] as string[],
    cuisines: [] as string[],
    flavors: [] as string[],
  });
  const [filtersOpen, setFiltersOpen] = useState(true);

  const addItem = useCartStore((state) => state.addItem);
  const setCart = useCartStore((state) => state.setCart);

  const {
    data: mealkits,
    isLoading,
    isFetching,
  } = useQuery<MealKitList | null>({
    queryKey: ["mealkitQuery", page, week, debouncedSearch, filters],

    queryFn: async () => {
      const res = await getMealKits(page, week, filters, debouncedSearch);
      console.log(res.data);
      return res.data;
    },
  });

  const total = mealkits?.total ?? 0;
  const totalPages = Math.floor(total / 12) === 0 ? 1 : Math.ceil(total / 12);

  console.log(total, totalPages);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    async function loadCart() {
      const data = await cartApi.getFullCart();
      setCart(data.data.result.items);
    }
    loadCart();
  }, []);

  async function addToBackend(mealkitId: number) {
    try {
      await cartApi.addToCart(mealkitId);
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-row gap-4">
          <Image
            src={loading}
            height={80}
            width={80}
            alt={"Loading"}
            className="animate-spin"
          ></Image>
        </div>
        <h1 className="mt-5">Fetching Recipes...</h1>
      </div>
    );
  }

  if (!mealkits) {
    return <div>Something went wrong.</div>;
  }

  if (total === 0) {
    return (
      <div className="w-full place-self-center mt-8 gap-8">
        <div className="w-full flex justify-center">
          <div className="flex gap-2">
            <Input
              className="h-10 w-300 ring-1 ring-gray-300"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button className="h-10 bg-green-600 hover:bg-green-800">
              Search
            </Button>
          </div>
        </div>

        <div className="w-1/2 place-self-center mt-4">
          <Card>
            <CardContent>
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="font-semibold text-xl flex flex-row w-full justify-between">
                    <h3 className="text-2xl">Tag Filters</h3>
                    <ChevronRight></ChevronRight>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-4 mt-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-500 mb-2">
                        Cooking Time
                      </h3>
                      <div className="flex flex-row gap-4 text-lg">
                        <ToggleGroup
                          variant="outline"
                          type="multiple"
                          value={filters.cookingTimes}
                          onValueChange={(value) => {
                            setFilters((prev) => ({
                              ...prev,
                              cookingTimes: value,
                            }));
                          }}
                        >
                          <ToggleGroupItem value="28" className="">
                            15 Minutes or Less
                          </ToggleGroupItem>
                          <ToggleGroupItem value="27">
                            30 Minutes or Less
                          </ToggleGroupItem>
                          <ToggleGroupItem value="26">
                            Weekend Project
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-500 mb-2">
                        Recipe Type
                      </h3>
                      <div className="flex flex-row gap-4">
                        <ToggleGroup
                          variant="outline"
                          type="multiple"
                          value={filters.recipeTypes}
                          onValueChange={(value) => {
                            setFilters((prev) => ({
                              ...prev,
                              recipeTypes: value,
                            }));
                          }}
                        >
                          <ToggleGroupItem value="25">
                            Vegetarian
                          </ToggleGroupItem>
                          <ToggleGroupItem value="24">Vegan</ToggleGroupItem>
                          <ToggleGroupItem value="23">
                            Pescatarian
                          </ToggleGroupItem>
                          <ToggleGroupItem value="22">
                            Gluten Free
                          </ToggleGroupItem>
                          <ToggleGroupItem value="21">
                            Dairy Free
                          </ToggleGroupItem>
                          <ToggleGroupItem value="20">Halal</ToggleGroupItem>
                          <ToggleGroupItem value="19">Low Carb</ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-500 mb-2">
                        Cuisine
                      </h3>
                      <div className="flex flex-row gap-4">
                        <ToggleGroup
                          variant="outline"
                          type="multiple"
                          value={filters.cuisines}
                          onValueChange={(value) => {
                            setFilters((prev) => ({
                              ...prev,
                              cuisines: value,
                            }));
                          }}
                        >
                          <ToggleGroupItem value="18">Italian</ToggleGroupItem>
                          <ToggleGroupItem value="17">Japanese</ToggleGroupItem>
                          <ToggleGroupItem value="16">Korean</ToggleGroupItem>
                          <ToggleGroupItem value="15">Chinese</ToggleGroupItem>
                          <ToggleGroupItem value="14">
                            Vietnamese
                          </ToggleGroupItem>
                          <ToggleGroupItem value="13">Thai</ToggleGroupItem>
                          <ToggleGroupItem value="12">Indian</ToggleGroupItem>
                          <ToggleGroupItem value="11">Mexican</ToggleGroupItem>
                          <ToggleGroupItem value="10">French</ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-500 mb-2">
                        Flavor
                      </h3>
                      <div className="flex flex-row gap-4">
                        <ToggleGroup
                          variant="outline"
                          type="multiple"
                          value={filters.flavors}
                          onValueChange={(value) => {
                            setFilters((prev) => ({
                              ...prev,
                              flavors: value,
                            }));
                          }}
                        >
                          <ToggleGroupItem value="9">Spicy</ToggleGroupItem>
                          <ToggleGroupItem value="8">Mild</ToggleGroupItem>
                          <ToggleGroupItem value="7">Sweet</ToggleGroupItem>
                          <ToggleGroupItem value="6">Savoury</ToggleGroupItem>
                          <ToggleGroupItem value="5">Tangy</ToggleGroupItem>
                          <ToggleGroupItem value="4">Smoky</ToggleGroupItem>
                          <ToggleGroupItem value="3">Creamy</ToggleGroupItem>
                          <ToggleGroupItem value="2">Herby</ToggleGroupItem>
                          <ToggleGroupItem value="1">Garlicky</ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        <h1 className="place-self-center my-20 text-lg text-gray-600">
          No recipes found.
        </h1>

        <div className="fixed bottom-4 right-8 z-50">
          <CartSheet />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="w-full flex justify-center mt-8">
        <div className="flex gap-2 mx-auto">
          <Input
            className="h-10 ring-1 ring-gray-300 w-300"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button className="h-10 bg-green-600 hover:bg-green-800">
            Search
          </Button>
        </div>
      </div>

      <div className="w-1/2 place-self-center mt-4">
        <Card>
          <CardContent>
            <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="text-md flex flex-row w-full justify-between">
                  <h3 className="font-semibold">Tag Filters</h3>
                  <ChevronRight></ChevronRight>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      Cooking Time
                    </h3>
                    <div className="flex flex-row gap-4">
                      <ToggleGroup
                        variant="outline"
                        type="multiple"
                        value={filters.cookingTimes}
                        onValueChange={(value) => {
                          setFilters((prev) => ({
                            ...prev,
                            cookingTimes: value,
                          }));
                        }}
                      >
                        <ToggleGroupItem value="28">
                          15 Minutes or Less
                        </ToggleGroupItem>
                        <ToggleGroupItem value="27">
                          30 Minutes or Less
                        </ToggleGroupItem>
                        <ToggleGroupItem value="29">
                          60 Minutes or Less
                        </ToggleGroupItem>
                        <ToggleGroupItem value="26">
                          Weekend Project
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      Recipe Type
                    </h3>
                    <div className="flex flex-row gap-4">
                      <ToggleGroup
                        variant="outline"
                        type="multiple"
                        value={filters.recipeTypes}
                        onValueChange={(value) => {
                          setFilters((prev) => ({
                            ...prev,
                            recipeTypes: value,
                          }));
                        }}
                      >
                        <ToggleGroupItem value="25">Vegetarian</ToggleGroupItem>
                        <ToggleGroupItem value="24">Vegan</ToggleGroupItem>
                        <ToggleGroupItem value="23">
                          Pescatarian
                        </ToggleGroupItem>
                        <ToggleGroupItem value="22">
                          Gluten Free
                        </ToggleGroupItem>
                        <ToggleGroupItem value="21">Dairy Free</ToggleGroupItem>
                        <ToggleGroupItem value="20">Halal</ToggleGroupItem>
                        <ToggleGroupItem value="19">Low Carb</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      Cuisine
                    </h3>
                    <div className="flex flex-row gap-4">
                      <ToggleGroup
                        variant="outline"
                        type="multiple"
                        value={filters.cuisines}
                        onValueChange={(value) => {
                          setFilters((prev) => ({
                            ...prev,
                            cuisines: value,
                          }));
                        }}
                      >
                        <ToggleGroupItem value="18">Italian</ToggleGroupItem>
                        <ToggleGroupItem value="17">Japanese</ToggleGroupItem>
                        <ToggleGroupItem value="16">Korean</ToggleGroupItem>
                        <ToggleGroupItem value="15">Chinese</ToggleGroupItem>
                        <ToggleGroupItem value="14">Vietnamese</ToggleGroupItem>
                        <ToggleGroupItem value="13">Thai</ToggleGroupItem>
                        <ToggleGroupItem value="12">Indian</ToggleGroupItem>
                        <ToggleGroupItem value="11">Mexican</ToggleGroupItem>
                        <ToggleGroupItem value="10">French</ToggleGroupItem>
                        <ToggleGroupItem value="30">Other</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      Flavor
                    </h3>
                    <div className="flex flex-row gap-4">
                      <ToggleGroup
                        variant="outline"
                        type="multiple"
                        value={filters.flavors}
                        onValueChange={(value) => {
                          setFilters((prev) => ({
                            ...prev,
                            flavors: value,
                          }));
                        }}
                      >
                        <ToggleGroupItem value="31">Cheesy</ToggleGroupItem>
                        <ToggleGroupItem value="9">Spicy</ToggleGroupItem>
                        <ToggleGroupItem value="8">Mild</ToggleGroupItem>
                        <ToggleGroupItem value="7">Sweet</ToggleGroupItem>
                        <ToggleGroupItem value="6">Savoury</ToggleGroupItem>
                        <ToggleGroupItem value="5">Tangy</ToggleGroupItem>
                        <ToggleGroupItem value="4">Smoky</ToggleGroupItem>
                        <ToggleGroupItem value="3">Creamy</ToggleGroupItem>
                        <ToggleGroupItem value="2">Herby</ToggleGroupItem>
                        <ToggleGroupItem value="1">Garlicky</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto sm:px-6 mt-8">
        {mealkits.mealkits.map((recipe) => (
          <Link
            key={recipe.mealkit_id}
            href={`/recipes/${recipe.recipe_id}?mealkit=${recipe.mealkit_id}`}
            scroll
            className="block h-full hover:scale-105"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-gray-600 transition duration-300 h-full flex flex-col">
              <div className="relative w-full aspect-4/3">
                <Image
                  src={recipe.avatar_url}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full w-fit ${difficultyColor[recipe.difficulty]}`}
                >
                  {recipe.difficulty}
                </span>

                <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                  {recipe.name}
                </h2>

                <p className="text-lg text-gray-500 line-clamp-2">
                  {recipe.description}
                </p>

                <h3 className="text-md font-semibold">
                  Tags:{" "}
                  {recipe.tags.map((tag, index) => (
                    <span key={tag} className="text-md text-gray-500">
                      {index > 0 && ", "}
                      {tag}
                    </span>
                  ))}
                </h3>

                <div className="text-md font-semibold text-gray-800 mt-auto">
                  <p>Servings: {recipe.servings}</p>
                  <div className="flex flex-row">
                    <div>
                      <p>
                        {recipe.prep_time} min prep • {recipe.cooking_time} min
                        cook
                      </p>
                      <p className="ml-auto">{recipe.price}$</p>
                    </div>

                    <div className="ml-auto">
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          console.log("Adding item");
                          showToast.success(`Added ${recipe.name} to cart!`, {
                            position: "top-left",
                            duration: 3000,
                            transition: "slideInUp",
                          });
                          addItem(recipe);

                          addToBackend(recipe.mealkit_id);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <PaginationComponent
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      <div className="fixed bottom-4 right-8 z-50">
        <CartSheet />
      </div>
    </>
  );
}
