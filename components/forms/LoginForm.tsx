"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import Link from "next/link";

import Image from "next/image";
import logo from "../../public/icon.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-center">
        <Card className="w-full h-full flex flex-col p-20">
          <Image
            src={logo}
            width={150}
            height={150}
            alt="App Icon"
            className="mt-5"
          />
          <CardHeader className="space-y-1 mt-5">
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <p>
              {"Don't have an account?"}{" "}
              <Link
                href="/signup"
                className="text-blue-500 font-bold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardHeader>

          <CardContent className=" flex flex-col mt-3">
            <form className="space-y-6" onSubmit={handleLogin}>
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password">Password</label>
                  <a href="#" className="text-sm underline">
                    Forgot password?
                  </a>
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
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full bg-green-500 h-10 rounded-xl mt-3 transition duration-100 hover:bg-green-700 hover:text-white"
              >
                Login!
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
