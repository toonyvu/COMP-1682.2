"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "@/lib/api/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type Props = {
  token: string;
};

export default function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!isPasswordValid) {
      return;
    }

    const res = await resetPassword(password, token);
    setSuccess(res.success);
    setMessage(res.message);

    if (res.success) {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <div className="flex w-full h-screen justify-center px-4">
      <Card className=" w-2/3 mt-8 h-fit">
        <CardContent className="pt-6">
          <h1 className="mb-2 text-2xl font-bold">Reset Password</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" value={token} />

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
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

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-800"
            >
              Reset Password
            </Button>
            {message && (
              <p
                className={`mt-4 text-center text-sm ${
                  success ? "text-green-600" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
