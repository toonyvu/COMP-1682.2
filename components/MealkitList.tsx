import type { Recipe } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { difficultyColor } from "@/constants/constants";

type MealkitListProps = {
  recipes: Recipe[];
};

export default function MealkitList({ recipes }: MealkitListProps) {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto px-6 mt-10">
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-gray-600 transition duration-300">
            <div className="relative w-full h-48">
              <Image
                src={recipe.avatar_url}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between pt-2 mt-2 ml-3">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${difficultyColor[recipe.difficulty]}`}
              >
                {recipe.difficulty}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {recipe.name}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-2">
                {recipe.description}
              </p>

              <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                Servings: {recipe.servings}
              </p>
              <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                {recipe.prep_time} minutes to prepare, {recipe.cooking_time}{" "}
                minutes to cook
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
