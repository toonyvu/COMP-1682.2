"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getRecipeAdmin } from "@/lib/api/recipes";
import { useRecipeStore } from "@/stores/recipeStore";
import EditRecipeStep1 from "@/components/[admin]/editRecipe/EditRecipeStep1";
import EditRecipeStep2 from "@/components/[admin]/editRecipe/EditRecipeStep2";
import EditRecipeStep3 from "@/components/[admin]/editRecipe/EditRecipeStep3";
import EditRecipeStep4 from "@/components/[admin]/editRecipe/EditRecipeStep4";
import EditRecipeFinish from "@/components/[admin]/editRecipe/EditRecipeFinish";
import type { RecipeAdminEdit } from "@/types/types";
import loading from "@/public/loading.svg";
import Image from "next/image";

type Props = {
  id: string;
};

export default function EditRecipeDetailsPage({ id }: Props) {
  const setFullRecipe = useRecipeStore((state) => state.setFullRecipe);
  const resetRecipeStore = useRecipeStore((state) => state.resetRecipeStore);
  const [step, setStep] = useState(1);

  const { data: recipe, isLoading } = useQuery<RecipeAdminEdit>({
    queryKey: ["recipeQuery"],

    queryFn: async () => {
      const result = await getRecipeAdmin(Number(id));
      return result;
    },
  });

  useEffect(() => {
    if (recipe) {
      setFullRecipe(recipe);
    }

    return () => {
      resetRecipeStore();
    };
  }, [recipe]);

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
        <h1 className="mt-5">Fetching Recipe Data...</h1>
      </div>
    );
  }

  if (!recipe) {
    return <div>No Recipe Found.</div>;
  }

  if (step === 1) return <EditRecipeStep1 setFormStep={setStep} />;
  if (step === 2) return <EditRecipeStep2 setFormStep={setStep} />;
  if (step === 3) return <EditRecipeStep3 setFormStep={setStep} />;
  if (step === 4) return <EditRecipeStep4 setFormStep={setStep} />;
  if (step === 5) return <EditRecipeFinish setFormStep={setStep} />;
}
