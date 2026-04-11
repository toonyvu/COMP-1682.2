import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import Image from "next/image";
import icon from "../../public/icon.png";
import profile from "../../public/profile.png";
export default function UserNavbar() {
  return (
    <div className="w-full h-12 sm:h-16 bg-white flex items-center px-2 lg:px-6 sticky top-0 z-100">
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
                <Link href="/signup" className="text-sm sm:text-xl">
                  Profile
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

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
              <NavigationMenuLink asChild>
                <Image
                  src={profile}
                  alt="Profile image"
                  className="w-10 h-10 sm:h-16 sm:w-16"
                ></Image>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
