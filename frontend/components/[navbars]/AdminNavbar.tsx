"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { useUserStore } from "@/stores/userStore";

import Link from "next/link";
import Image from "next/image";

export default function AdminNavbar() {
  const user = useUserStore((state) => state.user);
  if (!user) return;
  return (
    <div className="w-full h-12 sm:h-16 bg-white flex items-center px-2 lg:px-6 sticky top-0 z-100 shadow-lg">
      <div className="ml-auto">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row gap-2 md:gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className=" hover:bg-black hover:text-white"
              >
                <Link href="/signup" className="text-sm sm:text-xl">
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
