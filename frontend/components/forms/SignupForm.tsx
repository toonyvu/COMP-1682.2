"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import Image from "next/image";
import logo from "../../public/icon.png";

import { signup } from "@/lib/api/auth";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    setError("");
    setSuccess("");
    e.preventDefault();

    if (!email || !password || !repeatedPassword) {
      setError("Please fill out all required fields.");
      return;
    }

    if (password !== repeatedPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await signup(email, username, password);

      if (res.ok) {
        setSuccess("Signed up successfully!");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Trouble signing up. Please try again.");
    }
  }
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-start -mt-35">
        <Card className="w-full flex flex-col p-20">
          <div className="w-fit">
            <Button className="bg-green`">Go back to homepage</Button>
          </div>
          <Image
            src={logo}
            width={150}
            height={150}
            alt="App Icon"
            className="mt-10"
          />
          <CardHeader className="space-y-1 mt-5">
            <CardTitle className="text-2xl">Create a new account</CardTitle>
            <p>
              {"Already have an account?"}{" "}
              <Link
                href="/login"
                className="text-blue-500 font-bold hover:underline"
              >
                Log in!
              </Link>
            </p>
          </CardHeader>

          <CardContent className=" flex flex-col mt-3">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="p-4 h-8 rounded-xl border-2 border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="email">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username: "
                  required
                  className="p-4 h-8 rounded-xl border-2 border-gray-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="password">Password</label>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="p-4 h-8 rounded-xl border-2 border-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="repeatPassword">Repeat your password</label>
                </div>
                <input
                  id="repeatPassword"
                  type="password"
                  required
                  className="p-4 h-8 rounded-xl border-2 border-gray-300"
                  value={repeatedPassword}
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                type="submit"
                className="w-full bg-green-500 h-10 rounded-xl mt-3 transition duration-100 hover:bg-green-700 hover:text-white"
              >
                Sign up!
              </button>
            </form>
          </CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">Or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <button type="submit" className="w-full bg-red-500 h-10 rounded-xl">
              Login with Google
            </button>
            <button
              type="button"
              className="w-full bg-blue-500 h-10 rounded-xl"
            >
              Login with Facebook
            </button>
          </div>
        </Card>
      </div>

      <div className="w-1/2 hidden md:block bg-linear-to-b from-green-700 to-green-900" />
    </div>
  );
}
