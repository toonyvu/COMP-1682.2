"use client";

import Image from "next/image";

import homeImage from "@/public/homeImage.jpg";
import { useUserStore } from "@/stores/userStore";
import { getUser } from "@/lib/api/users";
import { useEffect } from "react";

export default function UserProfile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    async function getUserInfo() {
      const userId = user?.id;

      const result = await getUser(Number(userId));
      setUser(result.user);
    }

    getUserInfo();
  }, [user?.id]);

  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);

  return (
    <div className="relative bg-gray-100">
      <div className="w-full h-48 bg-green-600"></div>

      <Image
        className="absolute rounded-full bg-amber-200 left-1/2 top-40 -translate-x-1/2 -translate-y-1/4"
        src={homeImage}
        width={150}
        height={150}
        alt={"profile picture"}
      ></Image>

      <h1 className="place-self-center font-black text-3xl mt-24">
        {user?.username}
      </h1>

      <div className="flex flex-row mt-2 gap-8 p-8">
        <div className="w-1/4 bg-white h-80 p-8 flex flex-col justify-between">
          <div className="w-full h-12 flex items-center hover:bg-gray-300 p-4">
            <h1>Profile</h1>
          </div>

          <div className="w-full h-12 flex items-center hover:bg-gray-300 p-4">
            <h1>Notifications</h1>
          </div>

          <div className="w-full h-12 flex items-center hover:bg-gray-300 p-4">
            <h1>Order</h1>
          </div>

          <div className="w-full h-12 flex items-center hover:bg-gray-300 p-4">
            <h1>Billing</h1>
          </div>
        </div>
        <div className="w-3/4 bg-white h-screen p-8 shadow-lg">
          <h1 className="font-black text-2xl">User Information</h1>

          <div className="flex mt-8">
            <div className="w-1/2 flex flex-col gap-4">
              <h1 className="text-xl font-bold">First Name</h1>
              <input
                type="text"
                value={user?.first_name || ""}
                readOnly
                className="w-2/3 outline-1 bg-white shadow-md p-2 rounded-md"
              />
            </div>

            <div className="w-1/2 flex flex-col gap-4">
              <h1 className="text-xl font-bold">Last Name</h1>
              <input
                type="text"
                value={user?.last_name || ""}
                readOnly
                className="w-2/3 outline-1 bg-white shadow-md p-2 rounded-md"
              />
            </div>
          </div>

          <div className="flex mt-8">
            <div className="w-1/2 flex flex-col gap-4">
              <h1 className="text-xl font-bold">Email</h1>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                className="w-2/3 outline-1 bg-white shadow-md p-2 rounded-md"
              />
            </div>

            <div className="w-1/2 flex flex-col gap-4">
              <h1 className="text-xl font-bold">Phone Number</h1>
              <input
                type="text"
                className="w-2/3 outline-1 bg-white shadow-md p-2 rounded-md"
              />
            </div>
          </div>

          <div className=" flex flex-col gap-4 mt-8">
            <h1 className="text-xl font-bold">Bio</h1>
            <textarea
              rows={15}
              value={user?.bio || ""}
              readOnly
              className="w-full outline-1 bg-white shadow-md p-2 rounded-md"
            />
          </div>

          <div className=" flex flex-col gap-4 mt-8">
            <h1 className="text-xl font-bold">Address</h1>
            <textarea
              value={user?.address || ""}
              rows={2}
              readOnly
              className="w-full outline-1 bg-white shadow-md p-2 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
