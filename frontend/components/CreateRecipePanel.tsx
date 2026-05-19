import RecipeStep1 from "@/components/RecipeStep1";
import RecipeStep2 from "./RecipeStep2";
import { useState } from "react";

export default function CreateRecipePanel() {
  const [formStep, setFormStep] = useState(1);

  return (
    <div className="flex flex-col gap-8 ">
      {formStep === 1 && <RecipeStep1 setFormStep={setFormStep} />}
      {formStep === 2 && <RecipeStep2 setFormStep={setFormStep} />}
    </div>
  );
}
