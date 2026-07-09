"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { forgotPassword } from "@/lib/api/auth";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    forgotPassword(email);
  };
  return (
    <div className="min-h-screen w-full px-80 space-y-8">
      <h1 className="text-4xl font-black mt-20">Forgot Password?</h1>
      <div className="outline-1 outline-gray-300 p-8 rounded-lg space-y-4">
        <p className="text-2xl font-semibold text-gray-600">
          Enter a valid email to receive an OTP sent to the email address.
        </p>

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <Label htmlFor="forgotPassword" className="text-xl">
            Email
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="text-xl h-12"
            placeholder="Enter your email:"
          ></Input>

          <Button
            type="submit"
            className="h-12 bg-green-600 hover:bg-green-800"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
