"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

import Link from "next/link";

import ScrollItems from "../ScrollItems";

import { signup } from "@/lib/api/auth";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  async function handleSubmit(e: React.FormEvent) {
    setError("");
    setSuccess("");
    e.preventDefault();

    if (!isPasswordValid) {
      setError("Password is not valid.");
      return;
    }

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
        setError(res.data.error);
        console.log(res);
      }
    } catch (err) {
      console.log(err);
      setError("Trouble signing up. Please try again.");
    }
  }
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-start">
        <Card className="w-full flex flex-col p-20">
          <div className="flex flex-row items-center">
            <MoveLeft />
            <Button
              className="w-24 bg-white text-black text-lg hover:bg-gray-100"
              onClick={() => {
                router.push("/");
              }}
            >
              Go Back
            </Button>
          </div>

          <CardHeader className="space-y-1 mt-5">
            <CardTitle className="text-3xl">Create a new account</CardTitle>
            <p className="text-lg">
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
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
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
                <label htmlFor="username" className="text-lg">
                  Username
                </label>
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

              <hr />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-lg">
                    Password
                  </label>
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
                <ul className="space-y-2">
                  <li
                    className={`transition-colors duration-300 ${password.length <= 8 ? "text-red-500" : "text-green-500"}`}
                  >
                    {" "}
                    X Password must be at least 8 characters.
                  </li>
                  <li
                    className={`transition-colors duration-300 ${/[A-Z]/.test(password) === false ? "text-red-500" : "text-green-500"}`}
                  >
                    X Password must contain at least ONE capital letter.
                  </li>
                  <li
                    className={`transition-colors duration-300 ${/[0-9]/.test(password) === false ? "text-red-500" : "text-green-500"}`}
                  >
                    X Password must contain at least ONE number.
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="repeatPassword" className="text-lg">
                    Repeat your password
                  </label>
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
              <Button
                type="submit"
                className="w-full text-lg bg-green-500 h-10 rounded-xl mt-3 transition duration-100 hover:bg-green-700 hover:text-white"
              >
                Sign up!
              </Button>
            </form>
          </CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">Or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-800 h-10 rounded-xl text-lg"
              onClick={() => {
                window.location.href =
                  "http://localhost:8080/auth/oauth/google";
              }}
            >
              Sign in with Google
            </Button>
            <Button
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-800 h-10 rounded-xl text-lg"
              onClick={() => {
                window.location.href =
                  "http://localhost:8080/auth/oauth/facebook";
              }}
            >
              Sign in with Facebook
            </Button>
          </div>
        </Card>
      </div>

      <div className="w-1/2 hidden md:block bg-linear-to-b from-green-700 to-green-900 px-8">
        <ScrollItems />
        <ScrollItems reverse />
        <ScrollItems />
        <ScrollItems reverse />
        <ScrollItems />
        <ScrollItems reverse />
      </div>
    </div>
  );
}
