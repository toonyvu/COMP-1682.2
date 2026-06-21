"use client";

import RecipeStep1 from "@/components/[admin]/createRecipe/RecipeStep1";
import RecipeStep2 from "@/components/[admin]/createRecipe/RecipeStep2";
import RecipeStep3 from "@/components/[admin]/createRecipe/RecipeStep3";
import RecipeStep4 from "@/components/[admin]/createRecipe/RecipeStep4";
import RecipeFinish from "@/components/[admin]/createRecipe/RecipeFinish";

import { useState } from "react";

export default function CreateRecipePage() {
  const [formStep, setFormStep] = useState(1);

  console.log("FORM STEP", formStep);
  return (
    <div className="flex flex-col gap-8 p-4 ">
      {formStep === 1 && <RecipeStep1 setFormStep={setFormStep} />}
      {formStep === 2 && <RecipeStep2 setFormStep={setFormStep} />}
      {formStep === 3 && <RecipeStep3 setFormStep={setFormStep} />}
      {formStep === 4 && <RecipeStep4 setFormStep={setFormStep} />}
      {formStep === 5 && <RecipeFinish setFormStep={setFormStep} />}
    </div>
  );
}
