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
import { logout } from "@/lib/api/auth";
import { useUserStore } from "@/stores/userStore";
export default function UserNavbar() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  if (!user) return;
  return (
    <div className="w-full h-12 sm:h-16 bg-white flex items-center px-2 lg:px-6 sticky top-0 z-100 shadow-lg">
      <div className="flex flex-row items-center">
        <Image
          src={icon}
          width={75}
          height={75}
          alt={"Company Logo"}
          className="hidden sm:block"
        ></Image>
        <h1 className="text-sm sm:text-xl font-bold text-green-600">
          GoodRecipes
        </h1>
      </div>
      <div className="ml-auto">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row gap-2 md:gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className=" hover:bg-black hover:text-white"
              >
                <Link href="/dashboard" className="text-sm sm:text-xl">
                  Recipes
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className=" hover:bg-black hover:text-white"
              >
                <Link href="/profile" className="text-sm sm:text-xl">
                  Profile
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className=" hover:bg-black hover:text-white"
              >
                <Link
                  href="/login"
                  className="text-sm sm:text-xl"
                  onClick={async () => {
                    clearUser();
                    const result = await logout();
                    console.log(result);
                  }}
                >
                  Logout
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="rounded-full">
                <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden">
                  <Image
                    src={user!.avatar_url}
                    width={50}
                    height={50}
                    alt="Profile image"
                    className="object-cover w-full h-full"
                  />
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
