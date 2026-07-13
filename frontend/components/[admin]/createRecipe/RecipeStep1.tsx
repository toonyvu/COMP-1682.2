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
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { useRecipeStore } from "@/stores/recipeStore";
import { useState, useEffect } from "react";

import { uploadRecipeImg } from "@/utils/imgUpload";
import Image from "next/image";

import type { Difficulty } from "@/types/types";
import type { TagFilters } from "@/types/types";

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
  tags: string[];
};

const defaultFormData: RecipeFormData = {
  name: "",
  description: "",
  servings: 1,
  difficulty: "Easy",
  prep_time: 0,
  cooking_time: 0,
  avatar_url: "",
  tags: [],
};

export default function RecipeStep1({ setFormStep }: Props) {
  const recipeDetails = useRecipeStore((state) => state.recipe);
  const [formData, setFormData] = useState(defaultFormData);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [filters, setFilters] = useState<TagFilters>({
    cookingTimes: [] as string[],
    recipeTypes: [] as string[],
    cuisines: [] as string[],
    flavors: [] as string[],
  });

  const [errors, setErrors] = useState({
    recipeName: "",
    description: "",
    tags: "",
    prepAndCookTime: "",
    avatarUrl: "",
  });

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
    const tags = [
      ...filters.cookingTimes,
      ...filters.cuisines,
      ...filters.flavors,
      ...filters.recipeTypes,
    ];

    const newErrors = {
      recipeName: "",
      description: "",
      tags: "",
      prepAndCookTime: "",
      avatarUrl: "",
    };

    let valid = true;

    if (!formData.name || formData.name.length < 4) {
      newErrors.recipeName = "Recipe name must contain at least 4 characters.";
      valid = false;
    }

    if (!formData.avatar_url) {
      newErrors.avatarUrl = "Recipe include a recipe picture.";
      valid = false;
    }

    if (tags.length == 0) {
      newErrors.tags = "Recipe must contain at least one tag.";
      valid = false;
    }

    if (!formData.description) {
      newErrors.description = "Recipe must contain a description.";
      valid = false;
    }

    if (formData.cooking_time == 0 && formData.prep_time == 0) {
      newErrors.prepAndCookTime =
        "Only either prep time or cooking time can be 0.";
      valid = false;
    }

    if (valid) {
      setRecipeDetails({
        ...formData,
        tags,
      });
      setFormStep(2);
    } else {
      setErrors(newErrors);
      return;
    }
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
            className={`${errors.recipeName ? "border-red-500" : ""}`}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          {errors.recipeName && (
            <p className="text-red-600">{errors.recipeName}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>

          <Textarea
            id="description"
            rows={5}
            placeholder="Describe your recipe..."
            className={`${errors.description ? "border-red-500" : ""}`}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />

          {errors.description && (
            <p className="text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Servings + Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Servings */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="servings">Servings</Label>

            <Input
              id="servings"
              type="number"
              min={1}
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

        <div className="w-full place-self-center mt-4">
          <Card className={`${errors.tags ? "outline-red-600" : ""}`}>
            <CardContent>
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="text-md flex flex-row w-full justify-between">
                    <h3 className="">Tag Filters</h3>
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

          {errors.tags && <p className="text-red-600">{errors.tags}</p>}
        </div>

        {/* Prep Time + Cooking Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prep Time */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="prep-time">Prep Time (minutes)</Label>

            <Input
              id="prep-time"
              type="number"
              min={1}
              placeholder="15"
              className={`${errors.prepAndCookTime ? "border-red-500" : ""}`}
              value={formData.prep_time}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prep_time: Number(e.target.value),
                })
              }
            />

            {errors.prepAndCookTime && (
              <p className="text-red-600">{errors.prepAndCookTime}</p>
            )}
          </div>

          {/* Cooking Time */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="cook-time">Cooking Time (minutes)</Label>

            <Input
              id="cook-time"
              type="number"
              min={1}
              placeholder="30"
              value={formData.cooking_time}
              className={`${errors.prepAndCookTime ? "border-red-500" : ""}`}
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
            className={`${errors.avatarUrl ? "border-red-500" : ""}`}
            onChange={handleImageUpload}
          />

          {errors.avatarUrl && (
            <p className="text-red-600">{errors.avatarUrl}</p>
          )}

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
      </div>
    </div>
  );
}
