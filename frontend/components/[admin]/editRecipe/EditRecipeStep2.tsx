"use client";

import { limit } from "@/constants/constants";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../../ui/label";
import { uploadIngredientAvatar } from "@/utils/imgUpload";
import type { Ingredient } from "@/types/types";
import { getIngredients } from "@/lib/api/ingredients";
import Image from "next/image";

import { Checkbox } from "../../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuery } from "@tanstack/react-query";

import { Button } from "../../ui/button";
import { useRecipeStore } from "@/stores/recipeStore";
import PaginationComponent from "@/components/PaginationComponent";

export const defaultIngredientForm = {
  name: "",
  category: "",
  unit_type: "",
  calories_per_100g: 0,
  is_vegetarian: false,
  is_vegan: false,
  qty: 0,
  avatar_url: "",
};

type Props = {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function EditRecipeStep2({ setFormStep }: Props) {
  const recipe = useRecipeStore((state) => state.recipe);
  const [page, setPage] = useState(1);
  const [ingredientForm, setIngredientForm] = useState(defaultIngredientForm);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    data: availableIngredients,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ingredientsQuery", page],

    queryFn: async () => {
      const result = await getIngredients(page, limit);
      return result;
    },
  });

  useEffect(() => {
    if (!recipe) return;

    setIngredientForm({
      name: "",
      category: "",
      unit_type: "",
      calories_per_100g: 0,
      is_vegetarian: false,
      is_vegan: false,
      qty: 0,
      avatar_url: "",
    });
  }, [recipe]);

  const total = availableIngredients?.total ?? 0;
  const totalPages =
    Math.floor(total / limit) === 0 ? 1 : Math.ceil(total / limit);
  console.log(availableIngredients);

  const ingredients = useRecipeStore((state) => state.ingredients);
  const addIngredient = useRecipeStore((state) => state.addIngredient);
  const editIngredient = useRecipeStore((state) => state.updateIngredient);
  const removeIngredient = useRecipeStore((state) => state.removeIngredient);

  const handleReset = () => {
    setIngredientForm(defaultIngredientForm);
  };

  const handleAdd = () => {
    try {
      addIngredient(ingredientForm);
      setIngredientForm(defaultIngredientForm);
    } catch (err) {
      console.error(err);
    }
  };

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("png")) {
      alert("Only PNG files are allowed");
      return;
    }

    try {
      setUploading(true);

      const imgUrl = await uploadIngredientAvatar(file);

      setIngredientForm((prev) => ({
        ...prev,
        avatar_url: imgUrl,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className=" w-full bg-white rounded-2xl p-8">
      <div className="mb-8">
        <div className="flex flex-row justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Enter Ingredient Details</h1>

            <p className="text-gray-500 mt-2">
              Step 2 of 3 — Ingredient Details
            </p>
          </div>

          <div className="flex flex-row gap-4">
            <Button
              className="px-6 bg-blue-600 h-10 hover:bg-blue-800 w-24"
              onClick={() => {
                setFormStep(1);
              }}
            >
              Previous
            </Button>
            <Button
              className="px-6 bg-green-600 h-10 hover:bg-green-800 w-24"
              onClick={() => {
                setFormStep(3);
              }}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-4">
          <section className="w-full max-w-2xl bg-white shadow-md outline-1 p-8">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Add Ingredient</h2>

              <p className="text-gray-500 mt-2 text-sm">
                Enter ingredient details for this recipe.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Ingredient Name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="ingredient-name">Ingredient Name</Label>

                <Input
                  id="ingredient-name"
                  type="text"
                  placeholder="Enter ingredient..."
                  value={ingredientForm.name}
                  onChange={(e) => {
                    setIngredientForm({
                      ...ingredientForm,
                      name: e.target.value,
                    });
                  }}
                />
              </div>

              {/* Category + Unit Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="flex flex-col gap-2">
                  <Label>Ingredient Category</Label>

                  <Select
                    value={ingredientForm.category}
                    onValueChange={(value) =>
                      setIngredientForm({
                        ...ingredientForm,
                        category: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose category..." />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Vegetable">Vegetable</SelectItem>

                        <SelectItem value="Grain">Grain</SelectItem>

                        <SelectItem value="Dairy">Dairy</SelectItem>

                        <SelectItem value="Protein">Protein</SelectItem>

                        <SelectItem value="Produce">Produce</SelectItem>

                        <SelectItem value="Herb">Herb</SelectItem>

                        <SelectItem value="Condiment">Condiment</SelectItem>

                        <SelectItem value="Nut">Nut</SelectItem>

                        <SelectItem value="Cooking Liquid">
                          Cooking Liquid
                        </SelectItem>

                        <SelectItem value="Fruit">Fruit</SelectItem>

                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Unit Type */}
                <div className="flex flex-col gap-2">
                  <Label>Unit Type</Label>

                  <Select
                    value={ingredientForm.unit_type}
                    onValueChange={(value) =>
                      setIngredientForm({
                        ...ingredientForm,
                        unit_type: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose unit..." />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="g">g</SelectItem>

                        <SelectItem value="kg">kg</SelectItem>

                        <SelectItem value="mg">mg</SelectItem>

                        <SelectItem value="ml">ml</SelectItem>

                        <SelectItem value="l">l</SelectItem>

                        <SelectItem value="unit">unit</SelectItem>

                        <SelectItem value="tbsp">tbsp</SelectItem>

                        <SelectItem value="tsp">tsp</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Calories + Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calories */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="calories-per-100g">Calories per 100g</Label>

                  <Input
                    id="calories-per-100g"
                    type="number"
                    placeholder="100"
                    value={ingredientForm.calories_per_100g}
                    onChange={(e) => {
                      setIngredientForm({
                        ...ingredientForm,
                        calories_per_100g: Number(e.target.value),
                      });
                    }}
                  />
                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="qty">Quantity</Label>

                  <Input
                    id="qty"
                    type="number"
                    placeholder="2"
                    value={ingredientForm.qty}
                    onChange={(e) => {
                      setIngredientForm({
                        ...ingredientForm,
                        qty: Number(e.target.value),
                      });
                    }}
                  />
                </div>
              </div>

              {/* Dietary Info */}
              <div className="flex flex-col gap-4">
                <Label>Dietary Information</Label>

                <div className="flex flex-row gap-8">
                  {/* Vegetarian */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="is-vegetarian-checkbox"
                      checked={ingredientForm.is_vegetarian}
                      onCheckedChange={(checked) => {
                        setIngredientForm({
                          ...ingredientForm,
                          is_vegetarian: !!checked,
                        });
                      }}
                    />

                    <Label htmlFor="is-vegetarian-checkbox">Vegetarian</Label>
                  </div>

                  {/* Vegan */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="is-vegan-checkbox"
                      checked={ingredientForm.is_vegan}
                      onCheckedChange={(checked) => {
                        setIngredientForm({
                          ...ingredientForm,
                          is_vegan: !!checked,
                        });
                      }}
                    />

                    <Label htmlFor="is-vegan-checkbox">Vegan</Label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Label htmlFor="img">Ingredient Image (.png)</Label>
                <Input
                  id="img"
                  type="file"
                  placeholder="2"
                  accept="image/png"
                  onChange={(e) => {
                    handleImageUpload(e);
                  }}
                />

                <h1>Current Image:</h1>
                {ingredientForm?.avatar_url && (
                  <Image
                    alt={"Recipe_Image"}
                    height={100}
                    width={100}
                    src={ingredientForm?.avatar_url}
                    className="rounded-md object-cover"
                  ></Image>
                )}
              </div>

              {/* Footer */}
              <footer className="flex gap-4 justify-end pt-4">
                {editingIndex === null ? (
                  <>
                    <Button
                      className="bg-blue-600 w-20 hover:bg-blue-800"
                      onClick={() => {
                        handleReset();
                        setIngredientForm(defaultIngredientForm);
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      className="w-20 bg-green-600 hover:bg-green-800"
                      onClick={handleAdd}
                    >
                      Add
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="bg-blue-600 hover:bg-blue-800 w-20"
                      onClick={() => {
                        setIngredientForm(defaultIngredientForm);
                        setEditingIndex(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-20 bg-green-600 hover:bg-green-800"
                      onClick={() => {
                        editIngredient(editingIndex, ingredientForm);
                        setIngredientForm(defaultIngredientForm);
                        setEditingIndex(null);
                      }}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </footer>
            </div>
          </section>
          <section className="w-full outline-1 bg-white shadow-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Ingredients List</h2>

                <p className="text-sm text-gray-500 mt-1">
                  {ingredients.length} ingredient
                  {ingredients.length !== 1 && "s"} added
                </p>
              </div>
            </div>

            {/* Empty State */}
            {ingredients.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl">
                <h2 className="text-lg font-semibold text-gray-600">
                  No ingredients added
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                  Add ingredients to see them here.
                </p>
              </div>
            )}

            {/* Ingredients */}
            <div className="flex flex-col gap-4">
              {ingredients.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="border rounded-xl p-4 shadow-md"
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-4">
                    {/* LEFT: image + text */}
                    <div className="flex items-start gap-3">
                      {item.avatar_url && (
                        <Image
                          src={item.avatar_url}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                      )}

                      <div>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-sm text-gray-500 capitalize">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT: quantity */}
                    <div className="text-right">
                      <p className="font-medium">
                        {item.qty} {item.unit_type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.calories_per_100g} kcal
                      </p>
                    </div>
                  </div>

                  {/* Dietary Tags */}
                  <div className="flex gap-2 mt-4">
                    {item.is_vegetarian && (
                      <div className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                        Vegetarian
                      </div>
                    )}

                    {item.is_vegan && (
                      <div className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                        Vegan
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end mt-4">
                    {editingIndex !== index ? (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => {
                            setEditingIndex(index);
                            setIngredientForm(item);
                          }}
                          className="bg-green-600 hover:bg-green-800"
                        >
                          Edit
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeIngredient(index)}
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs">Editing...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <h1 className="text-3xl font-bold">Ingredients List</h1>

      <PaginationComponent
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      ></PaginationComponent>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {availableIngredients?.ingredients.map((ingredient: Ingredient) => (
          <div
            key={ingredient.id}
            className="flex gap-4 p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <Image
              src={ingredient.avatar_url}
              alt={ingredient.name}
              width={80}
              height={80}
              className="rounded-lg object-contain"
            />

            {/* Details */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{ingredient.name}</h2>

              <p className="text-sm text-gray-500">
                Category: {ingredient.category}
              </p>

              <p className="text-sm text-gray-500">
                Unit: {ingredient.unit_type}
              </p>

              <p className="text-sm text-gray-500">
                Calories: {ingredient.calories_per_100g} kcal / 100g
              </p>

              <div className="flex gap-2 mt-3">
                {ingredient.is_vegetarian && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Vegetarian
                  </span>
                )}

                {ingredient.is_vegan && (
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                    Vegan
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end">
              <Button
                className="w-16 bg-green-600 hover:bg-green-800"
                onClick={() =>
                  setIngredientForm({
                    ...ingredient,
                    unit_type: ingredient.unit_type,
                    qty: 0,
                  })
                }
              >
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
