"use client";

import { difficultyColor } from "@/constants/constants";
import { useRef, useState } from "react";
import star_icon from "@/public/star_icon.svg";
import Image from "next/image";
import type { RecipeWithDetails } from "@/types/types";
import { Button } from "./ui/button";

type Props = {
  recipe: RecipeWithDetails;
};

export default function RecipeDetails({ recipe }: Props) {
  const favoriteButtonState = useRef(false);
  const [btnState, setBtnState] = useState("");

  const handleClick = () => {
    if (favoriteButtonState.current) {
      setBtnState("fill-black");
      favoriteButtonState.current = !favoriteButtonState.current;
    } else {
      setBtnState("fill-yellow-300");
      favoriteButtonState.current = !favoriteButtonState.current;
    }

    console.log(btnState);
  };
  return (
    <>
      <div className="relative w-full h-[60vh]">
        <Image
          src={recipe.avatar_url}
          alt={recipe.name}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full flex justify-between items-end p-6 md:p-10 text-white">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                {recipe.name}
              </h1>

              <p className="mt-2 max-w-xl text-sm md:text-base text-white/90">
                {recipe.description}
              </p>
            </div>

            <div className="text-right space-y-2 flex flex-row gap-8">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  difficultyColor[recipe.difficulty]
                }`}
              >
                {recipe.difficulty}
              </span>

              <p className="text-sm md:text-base">
                ⏱ Prep: {recipe.prep_time} min
              </p>

              <p className="text-sm md:text-base">
                🍳 Cook: {recipe.cooking_time} min
              </p>

              <p className="text-sm md:text-base">
                Servings: {recipe.servings}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="place-self-end flex flex-row items-center gap-6 mt-5 mr-10">
        <Image
          src={star_icon}
          alt={"bruh"}
          width={35}
          height={35}
          className={`inline hover:scale-125 ${btnState}`}
          onClick={handleClick}
        />

        <Button className="bg-green-600 h-10 transition duration-100 hover:bg-green-900">
          Save this recipe!
        </Button>
      </div>
      <div className="place-self-center mt-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold underline decoration-gray-700 mb-6">
          Ingredients
        </h2>

        <div className="grid sm:grid-cols-2 gap-10">
          {recipe.recipeingredients.map((item) => {
            const ing = item.ingredients;

            return (
              <div
                key={item.ingredient_id}
                className="rounded-xl border p-4 shadow-sm bg-white space-y-2"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{ing.name}</h3>

                  <div className="flex gap-2 text-xs">
                    {ing.is_vegetarian && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        Vegetarian
                      </span>
                    )}
                    {ing.is_vegan && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                        Vegan
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 text-sm text-gray-600 gap-y-1">
                  <span>Category</span>
                  <span className="text-right font-medium">{ing.category}</span>

                  <span>Unit</span>
                  <span className="text-right font-medium">
                    {ing.unit_type}
                  </span>

                  <span>Calories (per 100g)</span>
                  <span className="text-right font-medium">
                    {ing.calories_per_100g} kcal
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="text-2xl font-bold underline decoration-gray-700 mb-6 mt-6">
          Steps
        </h2>
      </div>
    </>
  );
}
