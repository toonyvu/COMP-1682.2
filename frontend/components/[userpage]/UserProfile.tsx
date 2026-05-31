"use client";

import Image from "next/image";

import homeImage from "@/public/homeImage.jpg";
import { useUserStore } from "@/stores/userStore";
import { getUser, updateUser } from "@/lib/api/users";
import { useEffect, useState } from "react";
import { showToast } from "nextjs-toast-notify";

import { uploadAvatar } from "@/utils/imgUpload";

export default function UserProfile() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    address: "",
    phone: "",
    id: "",
    role: "",
    avatar_url: "",
    dob: "",
    created_at: "",
    tier: "free",
  });

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async () => {
    await updateUser(formData);

    const userId = user?.id;
    const result = await getUser(Number(userId));
    if (!result) return;
    setUser(result.user);
    showToast.success(`User information updated!`, {
      position: "top-left",
      duration: 3000,
      transition: "slideInUp",
    });
    setEditing(false);
  };

  useEffect(() => {
    async function getUserInfo() {
      const userId = user?.id;

      const result = await getUser(Number(userId));

      if (!result) return;
      setUser(result.user);
      setFormData(result.user);

      if (user) {
        setFormData({
          username: user.username || "",
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          bio: user.bio || "",
          address: user.address || "",
          phone: user.phone || "",
          id: user.id || "",
          role: user.role || "",
          avatar_url: user.avatar_url || "",
          dob: user.dob || "",
          created_at: user.created_at || "",
          tier: user.tier || "free",
        });
      }
    }

    getUserInfo();
  }, [user?.id]);

  return (
    <div className="relative w-full bg-gray-100">
      <div className="w-full h-48 bg-green-600"></div>

      <div className="group relative w-[150px] h-[150px] left-1/2 -translate-x-1/2 -translate-y-10">
        <Image
          className="rounded-full object-cover"
          src={formData.avatar_url || homeImage}
          fill
          alt="profile picture"
        />

        {/* Overlay only when editing */}
        {editing && (
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-semibold">Change Photo</span>
          </div>
        )}

        {/* File input */}
        <input
          type="file"
          accept="image/*"
          disabled={!editing}
          className={`
      absolute inset-0 rounded-full opacity-0
      ${editing ? "cursor-pointer" : "pointer-events-none"}
    `}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const imageUrl = await uploadAvatar(file);

            setFormData({
              ...formData,
              avatar_url: imageUrl,
            });
          }}
        />
      </div>
      <h1 className="flex justify-center -translate-y-5">
        <input
          type="text"
          value={formData.username || ""}
          readOnly={!editing}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className={`w-1/5 text-center font-black text-3xl ${editing && "outline-1 shadow-md"}  p-2 rounded-md`}
        />
      </h1>
      <div className="w-3/4 bg-white h-screen p-8 shadow-lg place-self-center">
        <div className="flex flex-row items-center">
          <h1 className="font-black text-2xl">User Information</h1>
          <div className="flex ml-auto gap-4">
            <button
              className={`w-20 font-black text-lg rounded-xl text-white h-10 ${!editing ? "bg-blue-500  hover:bg-blue-700" : "bg-red-500 hover:bg-red-700"}`}
              onClick={() => {
                setEditing(!editing);
                if (editing) {
                  showToast.info(`User editing cancelled.`, {
                    position: "top-left",
                    duration: 3000,
                    transition: "slideInUp",
                  });
                }
              }}
            >
              {editing ? "Cancel" : "Edit"}
            </button>
            {editing && (
              <button
                className="bg-green-500 w-20 font-black text-lg rounded-xl text-white h-10 hover:bg-green-700"
                onClick={() => handleSubmit()}
              >
                Save
              </button>
            )}
          </div>
        </div>

        <div className="flex mt-8">
          <div className="w-1/2 flex flex-col gap-4">
            <h1 className="text-xl font-bold">First Name</h1>
            <input
              type="text"
              value={formData.first_name || ""}
              readOnly={!editing}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className={`w-2/3 outline-1 shadow-md p-2 rounded-md ${!editing ? "bg-gray-200" : "bg-white"}`}
            />
          </div>

          <div className="w-1/2 flex flex-col gap-4">
            <h1 className="text-xl font-bold">Last Name</h1>
            <input
              type="text"
              value={formData.last_name || ""}
              readOnly={!editing}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className={`w-2/3 outline-1 shadow-md p-2 rounded-md ${!editing ? "bg-gray-200" : "bg-white"}`}
            />
          </div>
        </div>

        <div className="flex mt-8">
          <div className="w-1/2 flex flex-col gap-4">
            <h1 className="text-xl font-bold">Email</h1>
            <input
              type="text"
              value={formData.email || ""}
              readOnly={!editing}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-2/3 outline-1 shadow-md p-2 rounded-md ${!editing ? "bg-gray-200" : "bg-white"}`}
            />
          </div>

          <div className="w-1/2 flex flex-col gap-4">
            <h1 className="text-xl font-bold">Phone Number</h1>
            <input
              type="tel"
              value={formData.phone || ""}
              readOnly={!editing}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`w-2/3 outline-1 shadow-md p-2 rounded-md ${!editing ? "bg-gray-200" : "bg-white"}`}
            />
          </div>
        </div>

        <div className=" flex flex-col gap-4 mt-8">
          <h1 className="text-xl font-bold">Address</h1>
          <textarea
            value={formData.address || ""}
            rows={2}
            readOnly={!editing}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className={`w-full outline-1 shadow-md p-2 rounded-md ${!editing ? "bg-gray-200" : "bg-white"}`}
          />
        </div>

        <div className=" flex flex-col gap-4 mt-8">
          <h1 className="text-xl font-bold">Bio</h1>
          <textarea
            rows={15}
            value={formData.bio || ""}
            readOnly={!editing}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className={`w-full outline-1 shadow-md p-2 rounded-md ${!editing ? "bg-gray-200" : "bg-white"}`}
          />
        </div>
      </div>
    </div>
  );
}
