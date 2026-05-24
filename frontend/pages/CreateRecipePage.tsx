import RecipeStep1 from "@/components/RecipeStep1";
import RecipeStep2 from "@/components/RecipeStep2";
import RecipeStep3 from "@/components/RecipeStep3";
import RecipeStep4 from "@/components/RecipeStep4";

import { useState } from "react";

export default function CreateRecipePage() {
  const [formStep, setFormStep] = useState(1);

  return (
    <div className="flex flex-col gap-8 ">
      {formStep === 1 && <RecipeStep1 setFormStep={setFormStep} />}
      {formStep === 2 && <RecipeStep2 setFormStep={setFormStep} />}
      {formStep === 3 && <RecipeStep3 setFormStep={setFormStep} />}
      {formStep === 4 && <RecipeStep4 setFormStep={setFormStep}></RecipeStep4>}
    </div>
  );
}
