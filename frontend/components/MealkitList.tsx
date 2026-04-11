"use client";

import type { MealKitList } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { difficultyColor } from "@/constants/constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PaginationComponent from "@/components/PaginationComponent";

import { getMealKits } from "@/lib/api/getMealKits";

import loading from "@/public/loading.svg";
import { limit } from "@/constants/constants";

import cart from "@/public/shopping-basket (1).png";

import * as cartApi from "@/lib/api/carts";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";

type Props = {
  week: number;
};
export default function MealkitList({ week }: Props) {
  const router = useRouter();
  const [mealkits, setMealkits] = useState<MealKitList | null>(null);

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const totalPages = mealkits ? Math.ceil(total / limit) : 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMealKits(page, week);
        setMealkits(data.result);
        setTotal(data.result.total);
      } catch (err) {
        console.log(err);
        router.push("/");
      }
    };

    fetchData();
  }, [router, page, week]);

  const addToCart = async (mealkitId: number, mealkitWeek: number) => {
    console.log(mealkitId);
    const result = await cartApi.addToCart(mealkitId, mealkitWeek);
    console.log(result);
  };

  if (!mealkits) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Image
          src={loading}
          height={80}
          width={80}
          alt={"Loading"}
          className="animate-spin"
        ></Image>

        <h1 className="mt-5">Fetching Recipes...</h1>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div>
        <h1 className="place-self-center my-20 text-lg text-gray-600">
          No recipes found.
        </h1>

        <div className="fixed bottom-4 right-8 z-50">
          <Sheet>
            <SheetTrigger>
              <Image
                className="hover:scale-105"
                width={50}
                height={50}
                alt={"Shop"}
                src={cart}
              />
            </SheetTrigger>

            <SheetContent className="z-100">
              <SheetHeader>
                <SheetTitle>Test</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 sm:px-6 mt-15">
        {mealkits.mealkits.map(
          (recipe) => (
            console.log("RECIPE:", recipe),
            (
              <Link
                key={recipe.recipe_id}
                href={`/recipes/${recipe.recipe_id}`}
                scroll
                className="block h-full"
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
                            {recipe.prep_time} min prep • {recipe.cooking_time}{" "}
                            min cook
                          </p>
                          <p className="ml-auto">{recipe.price}$</p>
                        </div>

                        <div className="ml-auto">
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              addToCart(recipe.mealkit_id, week);
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
            )
          ),
        )}
      </div>

      <PaginationComponent
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      <div className="fixed bottom-4 right-8 z-50">
        <Sheet>
          <SheetTrigger>
            <Image
              className="hover:scale-105"
              width={50}
              height={50}
              alt={"Shop"}
              src={cart}
            />
          </SheetTrigger>

          <SheetContent className="z-100">
            <SheetHeader>
              <SheetTitle>Test</SheetTitle>
            </SheetHeader>
            <div className="w-full h-full p-5"></div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
