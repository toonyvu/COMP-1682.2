"use client";

import { Button } from "../../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../../ui/label";

import { useState } from "react";

import { useRecipeStore } from "@/stores/recipeStore";

type Props = {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

const defaultStepsForm = {
  step_number: 0,
  instruction: "",
};

export default function RecipeStep3({ setFormStep }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState(defaultStepsForm);

  const steps = useRecipeStore((state) => state.steps);
  const addStep = useRecipeStore((state) => state.addStep);
  const updateStep = useRecipeStore((state) => state.updateStep);
  const removeStep = useRecipeStore((state) => state.removeStep);

  return (
    <div className="w-full bg-white rounded-2xl p-8">
      <div className="mb-8 flex flex-row justify-between">
        <header>
          <h1 className="text-3xl font-bold">Enter Steps Details</h1>

          <p className="text-gray-500 mt-2">Step 3 of 3 — Steps Details</p>
        </header>

        <div className="flex flex-row gap-4">
          <Button
            className="px-6 bg-blue-600 h-10 hover:bg-blue-800 w-24"
            onClick={() => {
              setFormStep(2);
            }}
          >
            Previous
          </Button>
          <Button
            className="px-6 bg-green-600 h-10 hover:bg-green-800 w-24"
            onClick={() => {
              setFormStep(4);
            }}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-4">
        <section className="w-1/2 bg-white shadow-md outline-1 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Add Step</h2>
            <p className="mt-2 text-gray-500 text-sm">
              Enter step information here:
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="step-content">Enter step content</Label>
              <Input
                id="step-content"
                type="text"
                placeholder="Enter step information..."
                value={formData.instruction}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    instruction: e.target.value,
                  })
                }
              ></Input>
            </div>

            <footer className="flex gap-4 justify-end pt-4">
              {editingIndex === null ? (
                <>
                  <Button
                    className="bg-blue-600 w-20 hover:bg-blue-800"
                    onClick={() => {
                      setFormData(defaultStepsForm);
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    className="w-20 bg-green-600 hover:bg-green-800"
                    onClick={() => {
                      const newStep = {
                        ...formData,
                        step_number: steps.length + 1,
                      };

                      addStep(newStep);
                      setFormData(defaultStepsForm);
                    }}
                  >
                    Add
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="bg-blue-600 hover:bg-blue-800 w-20"
                    onClick={() => {
                      setFormData(defaultStepsForm);
                      setEditingIndex(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-20 bg-green-600 hover:bg-green-800"
                    onClick={() => {
                      const newStep = {
                        ...formData,
                        step_number: editingIndex + 1,
                      };

                      updateStep(editingIndex, newStep);

                      setEditingIndex(null);
                      setFormData(defaultStepsForm);
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}
            </footer>
          </div>
        </section>

        <section className="w-1/2 bg-white shadow-md outline-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Steps List</h2>

              <p className="text-sm text-gray-500 mt-1">
                {steps.length} step
                {steps.length !== 1 && "s"} added
              </p>
            </div>
          </div>

          {/* Empty State */}
          {steps.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl">
              <h2 className="text-lg font-semibold text-gray-600">
                No steps added
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Add cooking steps to see them here.
              </p>
            </div>
          )}

          {/* Steps */}
          <div className="flex flex-col gap-4 max-h-150 overflow-y-auto pr-2">
            {steps.map((item, index) => (
              <div
                key={`${item.instruction}-${item.step_number}`}
                className="border p-5 shadow-md"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between gap-4">
                  {/* Left Side */}
                  <div className="flex gap-4">
                    {/* Step Number */}
                    <div className="min-w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                      {item.step_number}
                    </div>

                    {/* Instruction */}
                    <div>
                      <h3 className="font-semibold text-lg">
                        Step {item.step_number}
                      </h3>

                      <p className="text-gray-600 mt-1 leading-relaxed">
                        {item.instruction}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex">
                    {editingIndex === index ? (
                      <span className="text-sm">Editing...</span>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-800"
                          onClick={() => {
                            setEditingIndex(index);
                            setFormData(item);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            removeStep(index);
                          }}
                        >
                          Remove
                        </Button>
                      </>
                    )}
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
