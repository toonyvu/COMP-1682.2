"use client";

import { difficultyColor } from "@/constants/constants";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecipe } from "@/lib/api/recipes";
import { addFavorite, removeFavorite } from "@/lib/api/favorites";
import loading from "@/public/loading.svg";

import type { RecipeWithDetails } from "@/types/types";

type Props = {
  id: number;
};

export default function RecipeDetails({ id }: Props) {
  console.log(id);
  const router = useRouter();
  const [recipeDetails, setRecipeDetails] = useState<RecipeWithDetails | null>(
    null,
  );
  const [favorited, setFavorited] = useState<boolean | null>(null);

  useEffect(() => {
    async function getRecipeDetails(recipeId: number) {
      try {
        const result = await getRecipe(recipeId);
        setRecipeDetails(result);
        setFavorited(result.isFavorited);
      } catch (err) {
        console.log(err);
        router.push("/");
      }
    }

    getRecipeDetails(id);
  }, [id, router]);

  console.log(recipeDetails);
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
    <>
      <div className="relative w-full h-[40vh] sm:h-[60vh]">
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
          <input type="hidden" name="recipeId" value={recipeDetails.recipe_id} />
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
      </div>
    </>
  );
}
