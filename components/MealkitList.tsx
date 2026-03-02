import type { Recipe } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { difficultyColor } from "@/constants/constants";

type MealkitListProps = {
  recipes: Recipe[];
};

export default function MealkitList({ recipes }: MealkitListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 sm:px-6 mt-10">
      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
          href={`/recipes/${recipe.id}`}
          scroll
          className="block h-full"
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-gray-600 transition duration-300 h-full flex flex-col">
            <div className="relative w-full aspect-4/3">
              <Image
                src={recipe.avatar_url}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full w-fit ${difficultyColor[recipe.difficulty]}`}
              >
                {recipe.difficulty}
              </span>

              <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {recipe.name}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-2">
                {recipe.description}
              </p>

              <div className="text-sm font-semibold text-gray-800 mt-auto">
                <p>Servings: {recipe.servings}</p>
                <p>
                  {recipe.prep_time} min prep • {recipe.cooking_time} min cook
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
