"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRecipeStore } from "@/stores/recipeStore";
import { useState, useEffect } from "react";

import { uploadRecipeImg } from "@/utils/imgUpload";
import Image from "next/image";

import type { Difficulty } from "@/types/types";

type Props = {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

type RecipeFormData = {
  name: string;
  description: string;
  servings: number;
  difficulty: Difficulty;
  prep_time: number;
  cooking_time: number;
  avatar_url: string;
};

const defaultFormData: RecipeFormData = {
  name: "",
  description: "",
  servings: 1,
  difficulty: "Easy",
  prep_time: 0,
  cooking_time: 0,
  avatar_url: "",
};

export default function RecipeStep1({ setFormStep }: Props) {
  const recipeDetails = useRecipeStore((state) => state.recipe);
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (recipeDetails) {
      setFormData(recipeDetails);
    }
  }, [recipeDetails]);

  const [uploading, setUploading] = useState(false);

  const setRecipeDetails = useRecipeStore((state) => state.setRecipeDetails);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const imgUrl = await uploadRecipeImg(file);

      setFormData((prev) => ({
        ...prev,
        avatar_url: imgUrl,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  const handleSubmit = () => {
    setRecipeDetails(formData);
  };
  return (
    <div className=" w-full bg-white rounded-2xl p-8">
      {/* Header */}
      <div className="mb-8 flex flex-row justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enter Recipe Details</h1>

          <p className="text-gray-500 mt-2">Step 1 of 3 — Recipe Details</p>
        </div>

        <div className="flex flex-row gap-4">
          <Button
            className="px-6 bg-blue-600 h-10 hover:bg-blue-800 w-24"
            onClick={() => {
              setFormData(defaultFormData);
            }}
          >
            Reset
          </Button>
          <Button
            className="px-6 bg-green-600 h-10 hover:bg-green-800 w-24"
            onClick={() => {
              setRecipeDetails(formData);
              handleSubmit();
              setFormStep(2);
            }}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-8">
        {/* Recipe Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="recipe-name">Recipe Name</Label>

          <Input
            id="recipe-name"
            placeholder="Enter recipe name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>

          <Textarea
            id="description"
            rows={5}
            placeholder="Describe your recipe..."
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* Servings + Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Servings */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="servings">Servings</Label>

            <Input
              id="servings"
              type="number"
              placeholder="4"
              value={formData.servings}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  servings: Number(e.target.value),
                })
              }
            />
          </div>

          {/* Difficulty */}
          <div className="flex flex-col gap-2">
            <Label>Difficulty</Label>

            <Select
              value={formData.difficulty}
              onValueChange={(value: "Easy" | "Medium" | "Hard") =>
                setFormData({
                  ...formData,
                  difficulty: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose difficulty" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Easy">Easy</SelectItem>

                  <SelectItem value="Medium">Medium</SelectItem>

                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Prep Time + Cooking Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prep Time */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="prep-time">Prep Time (minutes)</Label>

            <Input
              id="prep-time"
              type="number"
              placeholder="15"
              value={formData.prep_time}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prep_time: Number(e.target.value),
                })
              }
            />
          </div>

          {/* Cooking Time */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="cook-time">Cooking Time (minutes)</Label>

            <Input
              id="cook-time"
              type="number"
              placeholder="30"
              value={formData.cooking_time}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cooking_time: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Recipe Image</Label>

          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          <h1>Current Image:</h1>
          {formData?.avatar_url && (
            <Image
              alt={"Recipe_Image"}
              height={100}
              width={100}
              src={formData?.avatar_url}
              className="rounded-md object-cover"
            ></Image>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-4 gap-4"></div>
      </div>
    </div>
  );
}
