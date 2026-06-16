"use client";

import type { MealKitList } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { difficultyColor } from "@/constants/constants";
import { useEffect, useState } from "react";
import PaginationComponent from "@/components/PaginationComponent";
import { showToast } from "nextjs-toast-notify";
import { Input } from "../ui/input";

import { getMealKits } from "@/lib/api/mealkits";

import loading from "@/public/loading.svg";

import * as cartApi from "@/lib/api/carts";

import CartSheet from "./CartSheet";

import { Button } from "@/components/ui/button";

import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";

import { useQuery } from "@tanstack/react-query";

type Props = {
  week: number;
};
export default function MealkitList({ week }: Props) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const addItem = useCartStore((state) => state.addItem);
  const setCart = useCartStore((state) => state.setCart);

  const {
    data: mealkits,
    isLoading,
    isFetching,
  } = useQuery<MealKitList | null>({
    queryKey: ["mealkitQuery", page, week, debouncedSearch],

    queryFn: async () => {
      const res = await getMealKits(page, week, debouncedSearch);
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
        <div className="flex flex-row gap-8">
          <Input
            className="w-1/2 ml-85 h-10 ring-1 ring-gray-300"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSearch(e.target.value);
            }}
          ></Input>

          <Button className="h-10 bg-green-600 hover:bg-green-800">
            Search
          </Button>
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
      <div className="w-full place-self-center flex flex-row mt-8 gap-8">
        <Input
          className="w-1/2 ml-85 h-10 ring-1 ring-gray-300"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setSearch(e.target.value);
          }}
        ></Input>
        <Button className="h-10 bg-green-600 hover:bg-green-800">Search</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {mealkits.mealkits.map((recipe) => (
          <Link
            key={recipe.recipe_id}
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

                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {recipe.name}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {recipe.description}
                </p>

                <div className="text-sm font-semibold text-gray-800 mt-auto">
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
