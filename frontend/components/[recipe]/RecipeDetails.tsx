"use client";

import { difficultyColor } from "@/constants/constants";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useCartStore } from "@/stores/cartStore";
import { showToast } from "nextjs-toast-notify";
import CartSheet from "../[mealkits]/CartSheet";
import * as cartApi from "@/lib/api/carts";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { TimestampToDate } from "@/utils/dates";
import { useState } from "react";
import { getRecipe } from "@/lib/api/recipes";
import { addFavorite, removeFavorite } from "@/lib/api/favorites";
import loading from "@/public/loading.svg";

import type { RecipeWithDetails } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: number;
  mealkitId: number;
};

export default function RecipeDetails({ id, mealkitId }: Props) {
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState({
    qty: "",
  });
  const addItem = useCartStore((state) => state.addItem);

  const { data: recipeDetails } = useQuery<RecipeWithDetails | null>({
    queryKey: ["recipe", id],

    queryFn: async () => getRecipe(id, mealkitId),
  });

  const handleAdd = async (qty: number) => {
    if (!recipeDetails) {
      return null;
    }

    if (qty < 1) {
      setIsError(true);
      setErrMsg({ qty: "Quantity must be at least 1." });
      showToast.error("Quantity must be at least 1.", {
        position: "top-left",
        duration: 3000,
        transition: "slideInUp",
      });

      return;
    }

    const addedRecipe = {
      mealkit_id: mealkitId,
      recipe_id: recipeDetails.mealkitData.recipe_id,
      name: recipeDetails.name,
      description: recipeDetails.description,
      avatar_url: recipeDetails.avatar_url,
      servings: recipeDetails.servings,
      difficulty: recipeDetails.difficulty,
      prep_time: recipeDetails.prep_time,
      cooking_time: recipeDetails.cooking_time,
      created_at: recipeDetails.created_at,
      price: String(recipeDetails.mealkitData.price),
      tags: recipeDetails.tags,
    };

    addItem(addedRecipe, qty);
    console.log(qty);
    showToast.success(
      `Added ${qty} ${addedRecipe.name}${qty === 1 ? "" : "s"} to cart!`,
      {
        position: "top-left",
        duration: 3000,
        transition: "slideInUp",
      },
    );
    try {
      await cartApi.addToCart(mealkitId);
    } catch (err) {
      console.log(err);
    }
  };

  const [favorited, setFavorited] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);

  console.log(recipeDetails?.recipeTags);

  if (!recipeDetails) return;
  const available_from = TimestampToDate(
    recipeDetails?.mealkitData.available_from,
  );

  const available_until = TimestampToDate(
    recipeDetails?.mealkitData.available_until,
  );

  async function toggleFavorite() {
    try {
      if (!favorited) {
        await addFavorite(id);
        setFavorited(true);
      } else {
        await removeFavorite(id);
        setFavorited(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (!recipeDetails || favorited === null)
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

  return (
    <div className="px-10">
      <div className="flex flex-row">
        <div>
          <div className="mx-auto mt-10 flex w-full items-start gap-12 px-8">
            <div className="flex flex-1 items-start gap-8">
              <div className="w-[420px] shrink-0">
                <Image
                  src={recipeDetails.avatar_url}
                  alt={recipeDetails.name}
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-row items-center gap-4">
                  <h1 className="font-bold text-3xl">{recipeDetails.name}</h1>

                  <span
                    className={`h-6 w-24 sm:h-8 px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center ${
                      difficultyColor[recipeDetails.difficulty]
                    }`}
                  >
                    {recipeDetails.difficulty}
                  </span>
                </div>

                <span className="font-semibold text-4xl text-blue-700">
                  ${recipeDetails.mealkitData.price}
                </span>

                <span className="font-semibold text-gray-600">
                  Tags:{" "}
                  {recipeDetails.recipeTags.map((tag) => tag.name).join(", ")}
                </span>

                <span className="font-semibold text-gray-600">
                  Week:{" "}
                  <span className="text-black">
                    {recipeDetails.mealkitData.week_number}
                  </span>
                </span>

                <span className="font-semibold text-gray-600">
                  Year:{" "}
                  <span className="text-black">
                    {recipeDetails.mealkitData.year}
                  </span>
                </span>

                <span className="font-semibold text-gray-600">
                  Servings:{" "}
                  <span className="text-black">
                    {recipeDetails.mealkitData.max_servings}
                  </span>
                </span>

                <span className="font-semibold text-gray-600">
                  Available From:{" "}
                  <span className="text-black">
                    {available_from} - {available_until}
                  </span>
                </span>

                <span className="font-semibold text-gray-600">
                  Prep Time:{" "}
                  <span className="text-black">{recipeDetails.prep_time}</span>{" "}
                  minutes
                </span>

                <span className="font-semibold text-gray-600">
                  Cooking Time:{" "}
                  <span className="text-black">
                    {recipeDetails.cooking_time}
                  </span>{" "}
                  minutes
                </span>

                <div className="flex flex-row font-semibold gap-4">
                  <Label htmlFor="qty" className="text-md text-gray-600">
                    Quantity:{" "}
                  </Label>
                  <Input
                    id="qty"
                    onClick={() => {
                      setIsError(false);
                      setErrMsg({ qty: "" });
                    }}
                    min={1}
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className={`w-16 ${
                      isError
                        ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  ></Input>
                  {isError && <p className="text-red-600">{errMsg.qty}</p>}
                </div>

                <hr />

                <div className="  ">
                  <h2 className="font-bold text-2xl">Description:</h2>
                  <p className="text-md mt-4">{recipeDetails.description}</p>
                </div>

                <hr />

                <Button
                  className="bg-green-600 hover:bg-green-800 h-10 w-1/4"
                  onClick={() => {
                    handleAdd(qty);
                  }}
                >
                  Add To Cart
                </Button>
              </div>

              <div className="fixed bottom-4 right-8 z-50">
                <CartSheet />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="px-10 mt-10">
              <h2 className="font-bold text-2xl mb-6">Cooking Steps</h2>

              <div className="space-y-6">
                {recipeDetails.recipesteps.map((step) => (
                  <div key={step.id} className="flex gap-4 border-b pb-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white font-bold">
                      {step.step_number}
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className=" w-[420px] shrink-0 mt-5 ml-20">
          <h2 className="mb-6 text-2xl font-bold">Ingredients</h2>

          <ScrollArea className="max-h-112.5">
            <div className="flex flex-col gap-4">
              {recipeDetails.recipeingredients.map((ing) => (
                <div
                  key={ing.ingredient_id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <Image
                    src={ing.avatar_url}
                    width={64}
                    height={64}
                    alt={ing.name}
                    className="rounded-md"
                  />

                  <div className="flex-1">
                    <div className="flex flex-row gap-4">
                      <h3 className="font-semibold">{ing.name}</h3>

                      <div className="flex gap-2 text-xs sm:text-sm">
                        {ing.is_vegetarian && (
                          <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            Vegetarian
                          </span>
                        )}
                        {ing.is_vegan && (
                          <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                            Vegan
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">{ing.category}</p>

                    <p className="font-medium">
                      {ing.qty} {ing.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
