"use client";
import Image from "next/image";
import iconw from "@/public/iconw.png";
import recipe_icon from "@/public/icons/recipe_icon.png";

import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronRight } from "lucide-react";
import { useAdminTabStore } from "@/stores/adminTabStore";

import Link from "next/link";

export default function AdminSidebar() {
  const [open, setOpen] = useState({
    recipes: false,
    mealkits: false,
    orders: false,
  });

  const setTab = useAdminTabStore((state) => state.setTab);

  return (
    <div className="bg-linear-to-b from-green-700 to-green-800 h-screen">
      <div className="flex flex-row items-center">
        <Image
          src={iconw}
          width={75}
          height={75}
          alt={"Company Logo"}
          className="hidden sm:block"
        ></Image>
        <h1 className="text-sm sm:text-xl font-bold text-white">GoodRecipes</h1>
      </div>
      <hr className="w-4/5 place-self-center border-gray-100" />

      <div className="flex flex-col gap-8 w-full px-8 mt-8">
        <Collapsible
          open={open.recipes}
          onOpenChange={(value) => {
            setOpen((prev) => ({
              ...prev,
              recipes: value,
            }));
          }}
        >
          <div className="content-center">
            <CollapsibleTrigger className="flex items-center gap-2 w-full">
              <Image
                src={recipe_icon}
                height={25}
                width={25}
                alt={"Recipe Icon"}
              ></Image>
              <h1 className="text-white text-xl font-medium">Recipes</h1>
              <ChevronRight
                className={`content-center text-white transition-transform duration-200 ${open.recipes ? "rotate-90" : ""}`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="flex flex-col gap-4 mt-4">
                <Link
                  href="/admin/dashboard/recipes/create"
                  className="text-white hover:bg-green-900 h-8 content-center px-2"
                  onClick={() => {
                    setTab("createRecipe");
                  }}
                >
                  Create Recipes
                </Link>
                <h1 className="text-white hover:bg-green-900 h-8 content-center px-2">
                  Edit Recipes
                </h1>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        <Collapsible
          open={open.mealkits}
          onOpenChange={(value) => {
            setOpen((prev) => ({
              ...prev,
              mealkits: value,
            }));
          }}
        >
          <div className="content-center">
            <CollapsibleTrigger className="flex items-center gap-2 w-full">
              <Image
                src={recipe_icon}
                height={25}
                width={25}
                alt={"Recipe Icon"}
              ></Image>
              <h1 className="text-white text-xl font-medium">Mealkits</h1>
              <ChevronRight
                className={`content-center text-white transition-transform duration-200 ${open.mealkits ? "rotate-90" : ""}`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="flex flex-col gap-4 mt-4">
                <Link
                  href="/admin/dashboard/mealkits/create"
                  className="text-white hover:bg-green-900 h-8 content-center px-2"
                  onClick={() => {
                    setTab("createMealkit");
                  }}
                >
                  Create Mealkits
                </Link>
                <h1 className="text-white hover:bg-green-900 h-8 content-center px-2">
                  Edit Mealkits
                </h1>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        <Collapsible
          open={open.orders}
          onOpenChange={(value) => {
            setOpen((prev) => ({
              ...prev,
              orders: value,
            }));
          }}
        >
          <div className="content-center">
            <CollapsibleTrigger className="flex items-center gap-2 w-full">
              <Image
                src={recipe_icon}
                height={25}
                width={25}
                alt={"Recipe Icon"}
              ></Image>
              <h1 className="text-white text-xl font-medium">Orders</h1>
              <ChevronRight
                className={`content-center text-white transition-transform duration-200 ${open.orders ? "rotate-90" : ""}`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="flex flex-col gap-4 mt-4">
                <Link
                  href="/admin/dashboard/orders"
                  className="text-white hover:bg-green-900 h-8 content-center px-2"
                  onClick={() => {
                    setTab("ordersTab");
                  }}
                >
                  View Orders
                </Link>
                <h1 className="text-white hover:bg-green-900 h-8 content-center px-2">
                  Edit Mealkits
                </h1>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  );
}
