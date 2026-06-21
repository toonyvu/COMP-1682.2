"use client";

import { difficultyColor } from "@/constants/constants";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
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
    };

    addItem(addedRecipe, qty);
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

  console.log(recipeDetails?.recipeingredients);

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
    <div className="place-self-center">
      <div className="flex flex-row w-full px-40 mt-10 gap-10">
        <Image
          className="p-5"
          height={750}
          width={750}
          alt={recipeDetails.name}
          src={recipeDetails.avatar_url}
        ></Image>

        <div className="flex flex-col gap-4 pt-4">
          <h1 className="font-bold text-3xl">{recipeDetails.name}</h1>
          <span
            className={`h-6 sm:h-8 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-center content-center ${
              difficultyColor[recipeDetails.difficulty]
            }`}
          >
            {recipeDetails.difficulty}
          </span>

          <span className="font-semibold text-4xl text-blue-700">
            ${recipeDetails.mealkitData.price}
          </span>

          <span className="font-semibold text-gray-600">
            Week:{" "}
            <span className="text-black">
              {recipeDetails.mealkitData.week_number}
            </span>
          </span>

          <span className="font-semibold text-gray-600">
            Year:{" "}
            <span className="text-black">{recipeDetails.mealkitData.year}</span>
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
            <span className="text-black">{recipeDetails.cooking_time}</span>{" "}
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
            className="bg-green-600 hover:bg-green-800 h-10"
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

      <div className="flex flex-col gap-8">
        <div className="px-40 mt-10">
          <h2 className="font-bold text-2xl mb-6">Ingredients</h2>

          <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="px-40 mt-10">
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

      {/* <div className="relative w-full h-[40vh] sm:h-[60vh]">
        <Image
          src={recipeDetails.avatar_url}
          alt={recipeDetails.name}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 F-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full flex flex-col gap-4 md:flex-row md:justify-between md:items-end p-4 sm:p-6 md:p-10 text-white">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
                {recipeDetails.name}
              </h1>

              <p className="mt-2 max-w-xl text-xs sm:text-sm md:text-base text-white/90">
                {recipeDetails.description}
              </p>
            </div>

            <div className="text-right flex flex-row gap-3 sm:gap-8">
              <span
                className={`inline-block h-6 sm:h-8 place-self-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-center content-center ${
                  difficultyColor[recipeDetails.difficulty]
                }`}
              >
                {recipeDetails.difficulty}
              </span>

              <p className="text-xs md:text-sm text-center content-center">
                ⏱ Prep: {recipeDetails.prep_time} min
              </p>

              <p className="text-xs md:text-sm text-center content-center ">
                🍳 Cook: {recipeDetails.cooking_time} min
              </p>

              <p className="text-xs md:text-sm text-center content-center">
                Servings: {recipeDetails.servings}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <div className="max-w-4xl flex items-center gap-2 sm:gap-6 p-4 place-self-end">
          <input
            type="hidden"
            name="recipeId"
            value={recipeDetails.recipe_id}
          />
          <Button
            onClick={toggleFavorite}
            className={`text-sm sm:text-md md:text-xl h-10 md:h-12 rounded-3xl ${favorited ? "bg-gray-400 hover:bg-gray-700" : "bg-green-600 hover:bg-green-900 transition duration-100 hover:scale-105"}`}
          >
            {favorited ? "Saved!" : "Save this recipe"}
          </Button>
        </div>
      </div>

      <div className="place-self-center mt-8 w-full max-w-4xl">
        <h2 className="text-xl sm:text-3xl ml-3 font-bold underline decoration-gray-700 mb-6">
          Ingredients
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-15">
          {recipeDetails.recipeingredients.map((item) => {
            return (
              <div
                key={item.ingredient_id}
                className="rounded-xl border p-4 shadow-sm bg-white mx-2"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg sm:text-xl md:text-2xl">
                    {item.name}
                  </h3>

                  <div className="flex gap-2 text-xs sm:text-sm">
                    {item.is_vegetarian && (
                      <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-green-100 text-green-700 rounded-full">
                        Vegetarian
                      </span>
                    )}
                    {item.is_vegan && (
                      <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-emerald-100 text-emerald-700 rounded-full">
                        Vegan
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 text-md text-gray-600 gap-y-1 text-xs sm:text-[14px] md:text-lg">
                  <span>Category</span>
                  <span className="text-right font-medium">
                    {item.category}
                  </span>

                  <span>Unit</span>
                  <span className="text-right font-medium">
                    {item.unit_type}
                  </span>

                  <span>Calories (per 100g)</span>
                  <span className="text-right font-medium">
                    {item.calories_per_100g} kcal
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="text-xl mt-5 sm:text-3xl ml-3 font-bold underline decoration-gray-700 mb-5">
          Steps
        </h2>
        <ol className="space-y-6 mt-6 mx-2">
          {recipeDetails.recipesteps.map((item, index) => (
            <li key={item.id}>
              <Card className="rounded-2xl shadow-sm border bg-white">
                <CardContent className="flex gap-4 p-2 sm:p-6 items-center">
                  <div className="flex h-7 w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white font-bold text-sm sm:text-lg">
                    {index + 1}
                  </div>

                  <p className="text-md sm:text-lg leading-relaxed text-gray-700 text-center ">
                    {item.instruction}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div> */}
    </div>
  );
}
