"use client";

import Image from "next/image";

import homeImage from "@/public/homeImage.jpg";
import { useUserStore } from "@/stores/userStore";
import { getUser, updateUser } from "@/lib/api/users";
import { useEffect, useState } from "react";
import { showToast } from "nextjs-toast-notify";

import { uploadAvatar } from "@/utils/imgUpload";
import type { UserType } from "@/types/types";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const initialErrors = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: "",
};

export default function UserProfile() {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });

  const nameRegex = /^[A-Za-z \s'-]{1,50}$/;
  const phoneRegex = /^(?:\+84|0)(3|5|7|8|9)\d{8}$/;
  const addressRegex = /^.{0,255}$/;

  const [dobOpen, setDobOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<UserType>({
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
    dob: undefined,
    created_at: "",
    tier: "free",
    gender: "male",
  });

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
    };
    if (!nameRegex.test(formData.first_name.trim())) {
      newErrors.firstName = "Please enter a valid first name.";
      valid = false;
    }

    if (!nameRegex.test(formData.last_name.trim())) {
      newErrors.lastName = "Last name cannot be empty!";

      valid = false;
    }

    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number.";

      valid = false;
    }

    if (!addressRegex.test(formData.address.trim())) {
      newErrors.address = "Address cannot be empty!";

      valid = false;
    }

    if (valid) {
      let phone = formData.phone.trim();
      if (phone.startsWith("0")) {
        phone = "+84" + phone.slice(1);
      }
      const updatedData = await updateUser({ ...formData, phone });
      const userId = updatedData.result.id;
      const result = await getUser(Number(userId));
      if (!result) return;
      setUser(result.user);
      showToast.success(`User information updated!`, {
        position: "top-left",
        duration: 3000,
        transition: "slideInUp",
      });
      setErrors(initialErrors);
      valid = true;
      setEditing(false);
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      const userId = user?.id;

      const result = await getUser(Number(userId));

      if (!result) return;
      const fetchedUser = result.user;
      setUser(fetchedUser);

      setFormData({
        username: fetchedUser.username || "",
        first_name: fetchedUser.first_name || "",
        last_name: fetchedUser.last_name || "",
        email: fetchedUser.email || "",
        bio: fetchedUser.bio || "",
        address: fetchedUser.address || "",
        phone: fetchedUser.phone || "",
        id: fetchedUser.id || "",
        role: fetchedUser.role || "",
        avatar_url: fetchedUser.avatar_url || "",
        dob: fetchedUser.dob || undefined,
        created_at: fetchedUser.created_at || "",
        tier: fetchedUser.tier || "free",
        gender: fetchedUser.gender || "male",
      });

      setDate(fetchedUser.dob ? new Date(fetchedUser.dob) : undefined);
    }

    getUserInfo();
  }, [user?.id]);

  const resetForm = () => {
    if (!user) return;

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
      dob: user.dob || undefined,
      created_at: user.created_at || "",
      tier: user.tier || "free",
      gender: user.gender || "male",
    });

    setDate(user.dob ? new Date(user.dob) : undefined);
    setErrors(initialErrors);
  };

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
                  resetForm();
                  setEditing(false);
                  showToast.info(`User editing cancelled.`, {
                    position: "top-left",
                    duration: 3000,
                    transition: "slideInUp",
                  });
                } else {
                  setEditing(true);
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
              className={`w-2/3 outline-1 shadow-md p-2 rounded-md ${!editing ? "bg-gray-200" : "bg-white"} ${errors.firstName ? "outline-1 outline-red-600" : ""}`}
            />

            {errors.firstName && (
              <p className="text-red-600">{errors.firstName}</p>
            )}
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
              className={`w-2/3 outline-1 shadow-md p-2 rounded-md ${!editing ? "bg-gray-200" : "bg-white"} ${errors.lastName ? "outline-1 outline-red-600" : ""}`}
            />
            {errors.lastName && (
              <p className="text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="flex mt-8">
          <div className="w-1/2 flex flex-col gap-4">
            <h1 className="text-xl font-bold">Gender</h1>
            <Select
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
              disabled={!editing}
            >
              <SelectTrigger
                className={`w-2/3 shadow-md rounded-md outline-1 text-xl h-12 ${
                  !editing ? "bg-gray-300" : "bg-white"
                }`}
              >
                <SelectValue
                  placeholder="Select a gender"
                  className="text-xl"
                ></SelectValue>
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectGroup>
                  {genders.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
              className={`w-2/3 outline-1 shadow-md p-2 rounded-md ${!editing ? "bg-gray-200" : "bg-white"} ${errors.phoneNumber ? "outline-1 outline-red-600" : ""}`}
            />
            {errors.phoneNumber && (
              <p className="text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div className="gap-4 mt-8">
          <h1 className="text-xl font-bold mb-4">Date of Birth</h1>
          <Popover open={dobOpen} onOpenChange={setDobOpen}>
            <PopoverTrigger asChild>
              <Button
                disabled={!editing}
                variant="outline"
                id="date"
                className={`justify-start font-normal w-48 text-xl h-10 ${!editing ? "bg-gray-300" : "bg-white"}`}
              >
                {date ? date.toLocaleDateString() : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={date}
                defaultMonth={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  console.log(date);
                  setDate(date);
                  setFormData({
                    ...formData,
                    dob: date,
                  });
                  setDobOpen(false);
                }}
              ></Calendar>
            </PopoverContent>
          </Popover>
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
            className={`w-2/3 outline-1 shadow-md p-2 rounded-md ${!editing ? "bg-gray-200" : "bg-white"} ${errors.address ? "outline-1 outline-red-600" : ""}`}
          />

          {errors.address && <p className="text-red-600">{errors.address}</p>}
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
