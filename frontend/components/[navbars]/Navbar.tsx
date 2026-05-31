"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import Image from "next/image";
import icon from "../../public/icon.png";

export default function Navbar() {
  return (
    <div className="w-full h-16 bg-white flex items-center px-6 sticky top-0 z-100">
      <div className="flex flex-row items-center">
        <Image src={icon} width={50} height={50} alt={"Company Logo"}></Image>
        <h1 className="text-xl font-bold text-green-600">GoodRecipes</h1>
      </div>
      <div className="ml-auto">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className=" hover:bg-black hover:text-white"
              >
                <Link href={"/login"} className="text-xl">
                  Login
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className=" hover:bg-black hover:text-white"
              >
                <Link href="/signup" className="text-xl">
                  Signup
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className=" hover:bg-black hover:text-white"
              >
                <Link href="/about" className="text-xl">
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
