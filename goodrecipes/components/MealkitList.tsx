"use client";

import type { MealKitList } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { difficultyColor } from "@/constants/constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMealKits } from "@/lib/api/getMealKits";

import loading from "@/public/loading.svg";
import { limit } from "@/constants/constants";
import {
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationItem,
} from "./ui/pagination";

export default function MealkitList() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<MealKitList | null>(null);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const totalPages = recipes ? Math.ceil(total / limit) : 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMealKits(page);
        setRecipes(data.result);
        setTotal(data.result.total);
        console.log(page);
      } catch (err) {
        router.push("/");
      }
    };

    fetchData();
  }, [router, page]);

  if (!recipes) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Image
          src={loading}
          height={80}
          width={80}
          alt={"Loading"}
          className="animate-spin"
        ></Image>

        <h1 className="mt-5">Fetching Recipes...</h1>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 sm:px-6 mt-15">
        {recipes.mealkits.map((recipe) => (
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
      <div className="flex justify-center items-center gap-4 mt-6">
        {/* Disable the button based on the truthiness of the expression page === 1.
        When clicked, reduce the page state by 1.*/}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => p - 1)}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              >
                Prev
              </PaginationPrevious>
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink>
                    <button
                      onClick={() => setPage(pageNum)}
                      className={`px-3 py-1 rounded ${
                        page === pageNum
                          ? "bg-green-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => p + 1)}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
