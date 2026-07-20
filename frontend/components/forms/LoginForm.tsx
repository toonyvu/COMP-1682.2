"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import Link from "next/link";

import ScrollItems from "../ScrollItems";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { Button } from "../ui/button";

import { login } from "@/lib/api/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(email, password);

      if (res.ok) {
        setUser(res.data.user);
        if (res.data.role === "admin") {
          router.push("/admin/dashboard/orders");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Server Error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-center">
        <Card className="w-full h-full flex flex-col p-20">
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
            <CardTitle className="text-3xl">Login to your account</CardTitle>
            <p className="text-lg">
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-lg">
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-md underline hover:text-blue-600"
                  >
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
              <Button
                type="submit"
                className="w-full bg-green-500 h-10 rounded-xl mt-3 transition duration-100 hover:bg-green-700 hover:text-white text-lg"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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
              type="button"
              className="w-full bg-red-500 h-10 rounded-xl hover:bg-red-800 text-lg"
              disabled={loading}
              onClick={() => {
                window.location.href =
                  "http://localhost:8080/auth/oauth/google";
              }}
            >
              {loading ? "Logging in..." : "Login with Google"}
            </Button>
            <Button
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-800 h-10 rounded-xl text-lg"
              onClick={() => {
                window.location.href =
                  "http://localhost:8080/auth/oauth/facebook";
              }}
            >
              Login with Facebook
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
