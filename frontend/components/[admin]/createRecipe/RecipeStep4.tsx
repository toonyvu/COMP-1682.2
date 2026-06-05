"use client";

import Image from "next/image";
import { Button } from "../../ui/button";
import { useRecipeStore } from "@/stores/recipeStore";
import { difficultyColor } from "@/constants/constants";
import { createRecipe } from "@/lib/api/recipes";

type Props = {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function RecipeStep4({ setFormStep }: Props) {
  const recipe = useRecipeStore((state) => state.recipe);
  const setFullRecipe = useRecipeStore((state) => state.setFullRecipe);
  const ingredients = useRecipeStore((state) => state.ingredients);
  const steps = useRecipeStore((state) => state.steps);

  const addRecipe = async () => {
    if (!recipe) return;
    const createdRecipe = await createRecipe({ recipe, ingredients, steps });
    console.log(createdRecipe);
    if (createdRecipe) {
      setFullRecipe(createdRecipe);
      setFormStep(5);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Review Recipe</h1>

          <p className="text-gray-500 mt-2">
            Confirm all recipe information before publishing.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            className="bg-blue-600 hover:bg-blue-800 h-10 w-24"
            onClick={() => setFormStep(3)}
          >
            Previous
          </Button>

          <Button
            className="bg-green-600 hover:bg-green-800 h-10 w-24"
            onClick={() => addRecipe()}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* ========================================= */}
        {/* Recipe Overview */}
        {/* ========================================= */}
        <section className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative min-h-87.5">
              {recipe?.avatar_url && (
                <Image
                  src={recipe.avatar_url}
                  alt="Recipe Image"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">{recipe?.name}</h2>

                  <div
                    className={`px-4 py-2 rounded-full text-green-700 text-sm font-medium capitalize ${difficultyColor[recipe!.difficulty]}`}
                  >
                    {recipe?.difficulty}
                  </div>
                </div>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {recipe?.description}
                </p>
              </div>

              <Button variant="outline" onClick={() => setFormStep(1)}>
                Edit Details
              </Button>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Prep Time</p>

                  <h3 className="text-xl font-bold">{recipe?.prep_time}m</h3>
                </div>

                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Cook Time</p>

                  <h3 className="text-xl font-bold">{recipe?.cooking_time}m</h3>
                </div>

                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Servings</p>

                  <h3 className="text-xl font-bold">{recipe?.servings}</h3>
                </div>

                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Price</p>

                  <h3 className="text-xl font-bold">${recipe?.price}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* Ingredients */}
        {/* ========================================= */}
        <section className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Ingredients</h2>

              <p className="text-sm text-gray-500 mt-1">
                {ingredients.length} ingredient
                {ingredients.length !== 1 && "s"}
              </p>
            </div>

            <Button variant="outline" onClick={() => setFormStep(2)}>
              Edit Ingredients
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ingredients.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="border rounded-xl p-4 bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>

                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {item.qty} {item.unit_type}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.calories_per_100g} kcal
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {item.is_vegetarian && (
                    <div className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                      Vegetarian
                    </div>
                  )}

                  {item.is_vegan && (
                    <div className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      Vegan
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================= */}
        {/* Steps */}
        {/* ========================================= */}
        <section className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Cooking Steps</h2>

              <p className="text-sm text-gray-500 mt-1">
                {steps.length} step
                {steps.length !== 1 && "s"}
              </p>
            </div>

            <Button variant="outline" onClick={() => setFormStep(3)}>
              Edit Steps
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {steps.map((item, index) => (
              <div
                key={`${item.instruction}-${index}`}
                className="border rounded-2xl p-5 bg-gray-50"
              >
                <div className="flex gap-4">
                  {/* Step Number */}
                  <div className="min-w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    {item.step_number}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold text-lg">
                      Step {item.step_number}
                    </h3>

                    <p className="text-gray-600 mt-1 leading-relaxed">
                      {item.instruction}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
